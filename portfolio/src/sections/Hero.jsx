import { RibbonFieldBackground } from '@designcodeio/threeui'
import content from '../../data/content.js'
import { useT } from '../lang.jsx'
import CountUp from '../components/CountUp.jsx'

/* L2 풀블리드 히어로 — F10W3R 초대형 타이포 + 통계 가로 스트립 (RibbonField 2026-08-24 확정) */
export default function Hero() {
  const t = useT()
  const { hero } = content

  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-between px-6 pt-16 md:px-12" style={{ fontFamily: 'var(--font-display)' }}>
      <div className="bg-in absolute inset-0">
        <RibbonFieldBackground className="absolute inset-0" />
      </div>

      <div className="hero-drift relative">
        <p className="rise d1 text-xs uppercase tracking-[0.24em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
          {hero.ign} / CODM
        </p>
        <h1 className="rise d2 mt-3 text-[clamp(4.5rem,17vw,14rem)] leading-[0.85] tracking-tight">F10W3R</h1>
        <div className="rise d3 mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-ko-display)' }}>{t(hero.name)}</span>
          <span className="max-w-[46ch] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>{t(hero.tagline)}</span>
        </div>
      </div>

      <div className="rise d3 mt-16 grid grid-cols-2 border-t md:grid-cols-4" style={{ borderColor: 'var(--hairline)' }}>
        {hero.stats.map((s, i) => (
          <div key={s.value + s.label.en} className="py-6 pr-4 md:border-l md:pl-6 md:first:border-l-0" style={{ borderColor: 'var(--hairline)' }}>
            <p className="text-4xl">
              <CountUp value={s.value} delay={i * 0.06} />
            </p>
            <p className="mt-1.5 text-[11px] leading-snug" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s.label)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
