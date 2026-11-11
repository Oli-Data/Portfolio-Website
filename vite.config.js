import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { appearanceInitScript } from './src/lib/appearance.js'

export default defineConfig({
  plugins: [react(), { name: 'portfolio-appearance', transformIndexHtml(html) {
    return html.replace('<!-- portfolio-appearance -->', `<script>${appearanceInitScript}</script>`)
  } }],
})
