import content from '../data/content.js'
import PageShell from './PageShell.jsx'
import Hero from './sections/Hero.jsx'
import Categories from './sections/Categories.jsx'
import Career from './sections/Career.jsx'
import Achievements from './sections/Achievements.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'
import Education from './sections/Education.jsx'
import Contact from './sections/Contact.jsx'

/* 섹션 렌더러 레지스트리 — 표시 순서는 content.page.sections 배열이 결정한다 */
const SECTIONS = {
  hero: Hero,
  categories: Categories,
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
          if (!Section) return null
          // 배경 밴드: page.flat에 속한 섹션은 불투명 잉크 배경으로 리본을 덮는다(가독성 밴드)
          // 래퍼 id는 /#projects 같은 백링크 앵커의 실제 대상
          return (
            <div key={id} id={id} className={content.page.flat?.includes(id) ? 'bg-solid' : undefined}>
              <Section />
            </div>
          )
        })}
      </main>
    </PageShell>
  )
}
