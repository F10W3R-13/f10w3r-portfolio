import content from '../../data/content.js'
import { useT } from '../lang.jsx'
import CountUp from '../components/CountUp.jsx'

/* 히어로 — 중앙 스테이지 구성(2026-08-24 사용자 시안): 대형 F10W3R 타이포를 후방 레이어에 두고
   투명 컷아웃 초상을 한 단계 앞(중앙, 약간 확대)에 세운다. 하단에 이름·소개·통계. */
export default function Hero() {
  const t = useT()
  const { hero } = content

  return (
    <section className="relative flex min-h-[100dvh] flex-col px-6 pt-16 md:px-12" style={{ fontFamily: 'var(--font-display)' }}>
      <p className="rise d1 relative text-xs uppercase tracking-[0.24em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        {hero.ign} / CODM
      </p>

      {/* 중앙 스테이지 — 타이포(후방) ← 초상(전방) */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-x-clip py-8">
        <div className="rise d2 absolute inset-0 flex items-center justify-center">
          <h1 className="text-[clamp(4.5rem,19vw,19rem)] leading-none tracking-tight">F10W3R</h1>
        </div>
        {hero.portrait ? (
          <figure className="rise d3 relative z-10 flex h-[56dvh] w-full justify-center md:h-[68dvh]">
            <div className="port-wrap flex h-full justify-center">
              <img src={`/assets/photos/${hero.portrait}`} alt={t(hero.portraitAlt)} className="port-img ph-treat h-full w-auto object-contain" />
            </div>
          </figure>
        ) : null}
      </div>

      <div className="hero-drift relative">
        <div className="rise d3 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(hero.name)}</span>
          <span className="max-w-[46ch] text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(hero.tagline)}</span>
        </div>
        <p className="rise d3 mt-6 max-w-[54ch] text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>
          {t(hero.intro)}
        </p>

        <div className="rise d3 mt-10 grid grid-cols-2 border-t md:grid-cols-4" style={{ borderColor: 'var(--hairline)' }}>
          {hero.stats.map((s, i) => (
            <div key={s.value + s.label.en} className="py-6 pr-4 md:border-l md:pl-6 md:first:border-l-0" style={{ borderColor: 'var(--hairline)' }}>
              <p className="text-4xl">
                <CountUp value={s.value} delay={i * 0.06} />
              </p>
              <p className="mt-1.5 text-[11px] leading-snug" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s.label)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
