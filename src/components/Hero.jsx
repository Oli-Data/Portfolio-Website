import './Hero.css'

const tags = [
  'PyTorch', 'FastAPI', 'React', 'Computer Vision',
  'NLP', 'RTX 4090', 'CO³ Labs LLC',
]

export default function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">
        <span className="status-dot" />
        Open to opportunities
      </p>

      <h1 className="hero-h1">
        Machine Learning<br />
        <span>Engineer</span> &<br />
        AI Researcher
      </h1>

      <p className="hero-subtitle">
        Building intelligent systems at the intersection of applied ML and
        human-centered design. Founder of CO³ Labs. B.S. Data Science.
      </p>

      <div className="hero-cta">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a
          href="/Christian_Olivares_Rodriguez_Resume.pdf"
          className="btn-ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
      </div>

      <div className="hero-tags">
        {tags.map(t => (
          <span key={t} className="hero-tag">{t}</span>
        ))}
      </div>
    </section>
  )
}
