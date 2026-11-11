import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { monthlyPalettes, monthlyPalette, applyMonthlyPalette, appearanceInitScript } from '../src/lib/appearance.js'

function browserAt(date, preference, dark = false, storageBlocked = false) {
  const clock = { date }
  class LocalDate extends Date { constructor(...args) { super(...(args.length ? args : [clock.date.getTime()])) } }
  const properties = new Map()
  const root = { dataset: {}, style: { setProperty: (name, value) => properties.set(name, value) } }
  const saved = new Map(preference ? [['portfolio-appearance', preference]] : [])
  const localStorage = {
    getItem: key => { if (storageBlocked) throw Error('storage unavailable'); return saved.get(key) ?? null },
    setItem: (key, value) => { if (storageBlocked) throw Error('storage unavailable'); saved.set(key, value) },
    removeItem: key => { if (storageBlocked) throw Error('storage unavailable'); saved.delete(key) },
  }
  const events = () => {
    const listeners = new Map()
    return {
      listeners,
      addEventListener(name, fn) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn) },
      removeEventListener(name, fn) { listeners.get(name)?.delete(fn) },
      dispatchEvent(event) { for (const fn of listeners.get(event.type) ?? []) fn(event) },
    }
  }
  const media = { ...events(), matches: dark }
  const document = { ...events(), documentElement: root, hidden: false }
  const timers = new Map()
  const window = { ...events(), setInterval: (fn, delay) => { timers.set(1, { fn, delay }); return 1 }, clearInterval: id => timers.delete(id) }
  const context = { Date: LocalDate, document, window, localStorage, matchMedia: () => media, Event: class { constructor(type) { this.type = type } } }
  return { context, clock, root, properties, saved, media, document, window, timers }
}

for (let month = 0; month < 12; month++) {
  test(`${monthlyPalettes[month].month}: real local calendar selects its palette`, () => {
    assert.equal(monthlyPalette(new Date(2026, month, 15)), monthlyPalettes[month])
    for (const theme of ['day', 'night']) {
      const browser = browserAt(new Date(2026, month, 15), theme, theme !== 'night')
      vm.runInNewContext(appearanceInitScript, browser.context)
      assert.equal(browser.root.dataset.month, String(month + 1))
      assert.equal(browser.root.dataset.theme, theme)
      assert.equal(browser.properties.get('--month-hue'), String(monthlyPalettes[month].hue))
      assert.equal(browser.properties.get('--month-secondary'), String(monthlyPalettes[month].secondary))
      assert.equal(browser.properties.get('--month-saturation'), `${monthlyPalettes[month].saturation}%`)
    }
  })
}

test('palettes are distinct and all twelve are represented', () => {
  assert.equal(monthlyPalettes.length, 12)
  assert.equal(new Set(monthlyPalettes.map(p => `${p.hue},${p.secondary},${p.saturation}`)).size, 12)
})

test('local month boundaries, leap day, and year rollover', () => {
  for (const [year, month] of [[2026, 0], [2028, 1], [2026, 10], [2026, 11]]) {
    const last = new Date(year, month + 1, 1, 0, 0, 0, -1)
    const next = new Date(last.getTime() + 1)
    assert.equal(monthlyPalette(last), monthlyPalettes[month])
    assert.equal(monthlyPalette(next), monthlyPalettes[(month + 1) % 12])
  }
})

test('automatic appearance and blocked storage preserve the calendar palette', () => {
  for (const blocked of [false, true]) for (const dark of [false, true]) {
    const browser = browserAt(new Date(2026, 7, 1), 'invalid', dark, blocked)
    vm.runInNewContext(appearanceInitScript, browser.context)
    assert.equal(browser.root.dataset.theme, dark ? 'night' : 'day')
    assert.equal(browser.root.dataset.month, '8')
    assert.equal(browser.properties.get('--month-hue'), '181')
  }
})

