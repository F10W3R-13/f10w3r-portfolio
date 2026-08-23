import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 커리어 — data.career의 player/coach 그룹 순서대로. 하이라이트 팀(T1·LG·OUG)은 highlight 필드로 표시 */
export default function Career() {
  const t = useT()
  const { career } = content
  const groups = [
    { label: content.ui.player, items: career.player },
    { label: content.ui.coach, items: career.coach },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="rise text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.career)}</h2>

      {groups.map((g, gi) => (
        <div key={g.label.en} className="mt-10">
          <p className="rise text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {t(g.label)} · {g.items.length}
          </p>
          <div className="rise mt-3">
            {g.items.map((c, i) => (
              <div
                key={c.team + c.period}
                className={`flex items-baseline justify-between gap-6 border-t py-3.5 last:border-b ${c.highlight ? 'pl-4' : ''}`}
                style={{ borderColor: 'var(--hairline)', borderLeftWidth: c.highlight ? 2 : undefined, borderLeftColor: c.highlight ? 'var(--volt)' : undefined }}
              >
                <span className="flex items-baseline gap-5">
                  <span className="w-6 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
                    {String(gi === 0 ? i + 1 : career.player.length + i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl tracking-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{c.team}</span>
                </span>
                <span className="shrink-0 text-[11px] tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: c.highlight ? 'var(--volt)' : 'var(--ice-mute)' }}>{c.period}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
