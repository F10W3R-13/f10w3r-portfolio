import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 연락 — 주 CTA는 코칭 허브 라이브 데미(직접 제작 CTA, 2026-08-24 채택). email은 null이면 미표시 */
export default function Contact() {
  const t = useT()
  const { profile } = content
  const hub = content.projects.list.find((p) => p.id === 'coaching-hub')

  const links = [
    { label: 'GitHub', href: profile.contact.github },
    { label: 'X', href: profile.contact.twitter },
    { label: 'YouTube', href: profile.contact.youtube },
    { label: 'Liquipedia', href: profile.contact.liquipedia },
    ...(profile.contact.email ? [{ label: profile.contact.email, href: `mailto:${profile.contact.email}` }] : []),
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.contact)}</h2>

      <div className="reveal mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 border p-8" style={{ borderColor: 'var(--hairline)' }}>
        <a
          href={hub.links.demo}
          target="_blank"
          rel="noreferrer"
          className="cta-volt inline-flex items-center gap-3 border px-7 py-3.5 text-[13px] tracking-[0.18em]"
          style={{ borderColor: 'var(--volt)', color: 'var(--volt)', fontFamily: 'var(--font-mono)' }}
        >
          {t(content.ui.liveDemoCta)}
          <span aria-hidden="true" className="cta-arrow">↗</span>
        </a>
        {links.map((l) => (
          <a key={l.label + l.href} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>
            {l.label} ↗
          </a>
        ))}
      </div>

      <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 text-[11px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        <span>© 2026 {profile.ign}</span>
        <span>{t(content.footer.note)}</span>
      </footer>
    </section>
  )
}
