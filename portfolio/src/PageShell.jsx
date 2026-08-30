import { useEffect, useState } from 'react'
import { RibbonFieldBackground } from '@designcodeio/threeui'
import content from '../data/content.js'
import { LangContext } from './lang.jsx'

/*
 * 공통 페이지 셸 — 언어 상태(KO 기본, localStorage + html lang), 언어 토글, ?motion=1 검수 플래그.
 * 모든 페이지(메인/서브페이지/프로젝트 상세)가 이 셸을 공유한다.
 * 리본 배경은 페이지 전체에 걸쳐 흐른다.
 * 문서 메타(title·description·OG)도 언어를 따라 갱신한다(2026-08-31).
 */

function setMetaAttr(selector, value) {
  document.querySelector(selector)?.setAttribute('content', value)
}

function updateDocumentMeta(lang) {
  const pageKey = new URLSearchParams(window.location.search).get('page')
  const def = pageKey && content.pages[pageKey] ? content.pages[pageKey] : null
  const name = `${t0(content.profile.name, lang)} ${content.profile.ign}`
  document.title = def
    ? `${def.label[lang] ?? def.label.ko} · ${name}`
    : `${content.siteMeta.title[lang]} `
  const desc = content.siteMeta.description[lang]
  setMetaAttr('meta[name="description"]', desc)
  setMetaAttr('meta[property="og:title"]', content.siteMeta.ogTitle[lang])
  setMetaAttr('meta[property="og:description"]', content.siteMeta.ogDescription[lang])
}

// 프로젝트 상세 등 하위 컴포넌트가 문서 제목을 덮어쓸 수 있게 셸은 라벨 조회만 제공
function t0(loc, lang) {
  return (loc && (loc[lang] ?? loc.ko)) ?? ''
}

export default function PageShell({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || content.meta.defaultLang)

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
    updateDocumentMeta(lang)
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
