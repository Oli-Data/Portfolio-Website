import ArrowIcon from './ArrowIcon'
import { useEffect, useState } from 'react'
import './Nav.css'

export default function Nav() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'night')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('portfolio-appearance', theme) } catch { /* Theme remains usable without storage. */ }
  }, [theme])
  return <header className="nav-wrap"><nav className="nav" aria-label="Main navigation">
    <a className="nav-logo" href="#home" aria-label="Christian Olivares-Rodriguez, home"><img className="monogram" src="/favicon.svg" width="39" height="39" alt="" /><span>Christian O.<small>DATA · SOFTWARE · AI</small></span></a>
    <ul className="nav-links"><li><a href="#projects">Selected work</a></li><li><a href="#about">About me</a></li><li><a href="#contact">Let’s talk <ArrowIcon /></a></li></ul>
    <button className="theme-toggle" onClick={() => setTheme(theme === 'night' ? 'day' : 'night')} aria-label={`Switch to ${theme === 'night' ? 'day' : 'night'} theme`}><span aria-hidden="true">{theme === 'night' ? '☀' : '☾'}</span><span>{theme === 'night' ? 'Daylight' : 'After hours'}</span></button>
  </nav></header>
}
