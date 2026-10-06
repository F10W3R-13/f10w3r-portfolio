import { ArrowUpRight } from 'lucide-react'

import { FitLine, LitText } from '@/components/LitText'
import { Button } from '@/components/ui/button'
import { C } from '@/lib/data'
import { useLang } from '@/lib/lang'

const LINKS = [
  ['LinkedIn', C.profile.contact.linkedin],
  ['GitHub', C.profile.contact.github],
  ['YouTube', C.profile.contact.youtube],
  ['Liquipedia', C.profile.contact.liquipedia],
  ['X / Twitter', C.profile.contact.twitter],
] as const

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t pt-24 sm:pt-32">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,oklch(0.69_0.205_40/0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8">
        <FitLine className="font-display leading-[0.82] font-[900] tracking-[-0.02em] [font-variation-settings:'wdth'_100]">
          <LitText follow={false}>NEXT SEASON</LitText>
        </FitLine>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-2xl leading-snug font-bold tracking-tight sm:text-3xl">
              {t({ ko: '다음 시즌을 같이 만들 팀을 찾고 있습니다.', en: 'Looking for the team to build the next season with.' })}
            </p>
            <p className="text-muted-foreground mt-4">{t(C.profile.availability)}</p>
          </div>
          <div className="flex flex-col gap-2 md:col-span-6 md:col-start-7">
            {LINKS.map(([label, href]) => (
              <Button key={label} variant="outline" size="lg" asChild className="h-14 justify-between px-5 text-base">
                <a href={href} target="_blank" rel="noreferrer">
                  {label}
                  <ArrowUpRight />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <footer className="text-muted-foreground mt-24 flex flex-wrap justify-between gap-4 border-t py-8 text-xs">
          <span>
            {t(C.education.school)} · {t(C.education.major)} · {t(C.education.doubleMajor)}
          </span>
          <span>{t(C.footer.note)}</span>
        </footer>
      </div>
    </section>
  )
}
