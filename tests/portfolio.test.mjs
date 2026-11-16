import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import vm from 'node:vm'
import { createHash } from 'node:crypto'
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const current = read('src/components/Projects.jsx')
const original = read('tests/fixtures/projects-before-co3.txt')
const projectData = source => vm.runInNewContext(source.slice(source.indexOf('const repo ='),source.indexOf('function ProjectVisual')) + '; projects')

test('copy revisions preserve project identities, maturity, destinations and recorded metrics', () => {
  const before = projectData(original), after = projectData(current)
  for (const old of before) {
    const next = after.find(p => p.id === old.id)
    assert.ok(next, old.id)
    for (const key of ['id', 'kind', 'name', 'status', 'accent', 'href', 'tags']) assert.equal(JSON.stringify(next[key]), JSON.stringify(old[key]), `${old.id}.${key}`)
    for (const key of ['description', 'built', 'evidence', 'limit']) assert.ok(next[key]?.trim(), `${old.id}.${key}`)
  }
  assert.equal(after.length, before.length)
  const chicago = after.find(p => p.id === 'chicago')
  const recordedMetrics = /\d+(?:[,.]\d+)*%?/g
  assert.deepEqual(chicago.evidence.match(recordedMetrics), before.find(p => p.id === 'chicago').evidence.match(recordedMetrics))
  assert.match(chicago.limit, /random (?:split|holdout)/)
  assert.match(current, /Random holdout · ~75% baseline/)
})

test('project copy retains existing images, URLs and downloadable artifacts', () => {
  for (const source of original.matchAll(/(?:href|src)="([^"]+)"/g)) assert.ok(current.includes(source[1]), source[1])
  for(const path of ['/images/lumitudy-aqua-preview.png','/images/chicago-confusion-matrix.png','/Christian_Olivares_Rodriguez_Resume.pdf']) assert.ok(existsSync(new URL('../public' + path, import.meta.url)), path)
})

test('working software precedes research and early exploration without hidden evidence', () => {
  assert.ok(current.indexOf('WORKING SOFTWARE') < current.indexOf('RESEARCH & ANALYSIS'))
  assert.ok(current.indexOf('RESEARCH & ANALYSIS') < current.indexOf('EARLY EXPLORATION'))
  assert.match(current,/projects.filter\(p => p.id !== 'luz'\)/)
  assert.match(current,/<details><summary>[\s\S]*?<div className="detail-body">[\s\S]*?\{p.built\}[\s\S]*?\{p.evidence\}[\s\S]*?\{p.limit\}[\s\S]*?<\/details>/)
  assert.match(current,/data-research-symbol|ResearchSymbol compact/)
  assert.match(current,/<LumitudyBrand compact/)
  assert.match(current,/<LuzBrand compact/)
})

test('single-page navigation remains keyboard usable, dismissible and bounded on phones', () => {
  const nav=read('src/components/Nav.jsx'), css=read('src/styles/refinements.css'), appearance=read('src/styles/appearance.css'), control=read('src/components/ThemeControl.jsx')
  assert.match(nav,/<details className="mobile-menu"/)
  for(const event of ['pointerdown','keydown','hashchange','popstate','change']) assert.ok(nav.includes(`'${event}'`))
  assert.match(nav,/trigger.current\?\.focus\(\)/)
  assert.match(nav,/menu.current.open = false/)
  assert.match(control,/inert=\{!open\}/)
  assert.match(control,/aria-pressed=/)
  assert.match(control,/event.key === 'Escape'/)
  assert.match(css,/grid-template-columns:1fr/)
  assert.match(appearance,/width:min\(292px,100%\)/)
  assert.match(appearance,/100dvh - 110px - env\(safe-area-inset-bottom\)/)
  assert.match(appearance,/--surface-alpha: .58/)
  assert.match(appearance,/--surface-alpha: .59/)
  assert.match(read('src/components/Nav.css'),/backdrop-filter:blur\(28px\)/)
  assert.match(read('src/styles/globals.css'),/backdrop-filter:blur\(24px\)/)
  assert.match(css,/prefers-reduced-motion:reduce/)
  assert.match(appearance,/forced-colors:active/)
})

