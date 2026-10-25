import ArrowIcon from './ArrowIcon'
import './Hero.css'

function GlassWorld() {
  return <div className="glass-world" aria-hidden="true">
    <div className="orbital-ring ring-one" /><div className="orbital-ring ring-two" />
    <div className="world-orb"><svg viewBox="0 0 400 400"><defs><clipPath id="globe-clip"><circle cx="200" cy="200" r="182" /></clipPath><linearGradient id="terrain" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c0ed98" /><stop offset="1" stopColor="#297e99" /></linearGradient></defs><g clipPath="url(#globe-clip)" fill="none" stroke="currentColor" strokeWidth=".8"><circle cx="200" cy="200" r="182"/><ellipse cx="200" cy="200" rx="70" ry="182"/><ellipse cx="200" cy="200" rx="135" ry="182"/><ellipse cx="200" cy="200" rx="182" ry="64"/><ellipse cx="200" cy="200" rx="182" ry="125"/><path d="M18 200h364M200 18v364"/><path d="M-20 260Q65 130 150 220T420 180V420H-20Z" fill="url(#terrain)" fillOpacity=".32" strokeOpacity=".6"/><path d="M-20 285Q75 160 160 250T420 210M-20 310Q85 190 170 280T420 240M-20 335Q95 220 180 310T420 270" strokeOpacity=".5"/></g></svg><span className="orb-highlight" /></div>
    <span className="world-satellite satellite-jade" /><span className="world-satellite satellite-green" />
    <div className="world-tag tag-data"><span>01</span> Explore the question</div><div className="world-tag tag-build"><span>02</span> Build something useful</div>
    <div className="world-caption"><span className="tiny-star">✦</span> A little wonder. A lot of questions.</div>
  </div>
}

export default function Hero() {
  return <section id="home" className="hero section-width">
    <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> OPEN TO DATA & APPLIED AI OPPORTUNITIES</p>
      <h1>Christian<br /><span>Olivares-Rodriguez.</span></h1>
      <h2>Curiosity, made useful.</h2>
      <p className="hero-subtitle">I work across data science, applied machine learning, and software. I’m interested in what happens when a good question becomes a tool someone can actually use.</p>
      <div className="hero-cta"><a href="#projects" className="button button-primary">Explore my work <span><ArrowIcon /></span></a><a href="/Christian_Olivares_Rodriguez_Resume.pdf" className="button button-glass" target="_blank" rel="noopener noreferrer">Read my résumé <span><ArrowIcon /></span></a></div>
      <div className="hero-context"><span>Based in Visalia, California</span><span>Founder, CO³ Labs</span></div>
    </div><GlassWorld />
    <div className="hero-footnote"><span>INDEPENDENT PROJECTS. PRACTICAL QUESTIONS.</span><a href="#projects">Scroll to explore ↓</a></div>
  </section>
}
