import content from '../../data/content.js'

/*
 * L2 풀블리드 — 축: 풀폭 초대형 타이포 히어로 + 통계 가로 스트립 + 스코어보드 2열 재배치
 * 토큰: C3 방송 계기판과 동일(#0C0F13/#E8EDF2/#B9DE5F, Anton + IBM Plex Mono)
 */
const MONO = "'IBM Plex Mono', monospace"

export default function L2({ Bg, Btn }) {
  const { hero, achievements } = content
  const rows = achievements.list.slice(0, 6)
  const cols = [rows.filter((_, i) => i % 2 === 0), rows.filter((_, i) => i % 2 === 1)]
  const hub = content.projects.list.find((p) => p.id === 'coaching-hub')

  return (
    <div className="relative min-h-[100dvh] bg-[#0C0F13] text-[#E8EDF2]" style={{ fontFamily: "'Anton', sans-serif" }}>
      <div className="absolute inset-0 opacity-40">{Bg ? <Bg className="absolute inset-0" /> : null}</div>

      <section className="relative flex min-h-[100dvh] flex-col justify-between px-6 pt-16 md:px-12">
        <div>
          <p className="rise d1 text-xs uppercase tracking-[0.24em] text-[#7d8896]" style={{ fontFamily: MONO }}>{hero.ign} / CODM</p>
          <h1 className="rise d2 mt-3 text-[clamp(4.5rem,17vw,14rem)] leading-[0.85] tracking-tight">F10W3R</h1>
          <div className="rise d3 mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-2">
            <span className="text-3xl tracking-tight">유민우</span>
            <span className="max-w-[46ch] text-sm leading-relaxed text-[#9aa5b3]" style={{ fontFamily: MONO }}>{hero.tagline.ko}</span>
          </div>
        </div>
        <div className="rise d3 mt-16 grid grid-cols-2 border-t border-[#232b36] md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.value + s.label.ko} className="border-[#232b36] py-6 pr-4 md:border-l md:pl-6 md:first:border-l-0">
              <p className="text-4xl tabular-nums">{s.value}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-[#7d8896]" style={{ fontFamily: MONO }}>{s.label.ko}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-x-14 md:grid-cols-2">
          {cols.map((col, ci) => (
            <div key={ci}>
              {col.map((a) => (
                <div key={a.event} className={`flex items-baseline justify-between gap-4 border-t border-[#232b36] py-4 last:border-b ${a.won ? 'border-l-2 border-l-[#B9DE5F] pl-4' : ''}`}>
                  <span className="flex items-baseline gap-4">
                    <span className="border border-[#3a4450] px-1.5 py-0.5 text-[10px] tracking-widest text-[#9aa5b3]" style={{ fontFamily: MONO }}>{a.tier}</span>
                    <span className="text-lg tracking-tight md:text-xl">{a.event}</span>
                  </span>
                  <span className={`shrink-0 text-sm tabular-nums ${a.won ? 'text-[#B9DE5F]' : 'text-[#9aa5b3]'}`} style={{ fontFamily: MONO }}>{a.result.ko}</span>
                </div>
              ))}
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
        <p className="mt-3 text-[11px] text-[#5d6773]" style={{ fontFamily: MONO }}>데모: {hub.links.demo}</p>
      </section>

      <footer className="relative mx-auto flex max-w-7xl gap-5 px-6 pb-14 text-xs text-[#7d8896]" style={{ fontFamily: MONO }}>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.github}>GitHub</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.twitter}>X</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.youtube}>YouTube</a>
      </footer>
    </div>
  )
}