test('local anchors have actual destinations and no future-home link was fabricated', () => {
  const all=['Hero','Projects','About','Footer','Nav'].map(name=>read(`src/components/${name}.jsx`)).join('\n')
  for(const anchor of all.matchAll(/href="#([^"]+)"/g)) assert.ok(all.includes(`id="${anchor[1]}"`),anchor[1])
  assert.match(all,/id="projects"/)
  assert.match(all,/id="about"/)
  assert.match(all,/id="contact"/)
  assert.doesNotMatch(all,/href="https?:\/\/lumitudy.com/)
})


test('primary actions retain accessible depth while supporting destinations stay quiet', () => {
  const components=['Hero','Projects','About','Footer','Nav'].map(name=>read(`src/components/${name}.jsx`)).join('\n')
  assert.doesNotMatch(components, /ArrowIcon|Scroll to explore ↓|Back to top ↑|>→</)
  const css=read('src/styles/refinements.css')
  assert.match(css, /a\[href\]\.button/)
  assert.match(css, /a\[href\]\.text-link/)
  assert.match(css, /text-decoration:underline/)
  assert.match(css, /perspective\(700px\) rotateX\(3deg\)/)
  assert.match(css, /min-height:44px/)
  assert.match(css, /:focus-visible/)
  assert.match(css, /prefers-reduced-motion:reduce/)
  assert.match(css, /forced-colors:active/)
})


test('Selah is a fifth project with the approved identity and honest alpha boundaries', () => {
  const selah = current.slice(current.indexOf('<article className="featured-project glass selah-project"'), current.indexOf('<div className="research-group">'))
  assert.match(current, /SELECTED WORK \/ 01—05/)
  assert.match(selah, /id="selah"/)
  assert.match(selah, /<SelahBrand compact/)
  assert.match(selah, /status-chip">Windows alpha</)
  assert.match(selah, /unsigned Windows alpha/)
  assert.match(selah, /Clean-machine and complete live-service testing are still pending/)
  assert.match(selah, /No public download is available yet/)
  assert.match(selah, /Preparation keeps streaming and recording off/)
  assert.match(selah, /final review[\s\S]*operator starts both outputs/)
  assert.match(selah, /operator confirms the audience and publication state on Facebook/)
  assert.ok(current.indexOf('id="lumitudy"') < current.indexOf('id="selah"'))
  assert.ok(current.indexOf('id="selah"') < current.indexOf('RESEARCH & ANALYSIS'))
  const brand = read('src/components/SelahBrand.jsx')
  assert.match(brand, /Exact Newsreader Medium 500/)
  assert.match(brand, /product="selah"/)
  assert.match(brand, /aria-label="Selah"/)
  assert.doesNotMatch(selah, /href="https?:|download=/)
})

test('Selah uses the unaltered real workspace screenshot and valid native image link', () => {
  const path = '/images/selah/selah-workspace-wide.png'
  const bytes = readFileSync(new URL('../public' + path, import.meta.url))
  assert.equal(createHash('sha256').update(bytes).digest('hex'), '55501c2fd47f926d6b008e77fab9de59e9fe64a4af8a6cddddf3c5f3b41f4ddd')
  assert.ok(current.includes(`href="${path}"`))
  assert.ok(current.includes(`src="${path}" width="2560" height="1440"`))
})

test('CO initials center the visible pair without trailing negative letter spacing', () => {
  const nav = read('src/components/Nav.jsx'), css = read('src/styles/refinements.css')
  assert.match(nav, /className="monogram-letters">c<span>o<\/span>/)
  assert.match(css, /\.monogram \{ letter-spacing:0; \}/)
  assert.match(css, /\.monogram-letters \{ display:inline-flex; align-items:center; letter-spacing:0; \}/)
  assert.match(css, /\.monogram-letters > span \{ margin-inline-start:-\.08em; \}/)
})
