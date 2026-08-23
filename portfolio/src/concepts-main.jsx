/*
 * 스타일 콘셉트 피커 하니스 — prototype 스킬(PICKER.md verbatim 피커 + 행동 계약)
 * + 사용자 요청 핀포인트 도구: 배경 셰이더 즉시 교체(콘셉트당 독립 상태)
 * 키: 1-5 / ←→ 콘셉트 전환, R 재생(입장 모션 리플레이), ?v= URL 유지
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as T from '@designcodeio/threeui'
import './concepts/picker.css'
import './concepts/shared.css'
import './styles/app.css'
import C1 from './concepts/C1.jsx'
import C2 from './concepts/C2.jsx'
import C3 from './concepts/C3.jsx'
import C4 from './concepts/C4.jsx'
import C5 from './concepts/C5.jsx'

const VARIANTS = [
  { name: '잉크 전시관', Comp: C1, bg: 'DataField' },
  { name: '임버 대성당', Comp: C2, bg: 'EmberStorm' },
  { name: '방송 계기판', Comp: C3, bg: 'ConstellationField' },
  { name: '스타크 지면', Comp: C4, bg: 'DotMatrixBackground' },
  { name: '관측소', Comp: C5, bg: 'RibbonFieldBackground' },
]

const BG_OPTIONS = [
  'DataField',
  'ConstellationField',
  'RibbonFieldBackground',
  'EmberStorm',
  'CrtBackground',
  'DotMatrixBackground',
  'WarpFieldBackground',
  '(없음)',
]

function initialIndex() {
  const v = parseInt(new URLSearchParams(location.search).get('v'), 10)
  if (!Number.isNaN(v)) return Math.min(Math.max(v - 1, 0), VARIANTS.length - 1)
  return 0
}

function Harness() {
  const [idx, setIdx] = useState(initialIndex)
  const [bgOverride, setBgOverride] = useState({})
  const [replayKey, setReplayKey] = useState(0)
  const navRef = useRef(null)
  const hlRef = useRef(null)
  const itemRefs = useRef([])

  function moveHighlight() {
    const el = itemRefs.current[idx]
    if (!el || !hlRef.current) return
    hlRef.current.style.width = `${el.offsetWidth}px`
    hlRef.current.style.transform = `translateX(${el.offsetLeft}px)`
  }

  useLayoutEffect(moveHighlight, [idx])

  useEffect(() => {
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => navRef.current?.setAttribute('data-ready', '')))
    window.addEventListener('resize', moveHighlight)
    const onKey = (e) => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const n = parseInt(e.key, 10)
      if (n >= 1 && n <= VARIANTS.length) setIdx(n - 1)
      else if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % VARIANTS.length)
      else if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + VARIANTS.length) % VARIANTS.length)
      else if (e.key === 'r' || e.key === 'R') setReplayKey((k) => k + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', moveHighlight)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    const url = new URL(location)
    url.searchParams.set('v', idx + 1)
    history.replaceState(null, '', url)
    window.scrollTo(0, 0)
  }, [idx])

  const v = VARIANTS[idx]
  const bgName = bgOverride[idx] ?? v.bg
  const Bg = bgName === '(없음)' ? null : T[bgName]

  return (
    <>
      <div key={`${idx}-${bgName}-${replayKey}`}>
        <v.Comp Bg={Bg} />
      </div>

      {/* 핀포인트 도구(해니스 크롬): 콘셉트당 배경 셰이더 즉시 교체 */}
      <label
        htmlFor="bg-swap"
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 2147483647,
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
          borderRadius: 999, background: 'rgba(10,10,10,0.82)', color: 'rgba(255,255,255,0.55)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 12, backdropFilter: 'blur(12px) saturate(1.4)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 24px rgba(0,0,0,0.24)',
          userSelect: 'none',
        }}
      >
        배경
        <select
          id="bg-swap"
          value={bgName}
          onChange={(e) => setBgOverride((o) => ({ ...o, [idx]: e.target.value }))}
          style={{ background: 'transparent', border: 0, color: '#fff', font: 'inherit', cursor: 'pointer' }}
        >
          {BG_OPTIONS.map((o) => <option key={o} value={o} style={{ color: '#111' }}>{o}</option>)}
        </select>
      </label>

      <nav ref={navRef} className="proto-picker" aria-label="Prototype variants">
        <span ref={hlRef} className="proto-picker-highlight" aria-hidden="true"></span>
        {VARIANTS.map((x, i) => (
          <button
            key={x.name}
            ref={(el) => { itemRefs.current[i] = el }}
            className="proto-picker-item"
            data-active={i === idx || undefined}
            aria-current={i === idx ? 'true' : undefined}
            onClick={() => setIdx(i)}
          >
            {x.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true"></span>
        <button className="proto-picker-item proto-picker-replay" aria-label="Replay animation (R)" onClick={() => setReplayKey((k) => k + 1)}>↻</button>
      </nav>
    </>
  )
}

createRoot(document.getElementById('root')).render(<Harness />)
