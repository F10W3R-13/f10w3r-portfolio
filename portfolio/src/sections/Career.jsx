import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 커리어 — data.career의 player/coach 그룹. 강조선 없음(2026-08-24 정리: 볼트=우승 전용),
   현재 소속은 current 필드로 태그 표시 */
export default function Career() {
  const t = useT()
  const { career } = content
  const groups = [
    { label: content.ui.player, items: career.player },
    { label: content.ui.coach, items: career.coach },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.career)}</h2>

      {groups.map((g, gi) => (
        <div key={g.label.en} className="mt-10">
          <p className="reveal text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
            {t(g.label)} · {g.items.length}
          </p>
          <div className="reveal mt-3">
            {g.items.map((c, i) => (
              <div key={c.team + i} className="flex items-baseline justify-between gap-6 border-t py-3.5 last:border-b" style={{ borderColor: 'var(--hairline)' }}>
                <span className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="w-7 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
                    {String(gi === 0 ? i + 1 : career.player.length + i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl tracking-tight md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{c.team}</span>
                  {c.current ? (
                    <span className="border px-1.5 py-0.5 text-[10px] tracking-widest" style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--volt)', color: 'var(--volt)' }}>
                      {t(content.ui.current)}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 text-[11px] tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(c.period)}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
