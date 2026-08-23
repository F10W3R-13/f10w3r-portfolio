import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 스킬 — 운영(현지화 객체) / 기술(범용 문자열) 두 그룹. 칩은 전각(sharp, radius 0) 토큰 통일 */
export default function Skills() {
  const t = useT()
  const groups = [
    { label: { ko: '운영', en: 'Operations' }, items: content.skills.ops.map((s) => (typeof s === 'string' ? s : t(s))) },
    { label: { ko: '기술', en: 'Technical' }, items: content.skills.tech },
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="rise text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.skills)}</h2>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        {groups.map((g) => (
          <div key={g.label.en}>
            <p className="rise text-[11px] tracking-[0.2em]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(g.label)}</p>
            <ul className="rise mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="border px-3 py-1.5 text-[12px]"
                  style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
