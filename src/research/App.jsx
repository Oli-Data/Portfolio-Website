import Article from './Article'
import Ambient from './Ambient'
import PanelReveal from './PanelReveal'
import CursorReflections from './CursorReflections'
import './styles/globals.css'
import './styles/appearance.css'
import './styles/layout.css'
import './styles/interaction-glass.css'
import './styles/shell.css'

export default function ResearchApp() {
  return <>
    <Ambient />
    <PanelReveal />
    <CursorReflections />
    <a className="research-skip" href="#main">Skip to content</a>
    <Article />
  </>
}
