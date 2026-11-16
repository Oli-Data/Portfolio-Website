import test from 'node:test'
import assert from 'node:assert/strict'
import { initScrollReveals } from '../src/lib/scroll-reveal.js'

function events() {
  const listeners = new Map()
  return {
    listeners,
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, new Set())
      listeners.get(type).add(listener)
    },
    removeEventListener(type, listener) { listeners.get(type)?.delete(listener) },
    dispatchEvent(event) { for (const listener of listeners.get(event.type) ?? []) listener(event) },
  }
}

function panel({ top = 1200, focused = false, delay, animate = true } = {}) {
  const attributes = new Map([['data-scroll-reveal', '']])
  if (delay !== undefined) attributes.set('data-reveal-delay', String(delay))
  const animations = []
  const element = {
    ...events(),
    attributes, animations, focused,
    dataset: delay === undefined ? {} : { revealDelay: String(delay) },
    setAttribute(name, value) { attributes.set(name, String(value)) },
    removeAttribute(name) { attributes.delete(name) },
    getAttribute(name) { return attributes.get(name) ?? null },
    hasAttribute(name) { return attributes.has(name) },
    getBoundingClientRect() { return { top, bottom: top + 400, left: 20, right: 620, height: 400, width: 600 } },
    matches(selector) { return selector === ':focus-within' ? this.focused : attributes.has('data-scroll-reveal') },
    closest() { return this },
    contains(target) { return target === this || target?.parentElement === this },
  }
  if (animate) element.animate = (keyframes, options) => {
    const animation = {
      keyframes, options, canceled: false, onfinish: null,
      cancel() { this.canceled = true },
      finish() { this.onfinish?.() },
    }
    animations.push(animation)
    return animation
  }
  return element
}

function browser(panels, { reduced = false, forced = false, hidden = false, width = 1440, observerAvailable = true } = {}) {
  const media = {
    '(prefers-reduced-motion: reduce)': { ...events(), matches: reduced },
    '(forced-colors: active)': { ...events(), matches: forced },
  }
  const observers = []
  class Observer {
    constructor(callback, options) { this.callback = callback; this.options = options; this.observed = new Set(); this.disconnected = false; observers.push(this) }
    observe(element) { this.observed.add(element) }
    unobserve(element) { this.observed.delete(element) }
    disconnect() { this.disconnected = true; this.observed.clear() }
    emit(element, isIntersecting = true) { this.callback([{ target: element, isIntersecting, boundingClientRect: element.getBoundingClientRect() }]) }
  }
  const doc = { ...events(), hidden, activeElement: null, querySelectorAll: () => panels }
  const win = { ...events(), innerHeight: 1000, innerWidth: width, matchMedia: query => media[query], IntersectionObserver: observerAvailable ? Observer : undefined }
  return { doc, win, media, observers }
}

const pending = element => element.hasAttribute('data-reveal-pending')
const listenerCount = target => [...target.listeners.values()].reduce((sum, listeners) => sum + listeners.size, 0)

test('initially visible and focused content is never staged, while later content reveals once', () => {
  const visible = panel({ top: 100 }), focused = panel({ focused: true }), later = panel()
  const environment = browser([visible, focused, later])
  const cleanup = initScrollReveals(environment)
  assert.equal(pending(visible), false)
  assert.equal(pending(focused), false)
  assert.equal(pending(later), true)
  const observer = environment.observers[0]
  observer.emit(later)
  assert.equal(pending(later), false)
  assert.equal(later.animations.length, 1)
  assert.equal(observer.observed.has(later), false)
  const animation = later.animations[0]
  assert.equal(animation.keyframes[0].opacity, 0)
  assert.equal(animation.keyframes.at(-1).opacity, 1)
  animation.finish()
  assert.equal(animation.canceled, true, 'finished animation releases its fill effect')
  observer.emit(later, false)
  observer.emit(later, true)
  assert.equal(pending(later), false)
  assert.equal(later.animations.length, 1, 'returning to the project must not replay or hide it')
  assert.equal(visible.animations.length, 0)
  cleanup()
})

