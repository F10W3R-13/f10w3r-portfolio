import { ArrowUpRight } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { img, PROJECT_META, PROJECTS, projectCats, type ProjectId } from '@/lib/data'
import { useLang } from '@/lib/lang'
import { cn } from '@/lib/utils'

const ORDER: { id: ProjectId; span: string }[] = [
  { id: 'coaching-hub', span: 'md:col-span-4 md:row-span-2' },
  { id: 'champions-queue', span: 'md:col-span-2' },
  { id: 'skku-whatsapp-bot', span: 'md:col-span-2' },
  { id: 'community-series', span: 'md:col-span-2' },
  { id: 'sportsday-hub', span: 'md:col-span-2' },
  { id: 'hiclub', span: 'md:col-span-2' },
]

export function Work({ onOpen }: { onOpen: (id: ProjectId) => void }) {
  const { t } = useLang()
  return (
    <section id="work" className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b pb-6">
        <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.82] font-[900] [font-variation-settings:'wdth'_75]">
          WORK
        </h2>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
          {t({
            ko: '전부 직접 기획하고 운영한 프로젝트입니다. 카드를 누르면 만든 이유와 구현 방식, 실제 화면이 열립니다.',
            en: 'Every project here I planned and ran myself. Open a card for the why, the how and the real screens.',
          })}
        </p>
      </div>

      <div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-6">
        {ORDER.map(({ id, span }, i) => (
          <Reveal key={id} delay={(i % 3) * 0.06} className={cn('min-w-0', span)}>
            <WorkCard id={id} big={i === 0} onOpen={onOpen} t={t} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function WorkCard({ id, big, onOpen, t }: { id: ProjectId; big: boolean; onOpen: (id: ProjectId) => void; t: ReturnType<typeof useLang>['t'] }) {
  const p = PROJECTS.find((x) => x.id === id)!
  const meta = PROJECT_META[id]
  const key = meta.key >= 0 ? p.metrics[meta.key] : null

  return (
    <button
      type="button"
      onClick={() => onOpen(id)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
      className="group spotlight relative block h-full w-full rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Card className="h-full gap-0 overflow-hidden py-0 transition-transform duration-500 group-hover:-translate-y-1">
        {meta.thumb ? (
          <div className={cn('relative overflow-hidden border-b', big ? 'aspect-[16/10] md:aspect-auto md:flex-1' : 'aspect-[16/9]')}>
            <img
              src={img(meta.thumb)}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="from-card/80 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
          </div>
        ) : (
          <div className="bg-primary text-primary-foreground flex aspect-[16/9] flex-col justify-between border-b p-5">
            <span className="font-mono text-xs">{t(p.metrics[2]?.label)}</span>
            <span className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.85] font-[900] tabular-nums [font-variation-settings:'wdth'_80]">
              {t(p.metrics[2]?.value)}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-1.5">
            {meta.live && (
              <Badge className="gap-1.5">
                <span className="relative flex size-1.5 rounded-full bg-current">
                  <span className="absolute inset-0 animate-ping rounded-full bg-current opacity-70" />
                </span>
                LIVE
              </Badge>
            )}
            {projectCats(id).map((c, i) => (
              <Badge key={i} variant="outline" className="text-muted-foreground">
                {t(c)}
              </Badge>
            ))}
          </div>
          <h3 className={cn('font-bold tracking-tight', big ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl')}>{t(p.title)}</h3>
          <p className={cn('text-muted-foreground leading-relaxed', big ? 'max-w-xl text-base' : 'line-clamp-2 text-sm')}>{t(p.detail.pitch)}</p>
          <div className="mt-1 flex items-end justify-between gap-4 border-t pt-4">
            {key ? (
              <div className="min-w-0">
                <div className="font-display text-3xl leading-none font-[800] tabular-nums [font-variation-settings:'wdth'_85]">
                  {t(key.value)}
                </div>
                <div className="text-muted-foreground mt-1 truncate text-xs">{t(key.label)}</div>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">{t(p.role)}</div>
            )}
            <span className="group-hover:bg-primary group-hover:text-primary-foreground grid size-9 shrink-0 place-items-center rounded-full border transition-colors">
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </div>
        </div>
      </Card>
    </button>
  )
}
