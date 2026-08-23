import { createContext, useContext } from 'react'

export const LangContext = createContext('ko')

/** 현지화 필드 접근: t(field) → field[lang] (없으면 ko 폴백) */
export function useT() {
  const lang = useContext(LangContext)
  return (field) => {
    if (field === null || field === undefined) return ''
    if (typeof field === 'string') return field
    return field[lang] ?? field.ko ?? ''
  }
}
