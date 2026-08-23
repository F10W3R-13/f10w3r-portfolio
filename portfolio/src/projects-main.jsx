import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css'
import '@designcodeio/threeui/style.css'
import './styles/app.css'
import PageShell from './PageShell.jsx'
import ProjectDetail from './ProjectDetail.jsx'

const id = new URLSearchParams(window.location.search).get('id')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PageShell>
      <ProjectDetail id={id} />
    </PageShell>
  </StrictMode>,
)
