import './Footer.css'

const links = [
  { label: 'GitHub',   href: 'https://github.com/Oli-Data' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/christian-olivares-rodriguez/' },
  { label: 'Email',    href: 'mailto:hello@co3labs.com' },
]

export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <span className="footer-name">CO³ Labs LLC · Visalia, CA</span>
      <ul className="footer-links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
