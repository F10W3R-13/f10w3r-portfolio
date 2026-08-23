import content from '../../data/content.js'
import { useT } from '../lang.jsx'

export default function Education() {
  const t = useT()
  const { education } = content

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.education)}</h2>

      <div className="reveal mt-8 border-t pt-8" style={{ borderColor: 'var(--hairline)' }}>
        <p className="text-3xl font-black tracking-tight" style={{ fontFamily: 'var(--font-ko-display)' }}>{t(education.school)}</p>
        <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-sm" style={{ color: 'var(--ice-dim)' }}>
          <span>{t(education.major)}</span>
          <span>{t(education.doubleMajor)}</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>{t(education.status)}</span>
        </div>
      </div>
    </section>
  )
}
