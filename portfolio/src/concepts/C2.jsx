import content from '../../data/content.js'

/*
 * C2 임버 대성당 — 축: 중앙 선언형 매니페스토(웜 임버 빛의 드라마, 세리프 디스플레이)
 * 토큰: #191310 웜블랙 / #F0E7DA 본 / #C9772E 임버 / Newsreader + Outfit
 * 다이얼: V8 M7 D3 · 배경 기본: EmberStorm(전면, 비네트 스컴)
 */
export default function C2({ Bg }) {
  const { hero, projects } = content
  const feats = [projects.list[0], projects.list[1]]

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#191310] text-[#F0E7DA]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <div className="absolute inset-0">{Bg ? <Bg className="absolute inset-0" /> : null}</div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(25,19,16,0.88)_76%)]" />

      <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <h1 className="rise d1 max-w-5xl text-[clamp(2.6rem,6.5vw,5.4rem)] font-medium leading-[1.14] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>
          {hero.tagline.ko}
        </h1>
        <p className="rise d2 mt-7 text-xs uppercase tracking-[0.3em] text-[#C9772E]">유민우 · F10W3R</p>
        <p className="rise d3 mt-8 max-w-[52ch] leading-relaxed text-[#c9bcae]">{hero.intro.ko}</p>
        <a href="#feats" className="rise d4 mt-10 border border-[#5a4836] px-7 py-3 text-sm tracking-wide text-[#F0E7DA] transition-colors hover:border-[#C9772E] hover:text-[#C9772E]">
          프로젝트 보기
        </a>
      </section>

      <section id="feats" className="relative mx-auto max-w-5xl px-6 pb-28">
        {feats.map((p) => (
          <div key={p.id} className="border-t border-[#5a4836] py-12 last:border-b">
            <p className="text-xs tracking-[0.24em] text-[#9b8d7c]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {p.role.ko}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl" style={{ fontFamily: "'Newsreader', serif" }}>
              {typeof p.title === 'string' ? p.title : p.title.ko}
            </h2>
            <p className="mt-4 max-w-[62ch] leading-relaxed text-[#c9bcae]">{p.summary.ko}</p>
            <p className="mt-5 text-sm text-[#C9772E]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {p.metrics.map((m) => `${m.value} ${m.label.ko}`).join(' / ')}
            </p>
          </div>
        ))}
      </section>

      <footer className="relative flex justify-center gap-6 pb-16 text-xs text-[#9b8d7c]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <a className="hover:text-[#F0E7DA]" href={content.profile.contact.github}>GitHub</a>
        <a className="hover:text-[#F0E7DA]" href={content.profile.contact.twitter}>X</a>
        <a className="hover:text-[#F0E7DA]" href={content.profile.contact.youtube}>YouTube</a>
      </footer>
    </div>
  )
}
