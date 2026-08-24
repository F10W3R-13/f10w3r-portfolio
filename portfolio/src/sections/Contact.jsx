import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 연락 — 링크 열거. 데모 CTA는 프로젝트 행·상세에 이미 있으므로 중복 제거(2026-08-24). email은 null이면 미표시 */
export default function Contact() {
  const t = useT()
  const { profile } = content

  const links = [
    { label: 'GitHub', href: profile.contact.github },
    { label: 'X', href: profile.contact.twitter },
    { label: 'YouTube', href: profile.contact.youtube },
    { label: 'Liquipedia', href: profile.contact.liquipedia },
    ...(profile.contact.email ? [{ label: profile.contact.email, href: `mailto:${profile.contact.email}` }] : []),
  ]

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t(content.ui.headings.contact)}</h2>

      <div className="reveal mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 border p-8" style={{ borderColor: 'var(--hairline)' }}>
        {links.map((l) => (
          <a key={l.label + l.href} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noreferrer" className="text-sm hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-dim)' }}>
            {l.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>

      <p className="reveal mt-6 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        {t(profile.base)} · {t(profile.availability)}
      </p>

      <footer className="mt-16 flex flex-wrap items-baseline justify-between gap-4 border-t pt-6 text-[11px]" style={{ borderColor: 'var(--hairline)', fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        <span>© 2026 {profile.ign}</span>
        <span>{t(content.footer.note)}</span>
      </footer>
    </section>
  )
}
