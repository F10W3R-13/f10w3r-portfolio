import content from '../../data/content.js'

/*
 * C4 스타크 지면 — 축: 스타크 화이트 브루탈리스트 포스터(반전 테마, 굵은 규칙·울타리, 산 액센트)
 * 토큰: #FAFAF7 스타크 화이트(크림 아님) / #161616 잉크 / #9BB000 액시드 / Archivo Black + Work Sans
 * 다이얼: V9 M4 D4 · 배경 기본: DotMatrixBackground(프레임 든 다크 패널 안)
 */
const MONO = "'IBM Plex Mono', monospace"

export default function C4({ Bg }) {
  const { hero, projects } = content
  const cells = projects.list.filter((p) => p.highlight).slice(0, 3)

  return (
    <div className="min-h-[100dvh] bg-[#FAFAF7] text-[#161616]" style={{ fontFamily: "'Work Sans', sans-serif" }}>
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="border-t-4 border-[#161616]" />
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-14 pt-12 md:grid-cols-[7fr_5fr]">
        <div>
          <h1 className="rise d1 text-[clamp(3.6rem,12vw,10rem)] font-black leading-[0.88] tracking-tighter" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
            F10W3R
          </h1>
          <div className="rise d2 mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 border-y-2 border-[#161616] py-4">
            <span className="text-2xl font-black" style={{ fontFamily: "'Archivo Black', sans-serif" }}>유민우</span>
            <span className="text-sm text-[#4c4c4c]">{hero.tagline.ko}</span>
          </div>
        </div>
        <div className="rise d3 relative aspect-square border-4 border-[#161616] bg-[#0C0F13]">
          {Bg ? <Bg className="absolute inset-0" /> : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="rise grid grid-cols-2 border-y-2 border-[#161616] md:grid-cols-4">
          {hero.stats.map((s, i) => (
            <div key={s.value + s.label.ko} className="border-[#161616] py-5 pr-4 md:border-l md:pl-5 md:first:border-l-0">
              <p className={`text-4xl font-black tabular-nums ${i === 3 ? 'text-[#9BB000]' : ''}`} style={{ fontFamily: "'Archivo Black', sans-serif" }}>{s.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-[#4c4c4c]">{s.label.ko}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-16 md:grid-cols-3">
        {cells.map((p, i) => (
          <div key={p.id} className={`rise d${i + 1} border-2 border-[#161616] p-6`}>
            <p className="text-xs text-[#4c4c4c]" style={{ fontFamily: MONO }}>{String(i + 1).padStart(2, '0')}</p>
            <h2 className="mt-3 text-xl font-black leading-tight" style={{ fontFamily: "'Archivo Black', sans-serif" }}>
              {typeof p.title === 'string' ? p.title : p.title.ko}
            </h2>
            <p className="mt-4 border-t-2 border-[#161616] pt-4 text-sm leading-relaxed text-[#333]">{p.summary.ko.slice(0, 90)}…</p>
            <p className="mt-4 text-xs text-[#4c4c4c]" style={{ fontFamily: MONO }}>
              {p.metrics[0]?.value} {p.metrics[0]?.label.ko}
            </p>
          </div>
        ))}
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-12">
        <div className="border-t-4 border-[#161616] pt-4 text-xs text-[#4c4c4c]" style={{ fontFamily: MONO }}>
          <a className="mr-5 hover:text-[#161616]" href={content.profile.contact.github}>GitHub</a>
          <a className="mr-5 hover:text-[#161616]" href={content.profile.contact.twitter}>X</a>
          <a className="hover:text-[#161616]" href={content.profile.contact.youtube}>YouTube</a>
        </div>
      </footer>
    </div>
  )
}