test('client palette application matches the prepaint palette', () => {
  const prior = globalThis.document
  try {
    for (let month = 0; month < 12; month++) {
      const browser = browserAt(new Date(2026, month, 1))
      globalThis.document = browser.document
      applyMonthlyPalette(new Date(2026, month, 1))
      assert.equal(browser.root.dataset.month, String(month + 1))
      assert.equal(browser.properties.get('--month-hue'), String(monthlyPalettes[month].hue))
    }
  } finally { globalThis.document = prior }
})

function controller(browser) {
  const source = readFileSync(new URL('../src/lib/appearance.js', import.meta.url), 'utf8').replaceAll('export ', '') + '\nglobalThis.controller = { subscribe: subscribeAppearance, choose: chooseAppearance, readPreference };'
  const context = vm.createContext({ ...browser.context })
  vm.runInContext(source, context)
  return context.controller
}

test('open tabs update across a month boundary and clean up their timer', () => {
  const browser = browserAt(new Date(2026, 11, 31, 23, 59, 59), 'day')
  const api = controller(browser)
  let updates = 0
  const unsubscribe = api.subscribe(() => updates++)
  assert.equal(browser.root.dataset.month, '12')
  assert.equal(browser.timers.get(1).delay, 60_000)
  browser.clock.date = new Date(2027, 0, 1)
  browser.timers.get(1).fn()
  assert.equal(browser.root.dataset.month, '1')
  assert.equal(browser.root.dataset.theme, 'day')
  browser.document.hidden = true
  browser.clock.date = new Date(2027, 1, 1)
  browser.timers.get(1).fn()
  assert.equal(browser.root.dataset.month, '1')
  browser.document.hidden = false
  browser.document.dispatchEvent({ type: 'visibilitychange' })
  assert.equal(browser.root.dataset.month, '2')
  assert.equal(updates, 3)
  unsubscribe()
  assert.equal(browser.timers.size, 0)
  for (const target of [browser.window, browser.document, browser.media]) {
    assert.ok([...target.listeners.values()].every(listeners => listeners.size === 0))
  }
})

test('Day, Night, Auto, OS changes and unavailable storage keep working', () => {
  const browser = browserAt(new Date(2026, 10, 9), undefined, false, true)
  const api = controller(browser)
  const unsubscribe = api.subscribe(() => {})
  assert.equal(browser.root.dataset.theme, 'day')
  api.choose('night')
  assert.equal(api.readPreference(), 'night')
  assert.equal(browser.root.dataset.theme, 'night')
  api.choose('system')
  assert.equal(browser.root.dataset.theme, 'day')
  browser.media.matches = true
  browser.media.dispatchEvent({ type: 'change' })
  assert.equal(browser.root.dataset.theme, 'night')
  assert.equal(browser.root.dataset.month, '11')
  unsubscribe()
})

test('a new choice survives readable but unwritable saved preferences', () => {
  const browser = browserAt(new Date(2026, 10, 9), 'day')
  browser.context.localStorage.setItem = () => { throw Error('quota exceeded') }
  browser.context.localStorage.removeItem = () => { throw Error('blocked removal') }
  const api = controller(browser)
  const unsubscribe = api.subscribe(() => {})
  api.choose('night')
  assert.equal(api.readPreference(), 'night')
  assert.equal(browser.root.dataset.theme, 'night')
  browser.timers.get(1).fn()
  assert.equal(browser.root.dataset.theme, 'night')
  api.choose('system')
  browser.media.matches = true
  browser.media.dispatchEvent({ type: 'change' })
  assert.equal(api.readPreference(), 'system')
  assert.equal(browser.root.dataset.theme, 'night')
  browser.document.dispatchEvent({ type: 'visibilitychange' })
  assert.equal(browser.root.dataset.theme, 'night')
  unsubscribe()
})

