import { useEffect, useState } from 'react'
import { RibbonFieldBackground } from '@designcodeio/threeui'
import content from '../data/content.js'
import overrides from '../data/content.overrides.js'
import { LangContext } from './lang.jsx'
import { activateEditMode, editedCount, saveEdits } from './edit-mode.js'

/* 편집 바 — ?edit=1(dev 서버)에서만. 텍스트 즉석 편집 + 크기 노브 슬라이더 + 저장. */
const STYLE_DEFAULTS = { '--port-h': '92dvh', '--hero-type-vw': '26', '--cards-max': '64rem' }

function EditBar() {
  const [count, setCount] = useState(0)
  const [knobs, setKnobs] = useState(() => ({ ...STYLE_DEFAULTS, ...(overrides._style ?? {}) }))
  const [status, setStatus] = useState('')

  useEffect(() => {
    const n = activateEditMode()
    setStatus(`편집 가능 ${n}곳`)
    const t = setInterval(() => setCount(editedCount()), 800)
    return () => clearInterval(t)
  }, [])

  const applyKnob = (k, v) => {
    setKnobs((prev) => ({ ...prev, [k]: v }))
    if (k === '--hero-type-vw') {
      document.documentElement.style.setProperty('--hero-type', `clamp(6rem, ${v}vw, ${v * 1.05}rem)`)
    } else {
      document.documentElement.style.setProperty(k, v)
    }
  }

  const save = async () => {
    setStatus('저장 중...')
    const out = { ...knobs }
    delete out['--hero-type-vw']
    const ok = await saveEdits(out)
    if (ok) {
      setStatus('저장됨 — 새로고침')
      setTimeout(() => location.reload(), 600)
    } else {
      setStatus('저장 실패(dev 서버에서만 동작)')
    }
  }

  const slider = (label, k, min, max, step, unit, val) => (
    <label key={k} className="block">
      <span className="flex justify-between"><span>{label}</span><span>{val}{unit}</span></span>
      <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => applyKnob(k, e.target.value)} className="w-full" />
    </label>
  )

  return (
    <div className="fixed left-4 top-4 z-[70] w-56 border p-3 text-[11px] leading-relaxed" style={{ borderColor: 'var(--hairline-strong)', background: 'rgba(10,13,17,0.92)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>
      <p style={{ color: 'var(--volt)' }}>편집 모드</p>
      <p className="mt-1">{status}{count > 0 ? ` · 수정 ${count}곳` : ''}</p>
      <p className="mt-1" style={{ color: 'var(--ice-mute)' }}>텍스트: 페이지 문구를 클릭해 직접 수정</p>
      <div className="mt-3 space-y-2">
        {slider('초상 높이', '--port-h', 60, 100, 1, 'dvh', knobs['--port-h'])}
        {slider('타이포 크기', '--hero-type-vw', 12, 34, 1, 'vw', knobs['--hero-type-vw'])}
        {slider('카드 폭', '--cards-max', 48, 72, 1, 'rem', knobs['--cards-max'])}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={save} className="border px-2 py-1" style={{ borderColor: 'var(--volt)', color: 'var(--volt)' }}>저장</button>
        <button onClick={() => location.reload()} className="border px-2 py-1" style={{ borderColor: 'var(--hairline-strong)', color: 'var(--ice-dim)' }}>취소</button>
        <a href={location.pathname} className="border px-2 py-1 no-underline" style={{ borderColor: 'var(--hairline-strong)', color: 'var(--ice-dim)' }}>종료</a>
      </div>
    </div>
  )
}

/*
 * 공통 페이지 셸 — 언어 상태(KO 기본, localStorage + html lang), 언어 토글, ?motion=1 검수 플래그,
 * ?edit=1 편집 모드(dev). 리본 배경은 페이지 전체에 흐른다. _style 노브는 로드 시 즉시 적용.
 */
export default function PageShell({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || content.meta.defaultLang)
  const editMode = new URLSearchParams(window.location.search).has('edit')

  useEffect(() => {
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('motion')) {
      document.body.dataset.forceMotion = '1'
    }
  }, [])

  useEffect(() => {
    const s = overrides._style ?? {}
    for (const [k, v] of Object.entries(s)) {
      if (k === '--hero-type-vw') document.documentElement.style.setProperty('--hero-type', `clamp(6rem, ${v}vw, ${v * 1.05}rem)`)
      else document.documentElement.style.setProperty(k, v)
    }
  }, [])

  return (
    <LangContext.Provider value={lang}>
      <div className="relative isolate min-h-dvh">
        <div className="bg-in fixed inset-0 -z-10">
          <RibbonFieldBackground className="absolute inset-0" />
        </div>
        {editMode ? <EditBar /> : null}
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
