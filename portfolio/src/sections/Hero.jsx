import content from '../../data/content.js'
import { useT } from '../lang.jsx'
import CountUp from '../components/CountUp.jsx'

/* 히어로 — 중앙 스테이지 포스터(2026-08-24 사용자 시안 2차): 대형 F10W3R는 정중앙 후방 레이어,
   컷아웃 초상은 바닥 고정 확대(바지 밑단=이미지 하단이 뷰포트 하단에 맞닿음).
   이름·소개·통계는 하단에 오버레이. 섹션은 100dvh 고정, 초과 폭은 클립. */
export default function Hero() {
  const t = useT()
  const { hero } = content

  return (
    <section className="relative h-[100dvh] overflow-hidden px-6 pt-16 md:px-12" style={{ fontFamily: 'var(--font-display)' }}>
      <p className="rise d1 relative z-20 text-xs uppercase tracking-[0.24em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        {hero.ign} / CODM
      </p>

      {/* 타이포 — 정중앙, 후방 레이어 */}
      <div className="rise d2 absolute inset-0 flex items-center justify-center">
        <h1 className="text-[clamp(6rem,26vw,26rem)] leading-none tracking-tight">F10W3R</h1>
      </div>

      {/* 초상 — 하단 고정(밑단이 화면 가장자리에 맞닿음), 전방 레이어 */}
      {hero.portrait ? (
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <figure className="rise d3 h-[92dvh]">
            <div className="port-wrap h-full">
              <img src={`/assets/photos/${hero.portrait}`} alt={t(hero.portraitAlt)} className="port-img ph-treat h-full w-auto object-contain" />
            </div>
          </figure>
        </div>
      ) : null}

      <div className="hero-drift absolute inset-x-6 bottom-0 z-20 md:inset-x-12">
        <div className="rise d3 flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <span className="text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(hero.name)}</span>
          <span className="max-w-[46ch] text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(hero.tagline)}</span>
        </div>
        <p className="rise d3 mt-6 max-w-[54ch] text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>
          {t(hero.intro)}
        </p>

        <div className="rise d3 mt-10 grid grid-cols-2 border-t pb-2 md:grid-cols-4" style={{ borderColor: 'var(--hairline)' }}>
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
