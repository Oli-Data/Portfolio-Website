import LumitudyBrand from './LumitudyBrand'
import LuzBrand from './LuzBrand'
import SelahBrand from './SelahBrand'
import ProductSymbol from './ProductSymbol'
import ResearchSymbol from './ResearchSymbol'
import './Projects.css'
import './ProjectPreview.css'

const repo = 'https://github.com/Oli-Data/'
const projects = [
  {
    id:'ookla', number:'03', kind:'DATA SCIENCE / GEOSPATIAL ANALYSIS',
    title:'Comparing speeds across three regions.', name:'California mobile broadband',
    status:'Research draft', accent:'blue',
    description:'I analyzed Ookla mobile speed-test data for the Central Valley, Bay Area, and Southern California, comparing regional performance and mapping it alongside Census data.',
    built:'Built a Python workflow to load Ookla tiles from S3, compare median download speed, upload speed, and latency, and join observations to Census tracts with GeoPandas.',
    evidence:'The notebook includes yearly regional comparisons, speed-distribution charts, and maps. Census summaries explore how measured speeds vary with income, poverty, and geography.',
    limit:'Speed tests reflect submitted observations, not every resident or location. The 2025 sample covers part of the year. Geographic groupings and summary figures are still being reviewed; the comparisons do not establish cause and effect.',
    href:repo+'Ookla-Data', link:'View the research & code',
    tags:['Python','GeoPandas','Census ACS','Research reporting'],
  },
  {
    id:'luz', number:'05', kind:'PERSONAL AI / CONTINUITY',
    title:'Exploring memory in personal AI.', name:'Luz',
    status:'Early prototype · Private source', accent:'green',
    description:'A personal assistant prototype exploring how saved context and user corrections could make conversations more useful over time.',
    built:'Connected input assessment, saved records, and model-generated plans in Python. My work focuses on how the application stores context and uses it in later responses.',
    evidence:'The prototype is private. Public demonstrations and evaluation results are not available yet.',
    limit:'Next, I want to test whether it recalls the right information, handles corrections consistently, and knows when a proactive suggestion is useful. These remain development goals.',
    tags:['Python','Persistent context','Structured outputs','Evaluation'],
  },
  {
    id:'chicago', number:'04', kind:'APPLIED ML / CLASSIFICATION',
    title:'Modeling arrest outcomes in historical records.', name:'Chicago arrest classification',
    status:'Independent notebook study', accent:'jade',
    description:'Using a 192,082-record sample of Chicago crime data, I built and evaluated a PyTorch classifier for recorded arrest outcomes, with class-balanced sampling and per-class evaluation.',
    built:'Prepared a 60-feature input matrix, built a fully connected neural network, and used class-balanced sampling. I evaluated both classes with precision, recall, and a confusion matrix.',
    evidence:'Saved notebook output reports 86% accuracy on 38,417 held-out records, against an approximately 75% majority-class baseline. Arrest-class precision is 0.78 and recall is 0.59, so the overall accuracy hides a substantial share of missed arrest records.',
    limit:'These are saved results from a random holdout, not a new run or a test on future incidents. The study examines historical records and is not intended for decisions about people.',
    href:repo+'Data-Science-Machine-Learning-Projects/tree/main/Chicago%20Crime%20Project', link:'View the notebook & results',
    tags:['PyTorch','Pandas','Scikit-learn','Model evaluation'],
  },
]

function ProjectVisual({id}) {
  if(id==='ookla') return <div className="project-visual map-visual" aria-hidden="true"><svg viewBox="0 0 360 180"><defs><linearGradient id="map-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c9eefa"/><stop offset="1" stopColor="#4a99be"/></linearGradient></defs><path d="M151 17l62 5-7 53 62 72-24 19-51-33-27-50-21-18z" fill="url(#map-glass)" fillOpacity=".65" stroke="#e0f8ff"/><g stroke="currentColor" strokeOpacity=".2"><path d="M24 45h310M24 90h310M24 135h310M85 20v145M135 20v145M185 20v145M235 20v145M285 20v145"/></g><g fill="#e2faf3" stroke="#429dab"><circle cx="170" cy="68" r="5"/><circle cx="188" cy="103" r="5"/><circle cx="235" cy="144" r="5"/></g><path d="M170 68l18 35 47 41" stroke="#b6f4d2" fill="none" strokeDasharray="4 5"/></svg><span>California / geographic study</span></div>
  if(id==='luz') return <div className="project-visual luz-visual" aria-hidden="true"><div className="luz-vector"><ProductSymbol product="luz" /></div><span>Context → correction → continuity</span></div>
  return <div className="project-visual model-visual"><div><strong>86<span>%</span></strong><p>Recorded accuracy</p></div><div><strong>0.59</strong><p>Arrest-class recall</p></div><span>Random holdout · ~75% baseline</span></div>
}

function ProjectCard({ p }) {
  return <article className={`project-card glass tone-${p.accent}`} id={p.id} data-scroll-reveal="" data-reveal-delay={p.id === 'chicago' ? '80' : undefined}>
    <ProjectVisual id={p.id}/>
    <div className="project-content">
      <p className="eyebrow">{p.number} / {p.kind}</p><span className="status-chip">{p.status}</span>
      <h3 className="project-name">{p.id === 'luz' ? <LuzBrand compact /> : <><ResearchSymbol compact /><span>{p.name}</span></>}</h3>
      <p className="project-thesis">{p.title}</p><p>{p.description}</p>
      <div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>
      <details><summary>{p.id === 'luz' ? 'My work & project notes' : 'Methods & results'} <span>+</span></summary><div className="detail-body">
        <h4>My contribution</h4><p>{p.built}</p>
        <h4>{p.id === 'luz' ? 'Current stage' : 'Results'}</h4><p>{p.evidence}</p>
        {p.id==='chicago'&&<a className="text-link" href="/images/chicago-confusion-matrix.png" target="_blank" rel="noopener noreferrer">View the confusion matrix</a>}
        <h4>Project notes</h4><p>{p.limit}</p>
      </div></details>
      {p.href&&<a className="text-link project-link" href={p.href} target="_blank" rel="noopener noreferrer">{p.link}</a>}
    </div>
  </article>
}

