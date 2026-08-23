import { useState } from 'react'
import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 주요 성적 — S/A 티어 기본 노출, B/C는 토글로 펼침(2026-08-24 사용자 요청).
   볼트 강조는 우승 행(won) 전용 */
function Row({ a, t }) {
  return (
    <div
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
  )
}

export default function Achievements() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const all = content.achievements.list
  const primary = all.filter((a) => a.tier === 'S' || a.tier === 'A')
  const lower = all.filter((a) => a.tier !== 'S' && a.tier !== 'A')

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="rise text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.achievements)}</h2>

      <div className="rise mt-8">
        {primary.map((a) => (
          <Row key={a.event} a={a} t={t} />
        ))}
      </div>

      {lower.length > 0 ? (
        <div className="mt-6">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="border px-5 py-2.5 text-[12px] tracking-[0.14em] transition-colors"
            style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--hairline)', color: 'var(--ice-dim)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--volt)'; e.currentTarget.style.borderColor = 'var(--volt)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--ice-dim)'; e.currentTarget.style.borderColor = 'var(--hairline)' }}
          >
            {open ? t(content.ui.collapse) : `${t(content.ui.expand)} (${lower.length})`}
          </button>
          {open ? (
            <div className="mt-4">
              {lower.map((a) => (
                <Row key={a.event} a={a} t={t} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
