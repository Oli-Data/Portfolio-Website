import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { ooklaPost } from '../src/research/ookla-post.js'

const read = path => readFileSync(new URL('../' + path, import.meta.url))
const digest = value => createHash('sha256').update(value).digest('hex')
// Expected hashes were taken from the CO3 source commit, before conversion.
const source = JSON.parse(read('tests/fixtures/research-source.json'))

test('migration preserves every article field, paragraph, finding, table, and source', () => {
  assert.equal(digest(JSON.stringify(ooklaPost)), source.postSha256)
})

test('article presentation and all evidence files match the CO3 originals byte for byte', () => {
  for (const [path, expected] of Object.entries(source.files)) assert.equal(digest(read(path)), expected, path)
  assert.equal(digest(read('src/research/ookla-data.json')), digest(read('public/data/ookla-article-evidence.json')))
})

test('download URLs resolve to included artifacts and the notebook is valid JSON', () => {
  const paths = [ooklaPost.notebook, ...ooklaPost.evidence.map(item => item.href).filter(href => href.startsWith('/'))]
  for (const path of paths) assert.ok(existsSync(new URL('../public' + path, import.meta.url)), path)
  const notebook = JSON.parse(read('public' + ooklaPost.notebook))
  assert.equal(notebook.nbformat, 4)
  assert.ok(notebook.cells.some(cell => cell.cell_type === 'code'))
})
