import content from '../../data/content.js'

/*
 * C1 잉크 전시관 — 축: 타입이 지배하는 모노크롬 잉크 전시형(어두운 지면, 단일 스칼렛)
 * 토큰: #141312 지면 / #EAE6DC 본 / #C8402A 스칼렛 / Archivo + IBM Plex Mono
 * 다이얼: V7 M4 D5 · 배경 기본: DataField
 */
export default function C1({ Bg }) {
  const { hero, projects } = content
  const top = projects.list.filter((p) => p.highlight).slice(0, 3)

  return (
    <div className="min-h-[100dvh] bg-[#141312] text-[#EAE6DC]" style={{ fontFamily: "'Archivo', sans-serif" }}>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-16 pt-24 md:grid-cols-[7fr_5fr] md:items-end">
          <div>
            <p className="rise d1 text-xs uppercase tracking-[0.22em] text-[#8f8a7e]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{hero.ign}</p>
            <h1 className="rise d2 mt-5 text-[clamp(3.2rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tighter">유민우</h1>
            <p className="rise d3 mt-6 max-w-[34ch] text-lg leading-relaxed text-[#b6b1a4]">{hero.tagline.ko}</p>
          </div>
          <div className="rise d3 relative aspect-[4/3] overflow-hidden border border-[#2c2a26] bg-[#0e0d0c] md:aspect-[4/5]">
            {Bg ? <Bg className="absolute inset-0" /> : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rise grid grid-cols-2 border-y border-[#2c2a26] md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.value + s.label.ko} className="px-4 py-6 md:border-l md:border-[#2c2a26] md:first:border-l-0">
              <p className="text-3xl font-bold tabular-nums">{s.value}</p>
              <p className="mt-1 text-xs text-[#8f8a7e]">{s.label.ko}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        {top.map((p, i) => (
          <div key={p.id} className="flex items-baseline justify-between gap-6 border-t border-[#2c2a26] py-7 last:border-b">
            <div className="flex items-baseline gap-6">
              <span className="text-xs text-[#8f8a7e]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-2xl font-semibold tracking-tight">{typeof p.title === 'string' ? p.title : p.title.ko}</span>
            </div>
            <span className="hidden shrink-0 text-xs text-[#8f8a7e] md:block" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {p.metrics[0]?.value} {p.metrics[0]?.label.ko}
            </span>
          </div>
        ))}
      </section>

      <footer className="mx-auto flex max-w-6xl gap-5 px-6 pb-16 text-xs text-[#8f8a7e]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <a className="hover:text-[#EAE6DC]" href={content.profile.contact.github}>GitHub</a>
        <a className="hover:text-[#EAE6DC]" href={content.profile.contact.twitter}>X</a>
        <a className="hover:text-[#EAE6DC]" href={content.profile.contact.youtube}>YouTube</a>
      </footer>
    </div>
  )
}
