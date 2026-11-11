import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { monthlyPalettes, readPreference, subscribeAppearance, chooseAppearance } from '../lib/appearance'

function ThemeIcon({ value }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {value === 'day' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : value === 'night' ? <path d="M20.4 14.4A9 9 0 0 1 9.6 3.6a9 9 0 1 0 10.8 10.8Z" /> : <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18Z" fill="currentColor" stroke="none" /></>}
  </svg>
}

const labels = { day: 'Day', night: 'Night', system: 'Auto' }

export default function ThemeControl() {
  const snapshot = useSyncExternalStore(subscribeAppearance, () => `${readPreference()}:${new Date().getMonth()}`, () => 'system:-1')
  const [savedPreference, month] = snapshot.split(':')
  const preference = savedPreference
  const palette = monthlyPalettes[Number(month)]
  const [open, setOpen] = useState(false)
  const wrapper = useRef(null)
  const trigger = useRef(null)
  const choices = useRef(null)
  const id = useId()

  useEffect(() => {
    if (!open) return
    choices.current?.querySelector('[aria-pressed="true"]')?.focus()
    const outside = (event) => { if (!wrapper.current?.contains(event.target)) setOpen(false) }
    const escape = (event) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
  }, [open])

  function select(value) {
    chooseAppearance(value)
    setOpen(false)
    trigger.current?.focus()
  }

  return <div className="theme-control" ref={wrapper} data-open={open} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false) }}>
    <button ref={trigger} type="button" className="theme-orb" aria-expanded={open} aria-controls={id} aria-label={open ? "Close appearance options" : `Appearance: ${labels[preference]}. Change theme`} title={open ? "Close appearance options" : `Appearance: ${labels[preference]}`} onClick={() => setOpen(value => !value)} onKeyDown={event => { if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true) } }}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" style={{ display: open ? undefined : "none" }}><path d="m7 7 10 10M17 7 7 17" /></svg>{!open && <ThemeIcon value={preference} />}</button>
    <div id={id} ref={choices} className="theme-options" role="group" aria-label="Website appearance" aria-hidden={!open} inert={!open}>
      <div className="theme-season"><span className="season-swatch" aria-hidden="true" /><div><strong>{palette ? `${palette.month} / ${palette.name}` : 'Monthly color'}</strong><span>Follows your local calendar</span></div></div>
      {(['day', 'night', 'system']).map(value => <button key={value} className="theme-choice" type="button" aria-pressed={preference === value} onClick={() => select(value)} aria-label={value === 'system' ? 'Follow device appearance' : `${labels[value]} theme`}><ThemeIcon value={value} /><span>{labels[value]}</span></button>)}
    </div>
  </div>
}
