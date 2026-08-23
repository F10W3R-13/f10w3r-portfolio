/*
 * threeui 취향 보드 — Stage 1 캘리브레이션 도구 (사이트 아님, 배포 제외)
 * 반응 방식: 카드 코드(B-01 등)로 좋다/싫다. 결과는 taste-library/_index.md에 기록.
 * 셰이더 판단용이므로 reduced-motion을 무시하고 재생. 뷰포트 밖 카드는 언마운트(WebGL 컨텍스트 절약).
 */
import { StrictMode, Component, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@designcodeio/threeui/style.css'
import './styles/app.css'
import * as T from '@designcodeio/threeui'

const SECTIONS = [
  {
    id: 'B', title: 'B · 배경 / 필드',
    items: [
      ['DotMatrixBackground', 'fill'], ['CrtBackground', 'fill'], ['DataField', 'fill'],
      ['ConstellationField', 'fill'], ['TopoField', 'fill'], ['TopologyField', 'fill'],
      ['FlowField', 'fill'], ['ExpanseField', 'fill'], ['VoidField', 'fill'],
      ['FluxVortex', 'fill'], ['EmberStorm', 'fill'], ['NebulaBackground', 'fill'],
      ['WarpFieldBackground', 'fill'], ['RibbonFieldBackground', 'fill'], ['StreamConvergenceBackground', 'fill'],
      ['DimensionalField', 'fill'], ['ElementsBackground', 'fill'], ['FluidFieldBackground', 'fill'],
      ['LiquidFormBackground', 'fill'], ['RecursiveErosionBackground', 'fill'], ['AmberHalftone', 'fill'],
      ['HalftoneFlow', 'fill'], ['ParticleDrift', 'fill'], ['ParticleNetwork', 'fill'],
      ['ParticleOrbField', 'fill'], ['LogicCoreField', 'fill'],
    ],
  },
  {
    id: 'H', title: 'H · HUD / 계기',
    items: [
      ['InterfaceLines', 'fill'], ['DefenseLines', 'fill'], ['ConnectivityGraph', 'center'],
      ['PredictiveArcCanvas', 'center'], ['DiagnosticsPanel', 'center'], ['PerformanceGauges', 'center'],
      ['UplinkLoader', 'center'], ['QuanteraTradingBackground', 'fill'],
    ],
  },
  {
    id: 'T', title: 'T · 타입 / 모션',
    items: [
      ['NeonTypography', 'center'], ['OutlineTypeflow', 'center'], ['AudioWordmark', 'center'],
      ['ParticleWordmark', 'center'], ['CharacterWave', 'center'], ['CharacterFilmstrip', 'center'],
      ['TextAnimationCollection', 'center'], ['TypographyVortexCanvas', 'center'],
    ],
  },
  {
    id: 'C', title: 'C · 버튼 / CTA',
    items: [
      ['IgnitionButton', 'center'], ['InductionButton', 'center'], ['PlasmaButton', 'center'],
      ['TactileButton', 'center'], ['ThinkingButton', 'center'], ['SlidingTextCta', 'center'],
      ['FloatingDotsCta', 'center'], ['LaunchButton', 'center'], ['DotBorderButton', 'center'],
      ['SpinningBorderButton', 'center'],
    ],
  },
]

class CardBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="absolute inset-0 grid place-items-center text-[11px] text-zinc-600">렌더링 실패</div>
    return this.props.children
  }
}

function LazyCard({ name, mode, code }) {
  const ref = useRef(null)
  const [on, setOn] = useState(false)
  const Comp = T[name]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { rootMargin: '240px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure ref={ref} className="border border-zinc-800 bg-zinc-950">
      <div className="relative aspect-[16/10] overflow-hidden bg-black">
        {on && Comp ? (
          <CardBoundary>
            {mode === 'fill'
              ? <Comp className="absolute inset-0" />
              : <div className="absolute inset-0 flex items-center justify-center p-6"><Comp /></div>}
          </CardBoundary>
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[11px] text-zinc-700">대기</div>
        )}
      </div>
      <figcaption className="px-2 py-1.5 text-xs text-zinc-300">
        <span className="mr-1.5 font-bold text-orange-400">{code}</span>{name}
      </figcaption>
    </figure>
  )
}

function Board() {
  return (
    <main className="min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <header className="px-8 pb-2 pt-8">
        <h1 className="text-lg font-semibold tracking-tighter">threeui 취향 보드 · 52종</h1>
        <p className="mt-1 text-[13px] text-zinc-400">
          코드로 반응: 좋다(왜)/싫다(왜). 스크롤 시 카드가 실제로 움직입니다 — 셰이더는 전부 재생 상태로 판단.
        </p>
      </header>
      {SECTIONS.map((sec) => (
        <section key={sec.id} className="px-8 pb-6">
          <h2 className="mb-3 mt-6 text-[13px] uppercase tracking-[0.18em] text-zinc-500">{sec.title}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sec.items.map(([name, mode], i) => (
              <LazyCard key={name} name={name} mode={mode} code={`${sec.id}-${String(i + 1).padStart(2, '0')}`} />
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Board />
  </StrictMode>,
)
