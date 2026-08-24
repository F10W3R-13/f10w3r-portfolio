import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 광범위 자기소개(메인) — 커리어·성적·프로젝트가 서브페이지로 옮겨간 자리(2026-08-24). */
export default function About() {
  const t = useT()
  const { profile } = content

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="reveal text-3xl tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>{t({ ko: '소개', en: 'About' })}</h2>
      <p className="reveal mt-8 max-w-[62ch] text-lg leading-relaxed" style={{ color: 'var(--ice-dim)' }}>
        {t(content.about.body)}
      </p>
      <p className="reveal mt-6 text-[11px]" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        {t(profile.base)} · {t(profile.availability)}
      </p>
    </section>
  )
}
