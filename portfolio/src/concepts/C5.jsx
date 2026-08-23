import content from '../../data/content.js'

/*
 * C5 관측소 — 축: 자정 심도의 계기적 세리프(정적·위엄, 헤어라인 프레임, 디세리브레이티드 인스트루먼트 블루)
 * 토큰: #0A0E17 미드나잇 / #D9E1EC 스타라이트 / #7FA3C4 인스트루먼트 블루 / Spectral + JetBrains Mono
 * 다이얼: V5 M6 D4 · 배경 기본: RibbonFieldBackground(전면 70%, 하단 비네트)
 */
const MONO = "'JetBrains Mono', monospace"

export default function C5({ Bg }) {
  const { hero, projects } = content
  const rows = projects.list.filter((p) => p.highlight).slice(0, 3)

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0A0E17] text-[#D9E1EC]" style={{ fontFamily: MONO }}>
      <div className="absolute inset-0 opacity-70">{Bg ? <Bg className="absolute inset-0" /> : null}</div>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,#0A0E17_96%)]" />

      <div className="relative mx-4 mt-4 border border-[#26344a] md:mx-8 md:mt-8">
        <section className="grid min-h-[92dvh] grid-cols-1 content-center gap-12 p-8 md:grid-cols-[6fr_5fr] md:items-center md:p-16">
          <div>
            <p className="rise d1 text-xs tracking-[0.3em] text-[#7FA3C4]">{hero.ign} · EST. 2020</p>
            <h1 className="rise d2 mt-6 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[1.04] tracking-tight" style={{ fontFamily: "'Spectral', serif" }}>
              유민우
            </h1>
            <p className="rise d3 mt-6 max-w-[36ch] text-sm leading-relaxed text-[#93a2b8]">{hero.tagline.ko}</p>
          </div>
          <div className="rise d3 border-l border-[#26344a] pl-8">
            {hero.stats.map((s) => (
              <div key={s.value + s.label.ko} className="border-b border-[#26344a] py-4 last:border-b-0">
                <p className="text-3xl tabular-nums" style={{ fontFamily: "'Spectral', serif" }}>{s.value}</p>
                <p className="mt-1 text-[11px] tracking-wide text-[#7d8ea6]">{s.label.ko}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#26344a] p-8 md:p-16">
          {rows.map((p, i) => (
            <div key={p.id} className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-b border-[#1b2738] py-6 last:border-b-0">
              <span className="text-xs text-[#7FA3C4]">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <h2 className="text-2xl font-medium tracking-tight" style={{ fontFamily: "'Spectral', serif" }}>
                  {typeof p.title === 'string' ? p.title : p.title.ko}
                </h2>
                <span className="text-[11px] text-[#7d8ea6]">{p.metrics[0]?.value} {p.metrics[0]?.label.ko}</span>
              </div>
            </div>
          ))}
        </section>

        <footer className="flex flex-wrap gap-5 border-t border-[#26344a] p-8 text-[11px] text-[#7d8ea6] md:p-16">
          <a className="hover:text-[#D9E1EC]" href={content.profile.contact.github}>GitHub</a>
          <a className="hover:text-[#D9E1EC]" href={content.profile.contact.twitter}>X</a>
          <a className="hover:text-[#D9E1EC]" href={content.profile.contact.youtube}>YouTube</a>
        </footer>
      </div>
    </div>
  )
}
