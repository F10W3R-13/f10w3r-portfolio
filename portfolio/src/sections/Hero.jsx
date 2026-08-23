import { RibbonFieldBackground } from '@designcodeio/threeui'
import content from '../../data/content.js'
import { useT } from '../lang.jsx'
import CountUp from '../components/CountUp.jsx'

/* L2 풀블리드 히어로 — F10W3R 초대형 타이포 + 통계 가로 스트립 (RibbonField 2026-08-24 확정) */
export default function Hero() {
  const t = useT()
  const { hero } = content

  return (
    <section className="relative flex min-h-[100dvh] flex-col px-6 pt-16 md:px-12" style={{ fontFamily: 'var(--font-display)' }}>
      <div className="bg-in absolute inset-0">
        <RibbonFieldBackground className="absolute inset-0" />
      </div>

      {/* 풀블리드 그리드: 좌측 타이포+통계 / 우측 풀하이트 초상 패널 (2026-08-24 참고: sceneai 초상 히어로) */}
      <div className="relative grid min-h-[calc(100dvh-4rem)] grid-cols-1 md:grid-cols-[1fr_32%]">
        <div className="hero-drift md:row-start-1">
          <p className="rise d1 text-xs uppercase tracking-[0.24em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {hero.ign} / CODM
          </p>
          <h1 className="rise d2 mt-3 text-[clamp(3.5rem,10vw,10rem)] leading-[0.85] tracking-tight">F10W3R</h1>
          <div className="rise d3 mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-ko-display)' }}>{t(hero.name)}</span>
            <span className="max-w-[46ch] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>{t(hero.tagline)}</span>
          </div>
          <p className="rise d3 mt-8 max-w-[54ch] text-justify text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>
            {t(hero.intro)}
          </p>
        </div>

        {hero.portrait ? (
          <figure className="rise d3 mt-8 flex h-80 flex-col border md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:h-auto" style={{ borderColor: 'var(--hairline)' }}>
            <img src={`/assets/photos/${hero.portrait}`} alt={t(hero.portraitAlt)} className="ph-treat min-h-0 w-full flex-1 object-cover object-top" />
            <figcaption className="shrink-0 border-t px-3 py-2 text-[10px] tracking-[0.16em]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
              {t(hero.name)} · HEAD COACH
            </figcaption>
          </figure>
        ) : null}

        <div className="self-end md:row-start-2">
          <div className="rise d3 grid grid-cols-2 border-t md:grid-cols-4" style={{ borderColor: 'var(--hairline)' }}>
            {hero.stats.map((s, i) => (
              <div key={s.value + s.label.en} className="py-6 pr-4 md:border-l md:pl-6 md:first:border-l-0" style={{ borderColor: 'var(--hairline)' }}>
                <p className="text-4xl">
                  <CountUp value={s.value} delay={i * 0.06} />
                </p>
                <p className="mt-1.5 text-[11px] leading-snug" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s.label)}</p>
              </div>
            ))}
          </div>
          <p className="rise d3 mt-3 text-right text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {t(content.ui.scrollCue)}
          </p>
        </div>
      </div>
    </section>
  )
}
