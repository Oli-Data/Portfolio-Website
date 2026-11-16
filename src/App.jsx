import { useEffect } from 'react'
import { initScrollReveals } from './lib/scroll-reveal'
import './styles/globals.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import './styles/appearance.css'
import './styles/refinements.css'
import './styles/viewport.css'
import './styles/reveals.css'

export default function App() {
  useEffect(() => initScrollReveals(), [])
  return <>
    <div className="aero-background" aria-hidden="true"><div className="aurora aurora-one" /><div className="aurora aurora-two" /><div className="horizon" /><div className="wave" /><span className="bubble bubble-one" /><span className="bubble bubble-two" /><span className="bubble bubble-three" /></div>
    <a className="skip-link" href="#main">Skip to content</a>
    <Nav />
    <main id="main"><Hero /><Projects /><About /></main>
    <Footer />
  </>
}
