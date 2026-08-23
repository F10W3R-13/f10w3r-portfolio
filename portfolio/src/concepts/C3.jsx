import { Component } from 'react'
import content from '../../data/content.js'

/*
 * C3 방송 계기판 — 축: 데이터 밀착형 계기 인터페이스(스코어보드·티어 배지·지역 데이터)
 * 토큰: #0C0F13 스틸블랙 / #E8EDF2 아이스 / #B9DE5F 볼트(플랫) / Anton + IBM Plex Mono
 * 다이얼: V6 M5 D7
 * 부품 슬롯(하니스에서 교체 가능): Bg(배경) · Hud(계기) · Type(타입, phrase=F10W3R) · Btn(CTA)
 */
const MONO = "'IBM Plex Mono', monospace"

class PartBoundary extends Component {
  constructor(props) { super(props); this.state = { failed: false } }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return <div className="grid h-full place-items-center text-xs text-[#7d8896]" style={{ fontFamily: MONO }}>이 컴포넌트는 렌더링 실패</div>
    return this.props.children
  }
}

export default function C3({ Bg, Hud, Type, Btn }) {
  const { hero, achievements, projects } = content
  const rows = achievements.list.slice(0, 5)
  const cq = projects.list.find((p) => p.id === 'champions-queue')
  const hub = projects.list.find((p) => p.id === 'coaching-hub')

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
        <div className="rise d3 grid grid-cols-2 border border-[#232b36]">
          {hero.stats.map((s) => (
            <div key={s.value + s.label.ko} className="border-[#232b36] p-5 odd:border-r [&:nth-child(-n+2)]:border-b">
              <p className="text-4xl tabular-nums">{s.value}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-[#7d8896]" style={{ fontFamily: MONO }}>{s.label.ko}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="scoreboard" className="relative mx-auto max-w-7xl px-6 pb-24">
        <div className="rise">
          {rows.map((a) => (
            <div
              key={a.event}
              className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-[#232b36] py-4 last:border-b md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-6 ${a.won ? 'border-l-2 border-l-[#B9DE5F] pl-4' : ''}`}
            >
              <span className="order-2 border border-[#3a4450] px-1.5 py-0.5 text-[10px] tracking-widest text-[#9aa5b3] md:order-1" style={{ fontFamily: MONO }}>
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

      {/* 부품 슬롯 1 · 계기 — 좌: threeui HUD / 우: 실데이터 스펙 */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <h2 className="rise text-2xl tracking-tight">운영 계기</h2>
        <div className="rise d1 mt-6 grid items-stretch gap-8 md:grid-cols-[3fr_2fr]">
          <div className="relative min-h-[320px] overflow-hidden border border-[#232b36] bg-[#0a0d11]">
            <PartBoundary>
              {Hud ? <Hud className="absolute inset-0" mode="dark" /> : null}
            </PartBoundary>
          </div>
          <div className="flex flex-col justify-center gap-4 border border-[#232b36] p-6">
            {[
              ['리그 구조', `${cq.metrics[0].value} ${cq.metrics[0].label.ko}`],
              ['데이터 관리', `${cq.metrics[1].value} ${cq.metrics[1].label.ko} · ${cq.metrics[2].value} ${cq.metrics[2].label.ko}`],
              ['라이브 코칭 허브', `${hub.metrics[0].value} ${hub.metrics[0].label.ko}`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-[#1a222c] pb-3">
                <span className="text-[11px] text-[#7d8896]" style={{ fontFamily: MONO }}>{k}</span>
                <span className="text-sm tabular-nums text-[#E8EDF2]" style={{ fontFamily: MONO }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 부품 슬롯 2 · 타입 — threeui 타입 이펙트(TypographyVortexCanvas는 phrase=F10W3R) */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <h2 className="rise text-2xl tracking-tight">타입 시그널</h2>
        <div className="rise d1 relative mt-6 h-[380px] overflow-hidden border border-[#232b36] bg-[#0a0d11]">
          <PartBoundary>
            {Type ? (
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <Type phrase="F10W3R" mode="dark" />
              </div>
            ) : null}
          </PartBoundary>
        </div>
      </section>

      {/* 부품 슬롯 3 · 버튼 — threeui CTA(실링크 동작, 라벨은 컴포넌트 기본값) + 텍스트 링크 */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24">
        <h2 className="rise text-2xl tracking-tight">액션</h2>
        <div className="rise d1 mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 border border-[#232b36] p-8">
          {Btn ? (
            <PartBoundary>
              <a href={hub.links.demo} target="_blank" rel="noreferrer" className="inline-block" title="코칭 허브 라이브 데모">
                <Btn mode="dark" />
              </a>
            </PartBoundary>
          ) : null}
          <a href={content.profile.contact.github} target="_blank" rel="noreferrer" className="text-sm text-[#9aa5b3] hover:text-[#B9DE5F]" style={{ fontFamily: MONO }}>GitHub ↗</a>
          <a href={content.profile.contact.youtube} target="_blank" rel="noreferrer" className="text-sm text-[#9aa5b3] hover:text-[#B9DE5F]" style={{ fontFamily: MONO }}>YouTube ↗</a>
        </div>
        <p className="mt-3 text-[11px] text-[#5d6773]" style={{ fontFamily: MONO }}>
          셰이더 버튼의 라벨은 컴포넌트 데모 기본값 · 클릭은 실제 링크로 동작
        </p>
      </section>

      <footer className="relative mx-auto flex max-w-7xl gap-5 px-6 pb-14 text-xs text-[#7d8896]" style={{ fontFamily: MONO }}>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.github}>GitHub</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.twitter}>X</a>
        <a className="hover:text-[#E8EDF2]" href={content.profile.contact.youtube}>YouTube</a>
      </footer>
    </div>
  )
}
