import Nav from '../components/Nav'
import SceneBackdrop from './SceneBackdrop'
import ArrowIcon from './ArrowIcon'
import OoklaTrend from './ookla-trend'
import ResearchFooter from './ResearchFooter'
import { ooklaPost as post } from './ookla-post'

// Article content and presentation migrated from CO3; navigation belongs to the portfolio.
export default function Article() {
  const tile = (base) => `${base} research-tile glass-card`
  return (
    <main id="main" className="publication scenic-page reading-page"><SceneBackdrop variant="article" />
      <Nav homePath="/" />
      <article className="article-width research-tile-article">
        <header className={tile("article-heading")}><a className="back-link" href="/#projects">← Back to selected work</a><div className="post-meta"><span>{post.category}</span><span>Research draft</span><span>{post.readingTime}</span></div><h1>{post.title}</h1><p className="article-deck">{post.summary}</p><div className="article-byline"><span className="author-mark" aria-hidden="true">CO³</span><div><strong>Christian Olivares-Rodriguez</strong><span>CO³ Labs · Research draft</span></div></div></header>
        <aside className="article-example-note">Research draft · Prepared from the project’s saved data and notebook outputs. This article has not been published.</aside>
        <aside className={tile("takeaways")}><span className="eyebrow">The short version</span><ul>{post.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></aside>
        <div className="article-body" data-sticky-showcase={post.blocks.some(block => block.type === "ookla-trend") ? "research" : undefined}>{post.blocks.map((block, index) => {
          if (block.type === "ookla-trend") return <div key={index} className={tile("research-chart-tile")} data-showcase-stage="0"><OoklaTrend /></div>
          if (block.type === "table") return <section key={index} className="research-tile glass-card" data-showcase-stage="1"><h2>{block.heading}</h2><figure><div className="research-table-scroll" role="region" aria-label={block.heading} tabIndex={0}><table><thead><tr>{block.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{block.rows.map(row => <tr key={row.join('|')}>{row.map((value, cell) => cell === 0 ? <th key={cell} scope="row">{value}</th> : <td key={cell}>{value}</td>)}</tr>)}</tbody></table></div><figcaption>{block.caption}</figcaption></figure></section>
          return <section key={index} className="research-tile glass-card" data-showcase-step={String(index)}><h2>{block.heading}</h2>{block.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{block.sources && <div className="article-source-links">{block.sources.map(source => <a key={source.href} href={source.href}>{source.label} <ArrowIcon href={source.href} /></a>)}</div>}</section>
        })}</div>
        <div className={tile("article-resources")}><div><span className="eyebrow">Explore the evidence</span><h2>{post.notebook ? "Take the notebook with you." : "Research is a conversation."}</h2><p>{post.notebook ? (post.notebookDescription ?? "Download the example, inspect the inputs, and run it locally in Jupyter.") : "Questions and corrections are welcome. Get in touch with the lab."}</p></div>{post.notebook && <a href={post.notebook} download className="journal-button">Download notebook ↓</a>}<a href="mailto:hello@co3labs.com" className="resource-contact">Questions or corrections?</a></div>
        {post.evidence && <div className={tile("article-evidence-links")}>{post.evidence.map(resource => <a key={resource.href} href={resource.href}>{resource.label} <ArrowIcon href={resource.href} /></a>)}</div>}
      </article>
      <section className="article-width related-posts research-tile-related"><div className="section-intro glass-card glass-card-blue"><div className="section-rule"><h2>Keep exploring</h2></div></div><a href="/#projects" className="glass-card"><span className="eyebrow">Independent software & research</span><h3>Explore more of my work</h3></a></section>
      <ResearchFooter />
    </main>
  )
}
