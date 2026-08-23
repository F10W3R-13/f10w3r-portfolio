import content from '../data/content.js'
import PageShell from './PageShell.jsx'
import Hero from './sections/Hero.jsx'
import Career from './sections/Career.jsx'
import Achievements from './sections/Achievements.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Education from './sections/Education.jsx'
import Contact from './sections/Contact.jsx'

/* 섹션 렌더러 레지스트리 — 표시 순서는 content.page.sections 배열이 결정한다 */
const SECTIONS = {
  hero: Hero,
  career: Career,
  achievements: Achievements,
  projects: Projects,
  skills: Skills,
  education: Education,
  contact: Contact,
}

export default function App() {
  return (
    <PageShell>
      <main>
        {content.page.sections.map((id) => {
          const Section = SECTIONS[id]
          return Section ? <Section key={id} /> : null
        })}
      </main>
    </PageShell>
  )
}
