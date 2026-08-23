import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 주요 성적 — 단일 열 스코어보드(2026-08-24 사용자 확정). 우승 행은 won 필드로 볼트 표시 */
export default function Achievements() {
  const t = useT()

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="rise text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.achievements)}</h2>

      <div className="rise mt-8">
        {content.achievements.list.map((a) => (
          <div
            key={a.event}
            className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-t py-4 last:border-b md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-6 ${a.won ? 'pl-4' : ''}`}
            style={{ borderColor: 'var(--hairline)', borderLeftWidth: a.won ? 2 : undefined, borderLeftColor: a.won ? 'var(--volt)' : undefined }}
          >
            <span className="order-2 border px-1.5 py-0.5 text-[10px] tracking-widest md:order-1" style={{ fontFamily: 'var(--font-mono)', borderColor: '#3a4450', color: 'var(--ice-dim)' }}>
              {a.tier}
            </span>
            <span className="order-1 text-xl tracking-tight md:order-2 md:text-2xl" style={{ fontFamily: 'var(--font-display)' }}>{a.event}</span>
            <span className="order-3 text-sm tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: a.won ? 'var(--volt)' : 'var(--ice-dim)' }}>
              {t(a.result)}
            </span>
            <span className="order-4 hidden text-[11px] md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(a.role)}</span>
            <span className="order-5 hidden text-[11px] tabular-nums md:block" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{a.date}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
