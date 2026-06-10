import './Projects.css'

const projects = [
  {
    id: 'lumitudy',
    featured: true,
    chip: 'Featured · Full Stack + AI',
    title: 'Lumitudy',
    description:
      'AI-powered flashcard platform with JWT auth, PDF/EPUB ingestion, exam mode, and a Kahoot-style live multiplayer quiz mode — shared lobbies, real-time leaderboard, and friend codes.',
    bullets: [
      'Kahoot-style multiplayer via WebSockets — shared lobbies, voting, live leaderboard',
      'AI flashcard generation from uploaded PDFs and EPUBs via Claude API',
      'JWT auth with friend codes, exam mode, and persistent storage',
    ],
    pills: ['FastAPI', 'React + Vite', 'SQLite', 'WebSockets', 'Claude API'],
    accent: 'aqua',
    badge: 'Live',
    badgeLabel: 'Production',
    url: 'https://lumitudy.vercel.app',
    href: 'https://lumitudy.vercel.app',
  },
  {
    id: 'ookla',
    chip: 'Data Science · Public Policy',
    title: 'Ookla Broadband Equity',
    description:
      'Geospatial analysis of broadband speed disparities across income and demographic lines using FCC + Ookla open datasets. Key finding: rural classification is a 3× stronger predictor than income.',
    pills: ['Python', 'GeoPandas', 'Census ACS', 'Matplotlib'],
    accent: 'blue',
    href: 'https://github.com/Oli-Data/Ookla-Data',
  },
  {
    id: 'chicago',
    chip: 'Deep Learning · Classification',
    title: 'Chicago Crimes Classifier',
    description:
      'Binary crime classification model using PyTorch. 86% accuracy on ~38K test records with a custom 4-layer fully connected network and evaluation pipeline.',
    pills: ['PyTorch', 'Pandas', 'Scikit-learn'],
    accent: 'teal',
    href: 'https://github.com/Oli-Data',
  },
  {
    id: 'next',
    chip: 'RTX 4090 · In Development',
    title: 'Next ML Project',
    description:
      'Fine-tuning or computer vision experiment leveraging local GPU compute. Details coming soon.',
    pills: ['PyTorch', 'RTX 4090', 'TBD'],
    accent: 'dim',
    coming: true,
  },
]

function FeaturedCard({ project }) {
  return (
    <a
      className="card card-featured"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={`card-accent accent-${project.accent}`} />
      <div className="card-featured-inner">
        <div className="card-featured-body">
          <span className="card-chip">{project.chip}</span>
          <h2 className="card-title card-title-lg">{project.title}</h2>
          <p className="card-desc">{project.description}</p>
          <ul className="card-bullets">
            {project.bullets.map(b => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="pill-stack">
            {project.pills.map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>
        </div>
        <div className="card-meta">
          <div>
            <div className="card-stat-num">{project.badge}</div>
            <div className="card-stat-label">{project.badgeLabel}</div>
          </div>
          <div className="card-url">{project.url}</div>
        </div>
      </div>
    </a>
  )
}

function RegularCard({ project }) {
  const Tag = project.coming ? 'div' : 'a'
  const linkProps = project.coming
    ? {}
    : { href: project.href, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Tag
      className={`card${project.coming ? ' card-coming' : ''}`}
      {...linkProps}
    >
      <div className={`card-accent accent-${project.accent}`} />
      <span className={`card-chip${project.coming ? ' card-chip-muted' : ''}`}>
        {project.chip}
      </span>
      <h2 className={`card-title${project.coming ? ' card-title-muted' : ''}`}>
        {project.title}
      </h2>
      <p className={`card-desc${project.coming ? ' card-desc-muted' : ''}`}>
        {project.description}
      </p>
      <div className="pill-stack">
        {project.pills.map(p => (
          <span key={p} className={`pill${project.coming ? ' pill-muted' : ''}`}>
            {p}
          </span>
        ))}
      </div>
      {project.coming && (
        <span className="coming-badge">Coming Soon</span>
      )}
    </Tag>
  )
}

export default function Projects() {
  const featured = projects.find(p => p.featured)
  const rest = projects.filter(p => !p.featured)

  return (
    <section id="projects">
      <p className="section-label">Selected Projects</p>
      <hr className="section-divider" />
      <div className="projects-grid">
        <FeaturedCard project={featured} />
        {rest.map(p => (
          <RegularCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
