import './About.css'

export default function About() {
  return <section id="about" className="about section-width">
    <div className="section-heading"><div><p className="eyebrow">THE PERSON BEHIND THE PROJECTS</p><h2>From technical support<br />to data and software.</h2></div><p>My background combines a data science degree with years of helping people solve technical problems.</p></div>
    <div className="about-grid">
      <div className="about-story">
        <p className="lead">I’m Christian, an Arizona State University data science graduate based in Visalia, California.</p>
        <p>I’ve spent about six years at Best Buy and Geek Squad, diagnosing technical problems and explaining the next steps to customers. That experience shapes how I build: understand what someone needs, work through the problem, and make the result easy to use.</p>
        <p>Through CO³ Labs, I work on independent data and software projects. I enjoy both sides of that work—digging into a dataset and turning an idea into an application someone can try.</p>
        <div className="about-signature">Christian</div>
      </div>
      <aside className="about-note glass"><span className="note-pin" aria-hidden="true">✦</span><p className="eyebrow">HOW I WORK</p><ol>
        <li><span>01</span><div><h3>Understand the workflow.</h3><p>Find out what people are trying to do and where they get stuck.</p></div></li>
        <li><span>02</span><div><h3>Check the result.</h3><p>Compare models with a baseline, inspect errors, and test what happens when things go wrong.</p></div></li>
        <li><span>03</span><div><h3>Make it usable.</h3><p>Explain the findings clearly and give people a straightforward next step.</p></div></li>
      </ol></aside>
    </div>
    <div className="lab-bridge glass"><div className="lab-mark" aria-hidden="true">co³</div><div><p className="eyebrow">MY INDEPENDENT WORK</p><h3>CO³ Labs</h3><p>Where I develop my own projects and offer data analysis and custom software services.</p></div><a href="https://co3labs.com" className="button button-glass" target="_blank" rel="noopener noreferrer">Visit the lab</a></div>
  </section>
}