export default function Projects() {
  return <section id="projects" className="projects section-width">
    <div className="section-heading" data-scroll-reveal=""><div><p className="eyebrow">SELECTED WORK / 01—05</p><h2>Selected projects.</h2></div><p>Study tools, livestream automation, and research using real-world datasets.</p></div>
    <p className="project-group-label">WORKING SOFTWARE</p>
    <article className="featured-project glass" id="lumitudy" data-scroll-reveal="">
      <div className="featured-copy">
        <p className="eyebrow">01 / LEARNING SOFTWARE</p><span className="status-chip">Working prototype</span>
        <h3><LumitudyBrand compact /><span className="project-tagline">Turn chapters into practice.</span></h3>
        <p>A study app that turns textbook chapters into flashcards, quizzes, and live study sessions. Source passages stay beside flashcards so answers are easier to review.</p>
        <ul className="contribution-list"><li>Extract chapters from PDF, DOCX, and EPUB files</li><li>Generate flashcards with references to the source text</li><li>Save study sets, take quizzes, and join live quiz rooms</li></ul>
        <div className="tags"><span>FastAPI</span><span>React</span><span>WebSockets</span><span>SQLite</span></div>
        <details><summary>My work & project notes <span>+</span></summary><div className="detail-body">
          <h4>My contribution</h4><p>Built the React interface and FastAPI backend, including document parsing, chapter selection, AI-generated study material, accounts, and saved sets. The server grades exams and runs live quiz rooms over WebSockets.</p>
          <h4>Current stage</h4><p>A working prototype. Source passages help people check generated answers, but answers can still be wrong. Live rooms run in one server process and are lost on restart; recovery and concurrent use need more testing before a dependable public launch.</p>
          <p><strong>Planned home:</strong> lumitudy.com. The custom domain is not connected yet.</p>
        </div></details>
        <a className="text-link project-link" href="https://github.com/Oli-Data/lumitudy" target="_blank" rel="noopener noreferrer">View the source code</a>
      </div>
      <figure className="featured-image"><div className="window-bar"><span/><span/><span/><p>LUMITUDY / INTERFACE PREVIEW</p></div><img src="/images/lumitudy-aqua-preview.png" width="1212" height="1080" alt="Lumitudy’s aqua glass sign-in screen, with sky-blue and fresh-green study cards and a brighter way to study headline." loading="lazy"/><figcaption>Lumitudy prototype · interface preview.</figcaption></figure>
    </article>
    <article className="featured-project glass selah-project" id="selah" data-scroll-reveal="">
      <div className="featured-copy">
        <p className="eyebrow">02 / WORKFLOW AUTOMATION</p>
        <span className="status-chip">Windows alpha</span>
        <h3><SelahBrand compact /><span className="project-tagline">Livestream setup, step by step.</span></h3>
        <p>A Windows app that helps church volunteers prepare Facebook Live streams and control OBS from one place.</p>
        <ul className="contribution-list"><li>Reuse English and Spanish service details and speaker presets</li><li>Prepare Facebook Live and send stream details to OBS</li><li>Review the setup before starting streaming and recording</li></ul>
        <div className="tags"><span>Python</span><span>HTML & CSS</span><span>Windows desktop</span><span>Browser automation</span><span>OBS WebSocket</span></div>
        <details><summary>My work & project notes <span>+</span></summary><div className="detail-body">
          <h4>My contribution</h4><p>Built a Python desktop app with an HTML/CSS interface, Chrome automation for Facebook, and a local OBS WebSocket connection. The setup flow covers sign-in, service details, and stream preparation.</p>
          <h4>How it works</h4><p>Preparation keeps streaming and recording off. After a final review, the operator starts both outputs and the app checks their status. Scenes and audio stay in OBS; the operator confirms the audience and publication state on Facebook.</p>
          <h4>Current stage</h4><p>An unsigned Windows alpha that has passed local automated checks. Clean-machine and complete live-service testing are still pending. No public download is available yet.</p>
        </div></details>
        <a className="text-link project-link" href="/images/selah/selah-workspace-wide.png" target="_blank" rel="noopener noreferrer">View the full workspace screenshot</a>
      </div>
      <figure className="featured-image selah-image"><div className="window-bar"><span/><span/><span/><p>SELAH / WINDOWS DESKTOP ALPHA</p></div><div className="project-preview-crop"><img src="/images/selah/selah-workspace-wide.png" width="2560" height="1440" alt="Selah’s service editor beside the Facebook and OBS connection checks and start-review controls." loading="lazy"/></div><figcaption>Service details and connection checks · Windows alpha.</figcaption></figure>
    </article>
    <div className="research-group"><p className="project-group-label">RESEARCH & ANALYSIS</p><div className="project-grid">{projects.filter(p => p.id !== 'luz').map(p => <ProjectCard key={p.id} p={p} />)}</div></div>
    <div className="project-explorations"><div className="exploration-heading"><p className="project-group-label">EARLY EXPLORATION</p><p>Personal AI, still in development.</p></div>{projects.filter(p => p.id === 'luz').map(p => <ProjectCard key={p.id} p={p} />)}</div>
    <p className="project-disclosure">Independent software and research by Christian Olivares-Rodriguez.</p>
  </section>
}
