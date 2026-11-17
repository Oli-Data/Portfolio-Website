import { useEffect, useRef } from 'react'
import ThemeControl from './ThemeControl'
import './Nav.css'

const links = [['#projects', 'Selected work'], ['#about', 'About me'], ['#contact', 'Let’s talk']]

export default function Nav({ homePath = '' }) {
  const menu = useRef(null)
  const trigger = useRef(null)
  useEffect(() => {
    const close = () => { if (menu.current) menu.current.open = false }
    const outside = event => { if (!menu.current?.contains(event.target)) close() }
    const escape = event => { if (event.key === 'Escape' && menu.current?.open) { close(); trigger.current?.focus() } }
    const media = matchMedia('(min-width: 761px)')
    document.addEventListener('pointerdown', outside)
    document.addEventListener('keydown', escape)
    window.addEventListener('hashchange', close)
    window.addEventListener('popstate', close)
    media.addEventListener('change', close)
    return () => {
      document.removeEventListener('pointerdown', outside)
      document.removeEventListener('keydown', escape)
      window.removeEventListener('hashchange', close)
      window.removeEventListener('popstate', close)
      media.removeEventListener('change', close)
    }
  }, [])

  function handleMenuBlur(event) {
    // A mobile tap can blur the summary without focusing its destination link.
    // Let the link activate; outside taps are handled by the pointer listener.
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false
  }

  return <header className="nav-wrap"><nav className="nav" aria-label="Main navigation">
    <a className="nav-logo" href={`${homePath}#home`} aria-label="Christian Olivares-Rodriguez, home"><span className="monogram" aria-hidden="true"><span className="monogram-letters">c<span>o</span></span></span><span>Christian O.<small>DATA · SOFTWARE · AI</small></span></a>
    <ul className="nav-links">{links.map(([href, label]) => <li key={href}><a href={`${homePath}${href}`}>{label}</a></li>)}</ul>
    <div className="nav-controls"><ThemeControl />
      <details className="mobile-menu" ref={menu} onBlur={handleMenuBlur}>
        <summary ref={trigger} aria-label="Navigation menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14" /></svg></summary>
        <div className="mobile-menu-panel"><p className="eyebrow">EXPLORE THE PORTFOLIO</p>{links.map(([href, label]) => <a key={href} href={`${homePath}${href}`} onClick={() => { menu.current.open = false }}>{label}</a>)}</div>
      </details>
    </div>
  </nav></header>
}
