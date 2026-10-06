import { useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'motion/react'

import { FitLine, LitText } from '@/components/LitText'
import { Button } from '@/components/ui/button'
import { useLang } from '@/lib/lang'

const CREDITS = [
  { ko: '선수 2020–21', en: 'Player 2020–21' },
  { ko: '코치 2021–현재', en: 'Coach 2021–now' },
  { ko: '13개 팀', en: '13 teams' },
  { ko: '우승 2회', en: '2 titles' },
  { ko: '직접 만든 시스템 4개', en: '4 systems built' },
]

export function Opening() {
  const { t } = useLang()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.22])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const lift = useTransform(scrollYProgress, [0, 1], [0, -60])

  const up = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: d, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* 위에서 떨어지는 무대 조명 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <motion.div
          className="absolute top-0 left-1/2 h-[95svh] w-[140vw] -translate-x-1/2 bg-[radial-gradient(ellipse_32%_75%_at_50%_0%,oklch(0.8_0.1_60/0.2),transparent_72%)]"
          animate={{ opacity: [0.75, 1, 0.85, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="grain absolute inset-0 opacity-[0.08] mix-blend-overlay" />
        <div className="from-background absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
      </div>

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-4 pt-24 pb-8 sm:px-8">
        <motion.div {...up(0.1)} className="text-muted-foreground flex justify-between gap-4 font-mono text-[11px] tracking-[0.18em] uppercase">
          <span>{t({ ko: '유민우 · Yoo Min-woo', en: 'Yoo Min-woo · 유민우' })}</span>
          <span className="text-right">CODM · 2020 — 2026</span>
        </motion.div>

        <motion.h1 style={{ scale, opacity: fade, y: lift }} className="my-auto origin-[50%_70%] py-6" aria-label="F10W3R">
          <FitLine className="font-display leading-[0.8] font-[900] tracking-[-0.02em] [font-variation-settings:'wdth'_100]">
            <LitText delay={0.25}>F10W3R</LitText>
          </FitLine>
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <motion.h2 {...up(1.6)} className="text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.1] font-bold tracking-[-0.03em] md:col-span-7">
            {t({ ko: '경기장에서 배운 걸,', en: 'What I learned in the arena,' })}
            <br />
            <span className="text-primary">{t({ ko: '돌아가는 시스템으로.', en: 'shipped as running systems.' })}</span>
          </motion.h2>
          <motion.div {...up(1.75)} className="md:col-span-5">
            <p className="text-muted-foreground max-w-[34rem] leading-relaxed">
              {t({
                ko: 'T1 선수 출신 CODM 프로 코치. 코칭하다 생긴 문제를 직접 만든 도구로 풀어 왔습니다. 스크림 데이터 파이프라인, 4개 리전 랭크 리그, 교환학생용 RAG 봇까지.',
                en: 'Ex-T1 player, now a CODM pro coach. When coaching threw up a problem, I built the tool that solved it: a scrim data pipeline, a four-region ranked league, a RAG bot for exchange students.',
              })}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#work">
                  {t({ ko: '프로젝트 보기', en: 'See the work' })}
                  <ArrowDown />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://liquipedia.net/callofduty/F10W3R" target="_blank" rel="noreferrer">
                  Liquipedia
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.ul
          {...up(1.9)}
          className="text-muted-foreground mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t pt-4 font-mono text-[11px] tracking-[0.14em] uppercase"
        >
          {CREDITS.map((c, i) => (
            <li key={i}>{t(c)}</li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