test('all monthly text tokens meet 4.5:1 on base and conservative scene colors', () => {
  const css = readFileSync(new URL('../src/styles/appearance.css', import.meta.url), 'utf8')
  const day = css.match(/:root \{([\s\S]*?)\}/)[1]
  const night = css.match(/html\[data-theme="night"\] \{([\s\S]*?)\}/)[1]
  function value(block, name) { return Number(block.match(new RegExp(`--${name}:\\s*([.\\d]+)`))[1]) }
  function hsl(h, s, l) {
    s /= 100; l /= 100
    const a = s * Math.min(l, 1 - l)
    return [0, 8, 4].map(n => { const k = (n + h / 30) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)) })
  }
  function luminance(rgb) { return rgb.map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0) }
  function contrast(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05) }
  function blend(a, b, alpha) { return a.map((v, i) => v * alpha + b[i] * (1 - alpha)) }
  for (const [mode, tokens] of [['day', day], ['night', night]]) for (const palette of monthlyPalettes) {
    const base = hsl(palette.hue, 36, value(tokens, 'canvas-lightness'))
    const strength = value(tokens, 'light-strength')
    const overlap = blend(hsl(palette.hue, 80, 77), blend(hsl(palette.secondary, 64, 72), blend(hsl(palette.hue, 65, 59), base, .08), strength), strength)
    for (const [label, saturation, lightness] of [['primary', 30, 'ink-lightness'], ['secondary', 24, 'secondary-lightness'], ['muted', 20, 'muted-lightness'], ['link', palette.saturation, 'accent-lightness']]) {
      const ink = hsl(palette.hue, saturation, value(tokens, lightness))
      const glass = blend(hsl(palette.hue, 42, value(tokens, 'surface-lightness')), overlap, value(tokens, 'surface-alpha'))
      const glassBlue = blend(hsl(palette.hue, palette.saturation, 63), glass, .15)
      const glassGreen = blend(hsl(palette.secondary, 56, 62), glass, .15)
      const navHighlight = blend([214/255,245/255,1], glass, .15)
      for (const surface of [base, overlap, glass, glassBlue, glassGreen, navHighlight]) assert.ok(contrast(ink, surface) >= 4.5, `${palette.month} ${mode} ${label}: ${contrast(ink, surface).toFixed(2)}:1`)
    }
    assert.ok(contrast(hsl(palette.hue, palette.saturation, value(tokens, 'accent-lightness')), hsl(palette.hue, 25, value(tokens, 'button-lightness'))) >= 4.5)
  }
})


test('cross-tab preference changes and removals resynchronize appearance', () => {
  const browser = browserAt(new Date(2026, 10, 9), 'day')
  const api = controller(browser)
  const stop = api.subscribe(() => {})
  browser.saved.set('portfolio-appearance', 'night')
  browser.window.dispatchEvent({ type:'storage', key:'portfolio-appearance' })
  assert.equal(browser.root.dataset.theme, 'night')
  browser.saved.clear()
  browser.window.dispatchEvent({ type:'storage', key:null })
  assert.equal(api.readPreference(), 'system')
  assert.equal(browser.root.dataset.theme, 'day')
  stop()
})

test('prepaint HTML uses the same palette source and preserves the existing preference key', () => {
  const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8')
  assert.ok(html.includes(appearanceInitScript))
  assert.ok(html.indexOf(appearanceInitScript) < html.indexOf('</head>'))
  assert.ok(!html.includes('co3-appearance'))
})

test('monthly table matches the approved CO3 calendar', () => {
  assert.deepEqual(monthlyPalettes.map(p => [p.month,p.name,p.hue,p.secondary,p.saturation]), [
    ['January','Silver mist',210,180,32],['February','Honey light',43,20,74],['March','Mint current',157,194,56],['April','Rose glass',334,277,62],['May','Fresh canopy',106,161,49],['June','Lavender haze',263,316,58],['July','Blue horizon',202,166,74],['August','Lagoon',181,139,65],['September','Violet dusk',279,223,57],['October','Amber glow',28,54,74],['November','Azure tide',219,179,65],['December','Winter rose',350,294,58],
  ])
})
