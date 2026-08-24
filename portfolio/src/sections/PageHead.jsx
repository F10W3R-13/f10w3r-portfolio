import content from '../../data/content.js'
import { useT } from '../lang.jsx'

/* 서브페이지 머리글 — 메인 백링크 + 카테고리 제목 + 한 줄 설명. def는 pages.<id> 정의. */
export default function PageHead({ def }) {
  const t = useT()

  return (
    <header className="mx-auto max-w-7xl px-6 pb-4 pt-24 md:px-12">
      <a href="/" className="text-[11px] tracking-[0.18em] hover:underline" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        ← {t({ ko: '메인으로', en: 'Back to main' })}
      </a>
      <h1 className="mt-6 text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        {t(def.label)}
      </h1>
      <p className="mt-5 max-w-[52ch] text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mono)', color: 'var(--ice-mute)' }}>
        {t(def.desc)}
      </p>
    </header>
  )
}
