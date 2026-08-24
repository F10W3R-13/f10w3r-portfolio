import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/*
 * 랜딩 카드 3분류 — hero 바로 아래. 카드 클릭 = 해당 세션으로 스크롤(#앵커),
 * hover(포인터 있을 때) = 소속 프로젝트 목록 공개. 터치에서는 목록이 항상 보인다.
 * reduce에서는 스크롤 부드러움을 끈다.
 */
export default function Categories() {
  const t = useT()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 md:pt-20">
      <div className="grid gap-6 md:grid-cols-3">
        {content.categories.map((c, i) => {
          const projects = c.projects
            .map((id) => content.projects.list.find((p) => p.id === id))
            .filter(Boolean)
          return (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => scrollTo(c.href)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollTo(c.href)
                }
              }}
              className="cat-card group relative flex min-h-[240px] cursor-pointer flex-col justify-between border p-6 transition-colors"
              style={{ borderColor: 'var(--hairline)' }}
            >
              <div>
                <p className="text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
                  {String(i + 1).padStart(2, '0')} · {projects.length} {t(content.ui.categoryProjects)}
                </p>
                <h3 className="mt-4 text-4xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(c.label)}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--ice-dim)' }}>{t(c.desc)}</p>
              </div>
              <ul className="cat-reveal mt-6 space-y-2">
                {projects.map((p) => (
                  <li key={p.id}>
                    <a
                      href={`/projects/?id=${p.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-baseline justify-between gap-3 border-t pt-2 text-[13px] hover:underline"
                      style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}
                    >
                      <span>{t(p.title)}</span>
                      <span aria-hidden="true" style={{ color: 'var(--ice-mute)' }}>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              <span aria-hidden="true" className="absolute right-6 top-6 text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>↓</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
