import ArrowIcon from './ArrowIcon'
import './Footer.css'

export default function Footer() {
  return <footer id="contact" className="footer section-width"><div className="contact-panel glass"><div><p className="eyebrow">LET’S MAKE SOMETHING USEFUL</p><h2>A good conversation<br />is a good place to start.</h2><p>I’m open to roles in data and applied AI, thoughtful collaborations, and scoped project work.</p></div><a className="button button-primary" href="mailto:hello@co3labs.com?subject=Let%E2%80%99s%20talk%20%E2%80%94%20portfolio">Say hello <span><ArrowIcon /></span></a></div><div className="footer-bottom"><span>Christian Olivares-Rodriguez<br /><small>Visalia, California · Built with curiosity.</small></span><nav aria-label="Social links"><a href="https://github.com/Oli-Data" target="_blank" rel="noopener noreferrer">GitHub <ArrowIcon /></a><a href="https://www.linkedin.com/in/christian-olivares-rodriguez/" target="_blank" rel="noopener noreferrer">LinkedIn <ArrowIcon /></a><a href="/Christian_Olivares_Rodriguez_Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <ArrowIcon /></a></nav><a href="#home" className="back-top">Back to top ↑</a></div></footer>
}
