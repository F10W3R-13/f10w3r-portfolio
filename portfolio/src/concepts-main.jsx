/*
 * 스타일 콘셉트 피커 하니스 — prototype 스킬(PICKER.md verbatim 피커 + 행동 계약)
 * + 핀포인트 도구: 부품(배경/계기/타입/버튼) 즉시 교체. 부품 슬롯 렌더는 C3에 적용.
 * 키: 1-5 / ←→ 콘셉트 전환, R 재생, ?v= URL 유지
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import * as T from '@designcodeio/threeui'
import './concepts/picker.css'
import './concepts/shared.css'
import './styles/app.css'
import C1 from './concepts/C1.jsx'
import C2 from './concepts/C2.jsx'
import C3, { CustomCTA } from './concepts/C3.jsx'
import C4 from './concepts/C4.jsx'
import C5 from './concepts/C5.jsx'

const VARIANTS = [
  { name: '잉크 전시관', Comp: C1, bg: 'DataField' },
  { name: '임버 대성당', Comp: C2, bg: 'EmberStorm' },
  { name: '방송 계기판', Comp: C3, bg: 'RibbonFieldBackground' },
  { name: '스타크 지면', Comp: C4, bg: 'DotMatrixBackground' },
  { name: '관측소', Comp: C5, bg: 'RibbonFieldBackground' },
]

const NONE = '(없음)'
const CUSTOM_BTN = '(직접 제작)'
const BG_OPTIONS = ['DataField', 'ConstellationField', 'RibbonFieldBackground', 'EmberStorm', 'CrtBackground', 'DotMatrixBackground', 'WarpFieldBackground', NONE]
const HUD_OPTIONS = ['InterfaceLines', 'DefenseLines', 'ConnectivityGraph', 'DiagnosticsPanel', 'PredictiveArcCanvas', 'UplinkLoader', NONE]
const TYPE_OPTIONS = ['TypographyVortexCanvas', 'CharacterWave', 'OutlineTypeflow', 'NeonTypography', 'AudioWordmark', 'ParticleWordmark', NONE]
const BTN_OPTIONS = [CUSTOM_BTN, 'IgnitionButton', 'TactileButton', 'LaunchButton', 'InductionButton', 'PlasmaButton', 'ThinkingButton', 'SlidingTextCta', 'FloatingDotsCta', 'DotBorderButton', 'SpinningBorderButton', NONE]

// 사용자 2026-08-24 픽: C3 배경 RibbonField · 타입 ParticleWordmark(고정텍스트 주의) · 버튼 직접 제작
const PART_DEFAULTS = { hud: 'InterfaceLines', type: 'ParticleWordmark', btn: CUSTOM_BTN }
const PARTS = [
  ['배경', 'bg', BG_OPTIONS],
  ['계기 (C3)', 'hud', HUD_OPTIONS],
  ['타입 (C3)', 'type', TYPE_OPTIONS],
  ['버튼 (C3)', 'btn', BTN_OPTIONS],
]

function initialIndex() {
  const v = parseInt(new URLSearchParams(location.search).get('v'), 10)
  if (!Number.isNaN(v)) return Math.min(Math.max(v - 1, 0), VARIANTS.length - 1)
  return 0
}

function Harness() {
  const [idx, setIdx] = useState(initialIndex)
  const [override, setOverride] = useState({})
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
  const o = override[idx] ?? {}
  const name = {
    bg: o.bg ?? v.bg,
    hud: o.hud ?? PART_DEFAULTS.hud,
    type: o.type ?? PART_DEFAULTS.type,
    btn: o.btn ?? PART_DEFAULTS.btn,
  }
  const get = (n) => (n === CUSTOM_BTN ? CustomCTA : n === NONE || !T[n] ? null : T[n])
  const parts = { Bg: get(name.bg), Hud: get(name.hud), Type: get(name.type), Btn: get(name.btn) }
  const partKey = `${name.bg}|${name.hud}|${name.type}|${name.btn}`

  return (
    <>
      <div key={`${idx}-${partKey}-${replayKey}`}>
        <v.Comp {...parts} />
      </div>

      {/* 핀포인트 도구(해니스 크롬): 부품 즉시 교체 */}
      <div
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 2147483647,
          display: 'grid', gap: 4, padding: '10px 12px',
          borderRadius: 12, background: 'rgba(10,10,10,0.82)', color: 'rgba(255,255,255,0.55)',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: 12, backdropFilter: 'blur(12px) saturate(1.4)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 24px rgba(0,0,0,0.24)',
          userSelect: 'none',
        }}
      >
        {PARTS.map(([label, key, options]) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ minWidth: 52 }}>{label}</span>
            <select
              value={name[key]}
              onChange={(e) => setOverride((prev) => ({ ...prev, [idx]: { ...prev[idx], [key]: e.target.value } }))}
              style={{ background: 'transparent', border: 0, color: '#fff', font: 'inherit', cursor: 'pointer', maxWidth: 190 }}
            >
              {options.map((opt) => <option key={opt} value={opt} style={{ color: '#111' }}>{opt}</option>)}
            </select>
          </label>
        ))}
      </div>

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
