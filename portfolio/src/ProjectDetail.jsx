import content from '../data/content.js'
import { useT } from './lang.jsx'

/*
 * 프로젝트 상세 페이지 — /projects/?id=<id> 쿼리 렌더러.
 * 목차: 돌아가기 → 히어로(role·title·pitch) → 스펙 → 배경/목적/방식 → 링크 → 갤러리 슬롯.
 * purpose는 null이면 표시하지 않는다(사용자 입력 대기 슬롯).
 */

function Specs({ p, t }) {
  if (!p.detail.specs.length) return null
  return (
    <div className="reveal mt-10 grid gap-3 md:grid-cols-3">
      {p.detail.specs.map((s) => (
        <div key={s.label.en} className="border p-5" style={{ borderColor: 'var(--hairline)' }}>
          <p className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>{t(s.value)}</p>
          <p className="mt-1.5 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s.label)}</p>
        </div>
      ))}
    </div>
  )
}

function Gallery({ p }) {
  const files = p.detail.gallery
  return (
    <div className="reveal mt-16">
      {files.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {files.map((f) => (
            <img key={f} src={`/assets/projects/${p.id}/${f}`} alt={f} className="w-full border" style={{ borderColor: 'var(--hairline)' }} />
          ))}
        </div>
      ) : (
        <div
          className="grid aspect-video place-items-center border border-dashed text-[11px]"
          style={{ borderColor: '#3a4450', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}
        >
          사진 슬롯 · portfolio/assets/projects/{p.id}/
        </div>
      )}
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
  if (!p) return <ProjectList />

  return (
    <main className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <a href="/#projects" className="text-[11px] tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
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
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-ko-display)', fontWeight: 900 }}>{t({ ko: '배경', en: 'Background' })}</h2>
          <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.background)}</p>
        </section>

        {p.detail.purpose ? (
          <section className="reveal">
            <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-ko-display)', fontWeight: 900 }}>{t({ ko: '제작 목적', en: 'Purpose' })}</h2>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.purpose)}</p>
          </section>
        ) : null}

        <section className="reveal">
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-ko-display)', fontWeight: 900 }}>{t({ ko: '방식', en: 'Approach' })}</h2>
          <p className="mt-3 leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.detail.approach)}</p>
        </section>

        <section className="reveal">
          <h2 className="text-xl tracking-tight" style={{ fontFamily: 'var(--font-ko-display)', fontWeight: 900 }}>Stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="border px-3 py-1.5 text-[12px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>{s}</li>
            ))}
          </ul>
        </section>

        <section className="reveal flex flex-wrap gap-x-8 gap-y-4">
          {p.links.demo ? (
            <a href={p.links.demo} target="_blank" rel="noreferrer" className="cta-volt inline-flex items-center gap-3 px-6 py-3 text-[13px] tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)' }}>
              {t(content.ui.liveDemoCta)} <span aria-hidden="true" className="cta-arrow">↗</span>
            </a>
          ) : null}
          {p.links.youtube ? (
            <a href={p.links.youtube} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>VOD ↗</a>
          ) : null}
        </section>
      </div>

      <Gallery p={p} />
      <div className="mt-20 pb-10">
        <a href="/#projects" className="text-[11px] tracking-[0.18em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
          ← {t({ ko: '목록으로', en: 'Back to list' })}
        </a>
      </div>
    </main>
  )
}
