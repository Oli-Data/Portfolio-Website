import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import ResearchApp from './App'

const root = document.getElementById('root')
const app = <StrictMode><ResearchApp /></StrictMode>
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
