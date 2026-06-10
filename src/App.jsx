import './styles/globals.css'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Ambient orbs */}
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <div className="orb orb-4" aria-hidden="true" />

      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  )
}
