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
import PageHead from './sections/PageHead.jsx'

/* 섹션 렌더러 레지스트리 — 표시 순서는 page/pages 정의의 sections 배열이 결정한다.
   ?page=<id>는 서브페이지(랜딩 카드 진입점), 없으면 메인. */
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
  const pageKey = new URLSearchParams(window.location.search).get('page')
  const def = pageKey && content.pages[pageKey] ? content.pages[pageKey] : content.page
  const isSub = def !== content.page

  // 문서 title·메타 갱신은 PageShell이 언어 전환까지 함께 담당한다(2026-08-31 이전 이곳의 하드코딩 제거)

  return (
    <PageShell>
      {isSub ? <PageHead def={def} /> : null}
      <main>
        {def.sections.map((id) => {
          const Section = SECTIONS[id]
          if (!Section) return null
          // 배경 밴드: flat에 속한 섹션은 불투명 잉크 배경으로 리본을 덮는다(가독성 밴드)
          // 래퍼 id는 앵커의 실제 대상. projects는 페이지 정의의 projectFilter로 걸러 렌더.
          return (
            <div key={id} id={id} className={def.flat?.includes(id) ? 'bg-solid' : undefined}>
              <Section filter={id === 'projects' ? def.projectFilter : undefined} />
            </div>
          )
        })}
      </main>
    </PageShell>
  )
}
