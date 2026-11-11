import { useEffect, useRef } from 'react'
import ThemeControl from './ThemeControl'
import './Nav.css'

const links = [['#projects', 'Selected work'], ['#about', 'About me'], ['#contact', 'Let’s talk']]

export default function Nav() {
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
  return <header className="nav-wrap"><nav className="nav" aria-label="Main navigation">
    <a className="nav-logo" href="#home" aria-label="Christian Olivares-Rodriguez, home"><span className="monogram" aria-hidden="true"><span className="monogram-letters">c<span>o</span></span></span><span>Christian O.<small>DATA · SOFTWARE · AI</small></span></a>
    <ul className="nav-links">{links.map(([href, label]) => <li key={href}><a href={href}>{label}</a></li>)}</ul>
    <div className="nav-controls"><ThemeControl />
      <details className="mobile-menu" ref={menu} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false }}>
        <summary ref={trigger} aria-label="Navigation menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14" /></svg><span>Menu</span></summary>
        <div className="mobile-menu-panel"><p className="eyebrow">EXPLORE THE PORTFOLIO</p>{links.map(([href, label]) => <a key={href} href={href} onClick={() => { menu.current.open = false }}>{label}</a>)}</div>
      </details>
    </div>
  </nav></header>
}
