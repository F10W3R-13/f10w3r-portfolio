import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 프로젝트 — 인덱스 행. 링크·하이라이트·수치는 전부 데이터 필드 presence로 렌더 (항목별 조건문 없음) */
export default function Projects() {
  const t = useT()

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.projects)}</h2>

      <div className="mt-8">
        {content.projects.list.map((p, i) => (
          <div
            key={p.id}
            className="row-hover grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t py-7 last:border-b md:grid-cols-[auto_1fr_auto]"
            style={{ borderColor: 'var(--hairline)' }}
          >
            <span className="self-start pt-1.5 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{String(i + 1).padStart(2, '0')}</span>

            <div>
              <h3 className="text-2xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                <a href={`/projects/?id=${p.id}`} className="hover:underline" style={{ color: 'inherit' }}>
                  {t(p.title)}
                </a>
              </h3>
              <p className="mt-1 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(p.role)}</p>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(p.summary)}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <li key={s.en} className="border px-2.5 py-1 text-[11px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(s)}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
                {p.metrics.map((m) => (
                  <span key={String(m.value) + m.label.en} className="text-sm tabular-nums" style={{ fontFamily: 'var(--font-mono)' }}>
                    <span style={{ color: 'var(--ice)' }}>{t(m.value)}</span>{' '}
                    <span style={{ color: 'var(--ice-mute)' }}>{t(m.label)}</span>
                  </span>
                ))}
                {p.links.demo ? (
                  <a href={p.links.demo} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice)' }}>
                    {t(content.ui.demo)} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {p.links.youtube ? (
                  <a href={p.links.youtube} target="_blank" rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>
                    VOD <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
