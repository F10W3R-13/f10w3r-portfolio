import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/*
 * 랜딩 카드 — hero 아래 풀페이지(100dvh) 그리드. 카드 자체가 서브페이지(?page=) 진입 버튼.
 * 구성: 사진(전면) + hover 시 사진 위 오버레이로 소속 프로젝트 목록 공개(터치에서는 항상).
 * 카드 이름은 카드 아래 바깥에 표기(2026-08-24 사용자 시안).
 */
export default function Categories() {
  const t = useT()

  // 2026-08-31: 풀페이지(100dvh) 제거 — 세로 여백 과다 지적(문서·지인 피드백). 히어로만 포스터 유지
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-20 pt-4 md:px-12">
      {/* 2026-08-31 안 B 개편: 4카테고리 — 2×2 그리드 */}
      <div className="mx-auto grid gap-6 md:grid-cols-2 md:gap-14" style={{ maxWidth: '48rem' }}>
        {content.categories.map((c, i) => {
          const projects = c.projects
            .map((id) => content.projects.list.find((p) => p.id === id))
            .filter(Boolean)
          return (
            <div key={c.id}>
              <a
                href={c.href}
                className="cat-card group relative block border p-2"
                style={{ borderColor: 'var(--hairline-strong)' }}
                aria-label={t(c.label)}
              >
                <img
                  src={c.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] md:aspect-[3/4]"
                />
                <div className="cat-reveal absolute inset-0 flex flex-col justify-end p-5" style={{ background: 'rgba(6,8,11,0.88)' }}>
                  <ul className="space-y-2">
                    {projects.map((p) => (
                      <li key={p.id}>
                        <span
                          role="link"
                          tabIndex={0}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            window.location.href = `/projects/?id=${p.id}`
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              e.stopPropagation()
                              window.location.href = `/projects/?id=${p.id}`
                            }
                          }}
                          className="flex cursor-pointer items-baseline justify-between gap-3 border-t pt-2 text-[12px] hover:underline"
                          style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}
                        >
                          <span>{t(p.title)}</span>
                          <span aria-hidden="true" style={{ color: 'var(--ice-mute)' }}>↗</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[10px] tracking-[0.16em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
                    {t({ ko: '카드 클릭 → 카테고리 페이지', en: 'click card -> category page' })}
                  </p>
                </div>
              </a>
              <div className="mt-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-2xl tracking-tight md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>{t(c.label)}</h3>
                  <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
                    {String(i + 1).padStart(2, '0')} · {projects.length} {t(content.ui.categoryProjects)}
                  </span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed" style={{ fontFamily: 'var(--font-body)', color: 'var(--ice-dim)' }}>
                  {t(c.desc)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
