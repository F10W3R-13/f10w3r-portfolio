import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 하이클럽 — 성균관대 국제처 산하 학생단체, 교환학생 맞이 활동(캠퍼스 서브페이지). */
export default function HiClub() {
  const t = useT()

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <p className="reveal text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        SKKU OFFICE OF INTERNATIONAL AFFAIRS
      </p>
      <h2 className="reveal mt-3 text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        {t({ ko: '하이클럽', en: 'HiClub' })}
      </h2>
      <p className="reveal mt-6 max-w-[62ch] leading-relaxed" style={{ color: 'var(--ice-dim)' }}>
        {t(content.hiclub.desc)}
      </p>
      <ul className="reveal mt-8">
        {content.hiclub.items.map((it, i) => (
          <li key={it.en} className="row-hover flex items-baseline gap-6 border-t py-4 last:border-b" style={{ borderColor: 'var(--hairline)' }}>
            <span className="text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{String(i + 1).padStart(2, '0')}</span>
            <span className="text-base" style={{ color: 'var(--ice-dim)' }}>{t(it)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
