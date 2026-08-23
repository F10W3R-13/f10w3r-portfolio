import { useEffect, useState } from 'react'
import content from '../data/content.js'
import { LangContext } from './lang.jsx'
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
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || content.meta.defaultLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  // 모션 검수용: ?motion=1 이면 OS reduce를 무시하고 재생(배포 동작에는 영향 없음)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('motion')) {
      document.body.dataset.forceMotion = '1'
    }
  }, [])

  return (
    <LangContext.Provider value={lang}>
      <div
        className="fixed right-4 top-4 z-50 flex gap-1 border px-1.5 py-1"
        style={{ borderColor: 'var(--hairline)', background: 'rgba(10,13,17,0.72)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
      >
        {content.meta.langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-1.5 py-0.5 transition-colors"
            style={{ color: lang === l ? 'var(--volt)' : 'var(--ice-mute)' }}
            aria-pressed={lang === l}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <main>
        {content.page.sections.map((id) => {
          const Section = SECTIONS[id]
          return Section ? <Section key={id} /> : null
        })}
      </main>
    </LangContext.Provider>
  )
}
