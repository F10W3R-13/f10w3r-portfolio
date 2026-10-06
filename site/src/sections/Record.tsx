import { ArrowUpRight, Trophy } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { C, RESULTS, type Result } from '@/lib/data'
import { useLang } from '@/lib/lang'
import { cn } from '@/lib/utils'

export function Record() {
  const { t } = useLang()
  const coach = C.career.coach as { team: string; current?: boolean }[]
  const player = C.career.player as { team: string }[]
  const isPlayer = (r: Result) => t(r.role) === t({ ko: '선수', en: 'Player' })

  return (
    <section id="record" className="mx-auto max-w-[1600px] px-4 py-24 sm:px-8 sm:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b pb-6">
        <h2 className="font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.82] font-[900] [font-variation-settings:'wdth'_75]">
          RECORD
        </h2>
        <a
          href="https://liquipedia.net/callofduty/F10W3R"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm transition-colors"
        >
          {t({ ko: '모든 기록은 Liquipedia 원본과 대조했습니다', en: 'Every result is checked against Liquipedia' })}
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="flex flex-col gap-8 lg:col-span-4">
          <div>
            <div className="text-muted-foreground font-mono text-xs tracking-widest">PLAYER · 2020–2021</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {player.map((p) => (
                <Badge key={p.team} variant="outline" className="px-2.5 py-1 text-sm">
                  {p.team}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground font-mono text-xs tracking-widest">COACH · 2021–NOW</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {coach.map((c) => (
                <Badge key={c.team} variant={c.current ? 'default' : 'outline'} className="px-2.5 py-1 text-sm">
                  {c.team}
                  {c.current && ` · ${t({ ko: '현재', en: 'now' })}`}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="min-w-0 lg:col-span-8" delay={0.08}>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">{t({ ko: '전체', en: 'All' })}</TabsTrigger>
              <TabsTrigger value="coach">{t({ ko: '코치', en: 'Coach' })}</TabsTrigger>
              <TabsTrigger value="player">{t({ ko: '선수', en: 'Player' })}</TabsTrigger>
            </TabsList>
            {(['all', 'coach', 'player'] as const).map((k) => (
              <TabsContent key={k} value={k} className="mt-4">
                <ResultTable rows={RESULTS.filter((r) => k === 'all' || (k === 'player') === isPlayer(r))} />
              </TabsContent>
            ))}
          </Tabs>
        </Reveal>
      </div>
    </section>
  )
}

function ResultTable({ rows }: { rows: Result[] }) {
  const { t } = useLang()
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-muted-foreground w-28 font-mono text-xs">{t({ ko: '날짜', en: 'Date' })}</TableHead>
          <TableHead className="text-muted-foreground font-mono text-xs">{t({ ko: '대회', en: 'Event' })}</TableHead>
          <TableHead className="text-muted-foreground w-14 font-mono text-xs">{t({ ko: '티어', en: 'Tier' })}</TableHead>
          <TableHead className="text-muted-foreground font-mono text-xs">{t({ ko: '결과', en: 'Result' })}</TableHead>
          <TableHead className="text-muted-foreground font-mono text-xs">{t({ ko: '역할', en: 'Role' })}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.date + r.event} className={cn(r.won && 'bg-primary/10 hover:bg-primary/15')}>
            <TableCell className="text-muted-foreground font-mono text-xs tabular-nums">{r.date}</TableCell>
            <TableCell className="font-medium">{r.event}</TableCell>
            <TableCell>
              <span
                className={cn(
                  'inline-grid size-6 place-items-center rounded font-mono text-xs font-semibold',
                  r.tier === 'S' ? 'bg-foreground text-background' : r.tier === 'A' ? 'border' : 'text-muted-foreground',
                )}
              >
                {r.tier}
              </span>
            </TableCell>
            <TableCell className={cn(r.won && 'text-primary font-semibold')}>
              <span className="inline-flex items-center gap-1.5">
                {r.won && <Trophy className="size-4" />}
                {t(r.result)}
              </span>
            </TableCell>
            <TableCell className="text-muted-foreground">{t(r.role)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
