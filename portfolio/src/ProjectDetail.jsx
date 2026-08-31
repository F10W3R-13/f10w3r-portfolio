import { useEffect } from 'react'
import content from '../data/content.js'
import { useT } from './lang.jsx'

/*
 * 프로젝트 상세 페이지 — /projects/?id=<id> 쿼리 렌더러.
 * 목차: 돌아가기 → 히어로(role·title·pitch) → 스펙 → 배경/목적/방식 → 링크 → 갤러리.
 * gallery가 비면 갤러리 블록 자체를 렌더하지 않는다(개발용 플레이스홀더 노출 금지).
 */

function Specs({ p, t }) {
  if (!p.detail.specs.length) return null
  return (
    <div className="reveal mt-10 grid gap-3 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
      {p.detail.specs.map((s) => (
        <div key={s.label.en} className="border p-5" style={{ borderColor: 'var(--hairline)' }}>
          <p className="text-[11px] tracking-[0.14em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s.label)}</p>
          <p className="mt-2.5 text-[15px] leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice)' }}>{t(s.value)}</p>
        </div>
      ))}
    </div>
  )
}

function Videos({ p, t }) {
  const items = p.detail.videos
  if (!items?.length) return null
  return (
    <div className="reveal mt-16 grid gap-6 md:grid-cols-2">
      {items.map((v) => (
        <figure key={v.id} className="border" style={{ borderColor: 'var(--hairline)' }}>
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.id}`}
              title={t(v.caption)}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
          <figcaption className="border-t px-4 py-2.5 text-[11px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {t(v.caption)}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function Gallery({ p, t }) {
  const items = p.detail.gallery
  if (!items.length) return null
  return (
    <div className="gallery-grid reveal mt-16 grid gap-6 md:grid-cols-2">
      {items.map((g) => (
        <figure key={g.file} className="border" style={{ borderColor: 'var(--hairline)' }}>
          <img src={`/assets/projects/${p.id}/${g.file}`} alt={t(g.caption)} loading="lazy" decoding="async" className="w-full" />
          <figcaption className="border-t px-4 py-2.5 text-[11px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {t(g.caption)}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function ProjectList() {
  const t = useT()
  return (
    <main className="mx-auto max-w-7xl px-6 py-24">
      <h1 className="text-4xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.projects)}</h1>
      <div className="mt-10">
        {content.projects.list.map((p, i) => (
          <a
            key={p.id}
            href={`?id=${p.id}`}
            className="row-hover flex items-baseline justify-between gap-6 border-t py-6 last:border-b"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <span className="flex items-baseline gap-6">
              <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{String(i + 1).padStart(2, '0')}</span>
              <span className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(p.title)}</span>
            </span>
            <span className="hidden shrink-0 text-[11px] md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(p.role)}</span>
          </a>
        ))}
      </div>
    </main>
  )
}

export default function ProjectDetail({ id }) {
  const t = useT()
  const p = content.projects.list.find((x) => x.id === id)
  // 이 프로젝트가 소속된 첫 카테고리 페이지로 복귀(2026-08-31 버그 수정:
  // 이전에는 모든 프로젝트가 e스포츠 페이지로 하드코딩됨). 실제 클릭은 history.back() 우선.
  const backHref = (() => {
    const cat = content.categories.find((c) => c.projects.includes(id))
    return cat ? `/?page=${cat.id}#projects` : '/#categories'
  })()
  useEffect(() => {
    if (p) document.title = `${t(p.title)} · ${t(content.profile.name)} ${content.profile.ign}`
    // 데모 워밍업(2026-09-01): 상세 페이지 진입 순간 데모 서버에 보이지 않는 요청 1회를 발사.
    // Railway 무료 인스턴스(sleep mode)를 방문자가 글을 읽는 동안 미리 깨워, LIVE DEMO 클릭 시
    // 즉시 접속되게 한다. no-cors 응답은 opaque라 실패해도 정상 — 요청 자체가 서버에 닿으면 된다.
    if (p?.links?.demo) {
      fetch(p.links.demo, { mode: 'no-cors' }).catch(() => {})
    }
  }, [p])
  if (!p) return <ProjectList />

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <a
        href={backHref}
        onClick={(e) => {
          if (window.history.length > 1) {
            e.preventDefault()
            window.history.back()
          }
        }}
        className="text-[11px] tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}
      >
        ← {t(content.ui.headings.projects)}
      </a>

      <header className="reveal mt-8">
        <p className="text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(p.role)}</p>
        <h1 className="mt-4 text-[clamp(2.6rem,7vw,5.5rem)] leading-[0.95] tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
          {t(p.title)}
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.pitch)}</p>
      </header>

      <Specs p={p} t={t} />

      <div className="mt-16 max-w-[68ch] space-y-12">
        <section className="reveal">
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t({ ko: '배경', en: 'Background' })}</h2>
          <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.background)}</p>
        </section>

        {p.detail.purpose ? (
          <section className="reveal">
            <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t({ ko: '제작 목적', en: 'Purpose' })}</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.purpose)}</p>
          </section>
        ) : null}

        <section className="reveal">
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t({ ko: '방식', en: 'Approach' })}</h2>
          <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.approach)}</p>
        </section>

        <section className="reveal">
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t({ ko: '스택', en: 'Stack' })}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s.en} className="border px-3 py-1.5 text-[12px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>{t(s)}</li>
            ))}
          </ul>
        </section>

        <section className="reveal flex flex-wrap gap-x-8 gap-y-4">
          {p.links.demo ? (
            <a href={p.links.demo} target="_blank" rel="noreferrer" className="cta-volt inline-flex items-center gap-3 px-6 py-3 text-[13px] tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(content.ui.demo)} <span aria-hidden="true" className="cta-arrow">↗</span>
            </a>
          ) : null}
          {p.links.youtube ? (
            <a href={p.links.youtube} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>VOD <span aria-hidden="true">↗</span></a>
          ) : null}
        </section>
      </div>

      <Videos p={p} t={t} />
      <Gallery p={p} t={t} />
      <div className="mt-20 pb-10">
        <a
        href={backHref}
        onClick={(e) => {
          if (window.history.length > 1) {
            e.preventDefault()
            window.history.back()
          }
        }}
        className="text-[11px] tracking-[0.18em]"
        style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}
      >
          ← {t({ ko: '목록으로', en: 'Back to list' })}
        </a>
      </div>
    </main>
  )
}
