import { InterfaceLines } from '@designcodeio/threeui'
import content from '../../data/content.js'

/*
 * L3 계기 텍스처 — 축: L1 골격 유지 + HUD 라인(InterfaceLines)을 실데이터 뒤 저투명도 무대 장치로
 * 장식이 아니라 '데이터의 무대' — 텍스처는 스코어보드·통계 뒤에만, 히어로는 RibbonField 유지
 * 토큰: C3 방송 계기판과 동일
 */
const MONO = "'IBM Plex Mono', monospace"

export default function L3({ Bg, Btn }) {
  const { hero, achievements } = content
  const rows = achievements.list.slice(0, 5)

  return (
    <div className="relative min-h-[100dvh] bg-[#0C0F13] text-[#E8EDF2]" style={{ fontFamily: "'Anton', sans-serif" }}>
      <div className="absolute inset-0 opacity-30">{Bg ? <Bg className="absolute inset-0" /> : null}</div>

      <section className="relative mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 content-center gap-10 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="rise d1 text-xs uppercase tracking-[0.24em] text-[#7d8896]" style={{ fontFamily: MONO }}>{hero.ign} / CODM</p>
          <h1 className="rise d2 mt-4 text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.92] tracking-tight">
            유민우<br />F10W3R
          </h1>
          <p className="rise d3 mt-6 max-w-[36ch] text-base leading-relaxed text-[#9aa5b3]" style={{ fontFamily: MONO }}>{hero.tagline.ko}</p>
        </div>
        <div className="rise d3 relative overflow-hidden border border-[#232b36]">
          <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
            <InterfaceLines className="absolute inset-0" mode="dark" />
          </div>
          <div className="relative grid grid-cols-2">
            {hero.stats.map((s) => (
              <div key={s.value + s.label.ko} className="border-[#232b36] p-5 odd:border-r [&:nth-child(-n+2)]:border-b">
                <p className="text-4xl tabular-nums">{s.value}</p>
                <p className="mt-1.5 text-[11px] leading-snug text-[#7d8896]" style={{ fontFamily: MONO }}>{s.label.ko}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-28">
        <div className="pointer-events-none absolute inset-x-0 -inset-y-8 opacity-[0.16]">
          <InterfaceLines className="absolute inset-0" mode="dark" />
        </div>
        <div className="relative">
          {rows.map((a) => (
            <div
              key={a.event}
              className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[#2e3946] bg-[#0C0F13]/60 py-4 backdrop-blur-[2px] last:border-b md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-6 ${a.won ? 'border-l-2 border-l-[#B9DE5F] pl-4' : ''}`}
            >
              <span className="order-2 border border-[#3a4450] bg-[#0C0F13] px-1.5 py-0.5 text-[10px] tracking-widest text-[#9aa5b3] md:order-1" style={{ fontFamily: MONO }}>
                {a.tier}
              </span>
              <span className="order-1 text-xl tracking-tight md:order-2 md:text-2xl">{a.event}</span>
              <span className={`order-3 text-sm tabular-nums ${a.won ? 'text-[#B9DE5F]' : 'text-[#9aa5b3]'}`} style={{ fontFamily: MONO }}>
                {a.result.ko}
              </span>
              <span className="order-4 hidden text-[11px] text-[#7d8896] md:block" style={{ fontFamily: MONO }}>{a.role.ko}</span>
              <span className="order-5 hidden text-[11px] text-[#7d8896] md:block tabular-nums" style={{ fontFamily: MONO }}>{a.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="rise flex flex-wrap items-center gap-x-10 gap-y-6 border border-[#232b36] p-8">
          {Btn ? <Btn /> : null}
          <a href={content.profile.contact.github} target="_blank" rel="noreferrer" className="text-sm text-[#9aa5b3] hover:text-[#B9DE5F]" style={{ fontFamily: MONO }}>GitHub ↗</a>
          <a href={content.profile.contact.youtube} target="_blank" rel="noreferrer" className="text-sm text-[#9aa5b3] hover:text-[#B9DE5F]" style={{ fontFamily: MONO }}>YouTube ↗</a>
        </div>
      </section>

      <footer className="relative mx-auto flex max-w-7xl gap-5 px-6 pb-14 text-xs text-[#7d8896]" style={{ fontFamily: MONO }}>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.github}>GitHub</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.twitter}>X</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.youtube}>YouTube</a>
      </footer>
    </div>
  )
}