test('keyboard focus and pointer interaction expose pending content immediately', () => {
  for (const type of ['focusin', 'pointerdown']) {
    const target = panel(), environment = browser([target])
    const cleanup = initScrollReveals(environment)
    const descendant = { parentElement: target, closest: () => target }
    environment.doc.dispatchEvent({ type, target: descendant })
    assert.equal(pending(target), false, type)
    assert.equal(target.animations.length, 0, type)
    environment.observers[0].emit(target)
    assert.equal(target.animations.length, 0, 'observer must not hide or animate the focused destination afterward')
    cleanup()
  }
})

test('interaction interrupts an active reveal so controls are immediately usable', () => {
  const target = panel(), environment = browser([target])
  const cleanup = initScrollReveals(environment)
  environment.observers[0].emit(target)
  environment.doc.dispatchEvent({ type: 'focusin', target: { closest: () => target } })
  assert.equal(target.animations[0].canceled, true)
  assert.equal(pending(target), false)
  cleanup()
})

test('reduced motion, forced colors, and background documents start with readable content', () => {
  for (const option of ['reduced', 'forced', 'hidden']) {
    const target = panel(), environment = browser([target], { [option]: true })
    const cleanup = initScrollReveals(environment)
    assert.equal(pending(target), false, option)
    for (const observer of environment.observers) observer.emit(target)
    assert.equal(target.animations.length, 0, option)
    cleanup()
  }
})

test('changing a motion preference or hiding the document settles pending and active panels', () => {
  for (const preference of ['(prefers-reduced-motion: reduce)', '(forced-colors: active)', 'hidden']) {
    const active = panel(), waiting = panel({ top: 2000 }), environment = browser([active, waiting])
    const cleanup = initScrollReveals(environment)
    const observer = environment.observers[0]
    observer.emit(active)
    if (preference === 'hidden') {
      environment.doc.hidden = true
      environment.doc.dispatchEvent({ type: 'visibilitychange' })
    } else {
      environment.media[preference].matches = true
      environment.media[preference].dispatchEvent({ type: 'change' })
    }
    assert.equal(pending(waiting), false, preference)
    assert.equal(active.animations[0].canceled, true, preference)
    assert.equal(observer.disconnected, true, preference)
    observer.emit(waiting)
    assert.equal(waiting.animations.length, 0, 'queued observer delivery must leave settled content alone')
    cleanup()
  }
})

test('cleanup removes staging and effects and ignores already-queued observer deliveries', () => {
  const active = panel(), waiting = panel({ top: 2000 }), environment = browser([active, waiting])
  const cleanup = initScrollReveals(environment)
  const observer = environment.observers[0]
  observer.emit(active)
  cleanup()
  cleanup()
  assert.equal(active.animations[0].canceled, true)
  assert.equal(pending(waiting), false)
  assert.equal(observer.disconnected, true)
  for (const source of [environment.doc, environment.win, ...Object.values(environment.media)]) assert.equal(listenerCount(source), 0)
  observer.emit(waiting)
  assert.equal(waiting.animations.length, 0)
  assert.equal(pending(waiting), false)
})

test('missing animation APIs leave every panel readable', () => {
  for (const missing of ['observer', 'animation']) {
    const target = panel({ animate: missing !== 'animation' })
    const environment = browser([target], { observerAvailable: missing !== 'observer' })
    const cleanup = initScrollReveals(environment)
    assert.equal(pending(target), false, missing)
    assert.equal(target.animations.length, 0)
    cleanup()
  }
})

test('a failed animation still exposes its panel instead of stranding hidden content', () => {
  const target = panel(), environment = browser([target])
  target.animate = () => { throw new Error('animation unavailable') }
  const cleanup = initScrollReveals(environment)
  assert.doesNotThrow(() => environment.observers[0].emit(target))
  assert.equal(pending(target), false)
  cleanup()
})
