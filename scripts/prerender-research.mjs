import { build } from 'vite'
import react from '@vitejs/plugin-react'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Keep the full article, table, and download links readable before hydration,
// as they were in the original statically rendered Next.js page.
const temporary = await mkdtemp(resolve('.research-prerender-'))
try {
  await build({
    configFile: false,
    plugins: [react()],
    logLevel: 'warn',
    build: {
      ssr: 'src/research/App.jsx',
      outDir: temporary,
      copyPublicDir: false,
      rollupOptions: { output: { entryFileNames: 'article.mjs' } },
    },
  })
  const { default: ResearchApp } = await import(pathToFileURL(resolve(temporary, 'article.mjs')).href)
  const path = resolve('dist/research/california-mobile-broadband-divide/index.html')
  const html = await readFile(path, 'utf8')
  const placeholder = '<div id="root"></div>'
  if (!html.includes(placeholder)) throw new Error('Research HTML root was not found')
  await writeFile(path, html.replace(placeholder, `<div id="root">${renderToString(createElement(ResearchApp))}</div>`))
  console.log('Prerendered the broadband article with its evidence and downloads.')
} finally {
  await rm(temporary, { recursive: true, force: true })
}
