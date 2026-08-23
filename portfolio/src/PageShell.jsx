import { useEffect, useState } from 'react'
import { RibbonFieldBackground } from '@designcodeio/threeui'
import content from '../data/content.js'
import { LangContext } from './lang.jsx'

/*
 * 공통 페이지 셸 — 언어 상태(KO 기본, localStorage + html lang), 언어 토글, ?motion=1 검수 플래그.
 * 모든 페이지(메인/프로젝트 상세)가 이 셸을 공유한다.
 * 리본 배경은 히어로 전용이 아니라 페이지 전체에 걸쳐 흐른다(아래로 갈수록 마스크로 감쇠).
 */
export default function PageShell({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || content.meta.defaultLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('motion')) {
      document.body.dataset.forceMotion = '1'
    }
  }, [])

  return (
    <LangContext.Provider value={lang}>
      <div className="relative isolate min-h-dvh">
        <div className="bg-in fixed inset-0 -z-10">
          <RibbonFieldBackground className="absolute inset-0" />
        </div>
        <div
          className="fixed right-4 top-4 z-50 flex gap-1 border px-1.5 py-1"
          style={{ borderColor: 'var(--hairline)', background: 'rgba(10,13,17,0.72)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
        >
          {content.meta.langs.map((l) => (
            <button key={l} onClick={() => setLang(l)} className="lang-btn px-2 py-1.5" aria-pressed={lang === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        {children}
      </div>
    </LangContext.Provider>
  )
}
