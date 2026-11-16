const selector = '[data-scroll-reveal]'

/** Progressively enhance off-screen panels; visible content never waits on motion. */
export function initScrollReveals({ doc = document, win = window } = {}) {
  const panels = Array.from(doc.querySelectorAll(selector))
  if (!panels.length || typeof win.IntersectionObserver !== 'function' || typeof win.matchMedia !== 'function') return () => {}

  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)')
  const contrast = win.matchMedia('(forced-colors: active)')
  const motionDisabled = () => reduced.matches || contrast.matches || doc.hidden
  if (motionDisabled()) return () => {}

  const pending = new Set()
  const active = new Map()
  let disposed = false

  function settle(panel) {
    panel.removeAttribute('data-reveal-pending')
    pending.delete(panel)
    active.get(panel)?.cancel()
    active.delete(panel)
  }

  const observer = new win.IntersectionObserver(entries => {
    if (disposed) return
    for (const { target: panel, isIntersecting } of entries) {
      if (!isIntersecting || !pending.has(panel)) continue
      settle(panel)
      observer.unobserve(panel)
      if (motionDisabled() || panel.matches(':focus-within')) continue

      const distance = win.innerWidth <= 640 ? 24 : 32
      const delay = Number(panel.getAttribute('data-reveal-delay')) || 0
      try {
        const animation = panel.animate([
          { opacity: 0, transform: `translateY(${distance}px)` },
          { opacity: 1, transform: 'translateY(0)' },
        ], {
          duration: 620,
          delay: Math.min(160, Math.max(0, delay)),
          easing: 'cubic-bezier(.22, 1, .36, 1)',
          fill: 'both',
        })
        active.set(panel, animation)
        animation.onfinish = () => {
          if (active.get(panel) !== animation) return
          animation.cancel()
          active.delete(panel)
        }
      } catch {
        // The staging attribute is already removed: a failed animation stays visible.
      }
    }
  }, { rootMargin: `0px 0px -${Math.round(win.innerHeight * .1)}px 0px`, threshold: 0 })

  const triggerLine = win.innerHeight * .9
  for (const panel of panels) {
    if (typeof panel.animate !== 'function' || panel.matches(':focus-within') || panel.getBoundingClientRect().top < triggerLine) continue
    panel.setAttribute('data-reveal-pending', '')
    pending.add(panel)
    observer.observe(panel)
  }

  function settleAll() {
    observer.disconnect()
    for (const panel of panels) settle(panel)
  }
  const preferenceChanged = () => { if (motionDisabled()) settleAll() }
  const interact = event => {
    const panel = event.target?.closest?.(selector)
    if (!panel || (!pending.has(panel) && !active.has(panel))) return
    settle(panel)
    observer.unobserve(panel)
  }

  reduced.addEventListener('change', preferenceChanged)
  contrast.addEventListener('change', preferenceChanged)
  doc.addEventListener('visibilitychange', preferenceChanged)
  doc.addEventListener('focusin', interact)
  doc.addEventListener('pointerdown', interact, { passive: true })

  return () => {
    disposed = true
    settleAll()
    reduced.removeEventListener('change', preferenceChanged)
    contrast.removeEventListener('change', preferenceChanged)
    doc.removeEventListener('visibilitychange', preferenceChanged)
    doc.removeEventListener('focusin', interact)
    doc.removeEventListener('pointerdown', interact)
  }
}
