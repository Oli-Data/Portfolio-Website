import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appearanceInitScript } from './src/lib/appearance.js'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  build: { rollupOptions: { input: {
    portfolio: fileURLToPath(new URL('./index.html', import.meta.url)),
    broadband: fileURLToPath(new URL('./research/california-mobile-broadband-divide/index.html', import.meta.url)),
  } } },
  plugins: [react(), { name: 'portfolio-appearance', transformIndexHtml(html) {
    return html.replace('<!-- portfolio-appearance -->', `<script>${appearanceInitScript}</script>`)
  } }],
})
