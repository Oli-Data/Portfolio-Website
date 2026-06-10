import './About.css'

const stats = [
  { label: 'Degree',   value: 'B.S. Data Science' },
  { label: 'Venture',  value: 'CO³ Labs LLC' },
  { label: 'Location', value: 'Visalia, CA' },
  { label: 'Hardware', value: 'RTX 4090 Compute Node' },
  { label: 'Focus',    value: 'ML · CV · NLP' },
]

export default function About() {
  return (
    <section id="about">
      <p className="section-label">About</p>
      <hr className="section-divider" />

      <div className="about-inner">
        <div className="about-left">
          <h2 className="about-heading">
            Built at the edge of<br />
            what's <span>currently possible</span>
          </h2>
          <p className="about-body">
            I'm Christian Olivares-Rodriguez, a Machine Learning Engineer based
            in Visalia, CA, with a B.S. in Data Science. I build production AI
            systems — from full-stack platforms to deep learning classifiers —
            with a focus on making intelligent tools that are actually useful to
            people.
          </p>
          <p className="about-body">
            I founded CO³ Labs LLC as a personal research vehicle to go deeper:
            exploring the architecture of machine intelligence, and what it might
            mean for systems to model something like understanding or
            consciousness. I believe the most interesting work happens at the
            edge of what's currently possible.
          </p>
        </div>

        <div className="about-right">
          {stats.map(s => (
            <div key={s.label} className="about-stat">
              <span className="about-stat-label">{s.label}</span>
              <span className="about-stat-val">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
