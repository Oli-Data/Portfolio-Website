import './Nav.css'

export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <span className="nav-logo">Christian Olivares-Rodriguez</span>
        <ul className="nav-links">
          <li><a href="#projects">Projects</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}