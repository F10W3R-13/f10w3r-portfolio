import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useLang, type Lang } from '@/lib/lang'
import { cn } from '@/lib/utils'

const NAV = [
  ['#board', { ko: '갤러리', en: 'Gallery' }],
  ['#work', { ko: '프로젝트', en: 'Work' }],
  ['#record', { ko: '기록', en: 'Record' }],
  ['#contact', { ko: '연락', en: 'Contact' }],
] as const

export function Header() {
  const { t, lang, setLang } = useLang()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top)] transition-colors duration-300',
        solid ? 'border-b bg-background/75 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8">
        <a href="#top" className="font-display text-lg font-[850] tracking-tight [font-variation-settings:'wdth'_110]">
          F10W3R
        </a>
        <nav className="flex items-center gap-1 sm:gap-6">
          <div className="hidden items-center gap-6 md:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {t(label)}
              </a>
            ))}
          </div>
          <ToggleGroup
            type="single"
            size="sm"
            variant="outline"
            value={lang}
            onValueChange={(v) => v && setLang(v as Lang)}
            aria-label="Language"
          >
            <ToggleGroupItem value="ko" className="px-2.5 font-mono text-xs">KO</ToggleGroupItem>
            <ToggleGroupItem value="en" className="px-2.5 font-mono text-xs">EN</ToggleGroupItem>
          </ToggleGroup>
        </nav>
      </div>
      <motion.div className="bg-primary absolute bottom-0 left-0 h-[2px] w-full origin-left" style={{ scaleX: progress }} />
    </header>
  )
}
