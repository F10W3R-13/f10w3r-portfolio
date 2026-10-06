import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'ko' | 'en'
export type Text = string | { ko: string; en: string }

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'ko', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('f10w3r-lang') === 'en' ? 'en' : 'ko'
    } catch {
      return 'ko'
    }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('f10w3r-lang', lang)
    } catch {
      /* 저장소 차단 환경 */
    }
  }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const t = (v: Text | undefined | null) => (v == null ? '' : typeof v === 'string' ? v : v[lang])
  return { lang, setLang, t }
}
