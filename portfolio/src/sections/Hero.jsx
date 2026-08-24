import content from '../../data/content.js'
import { useT } from '../lang.jsx'
import CountUp from '../components/CountUp.jsx'

/* 히어로 — 중앙 스테이지 포스터(2026-08-24 시안 3차).
   데스크톱: 100dvh 고정, 대형 타이포(후방) + 초상 92dvh 바닥 고정(전방), 텍스트 하단 오버레이.
   모바일: 포스터 스테이지(70dvh)에 타이포+초상만 두고, 이름·소개·통계는 아래 일반 흐름으로
   내려 사진 위 텍스트 겹침을 원천 제거(옵션 A). */
export default function Hero() {
  const t = useT()
  const { hero } = content

  return (
    <section className="relative overflow-hidden px-6 md:h-[100dvh] md:px-12" style={{ fontFamily: 'var(--font-display)' }}>
      {/* 포스터 스테이지 — 모바일: 상단 블록 / 데스크톱: 히어로 전체 */}
      <div className="relative h-[70dvh] md:absolute md:inset-0 md:h-auto">
        <p className="rise d1 relative z-20 pt-10 text-xs uppercase tracking-[0.24em] md:pt-16" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
          {hero.ign} / CODM
        </p>

        {/* 타이포 — 정중앙, 후방 레이어 */}
        <div className="rise d2 absolute inset-0 flex items-center justify-center">
          <h1 className="text-[clamp(6rem,26vw,26rem)] leading-none tracking-tight">F10W3R</h1>
        </div>

        {/* 초상 — 스테이지 바닥 고정(밑단이 경계에 맞닿음), 전방 레이어 */}
        {hero.portrait ? (
          <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
            <figure className="rise d3 h-[58dvh] md:h-[92dvh]">
              <div className="port-wrap h-full">
                <img src={`/assets/photos/${hero.portrait}`} alt={t(hero.portraitAlt)} className="port-img ph-treat h-full w-auto object-contain" />
              </div>
            </figure>
          </div>
        ) : null}
      </div>

      {/* 텍스트 — 모바일: 스테이지 아래 일반 흐름 / 데스크톱: 하단 오버레이 */}
      <div className="hero-drift relative z-20 pb-12 pt-8 md:absolute md:inset-x-12 md:bottom-0 md:pb-0 md:pt-0">
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
