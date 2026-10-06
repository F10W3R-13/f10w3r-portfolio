import { ArrowUpRight, Play } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { img, PROJECT_META, PROJECTS, projectCats, type ProjectId } from '@/lib/data'
import { useLang } from '@/lib/lang'
import { cn } from '@/lib/utils'

export function ProjectDialog({ id, onClose }: { id: ProjectId | null; onClose: () => void }) {
  const { t } = useLang()
  const p = PROJECTS.find((x) => x.id === id)
  const meta = id ? PROJECT_META[id] : null

  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90svh] gap-0 overflow-y-auto p-0 sm:max-w-5xl">
        {p && meta && (
          <>
            {meta.gallery.length > 0 ? (
              <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto border-b p-4 sm:p-6">
                {meta.gallery.map((f, i) => (
                  <figure key={f} className="w-[85%] shrink-0 snap-start sm:w-[62%]">
                    <img src={img(f)} alt={t(p.detail.gallery[i]?.caption)} className="w-full rounded-md border" loading="lazy" />
                    <figcaption className="text-muted-foreground mt-2 text-xs">{t(p.detail.gallery[i]?.caption)}</figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="bg-primary text-primary-foreground flex items-end justify-between gap-6 p-6 sm:p-8">
                <div className="font-display text-[clamp(3.5rem,10vw,7rem)] leading-[0.85] font-[900] [font-variation-settings:'wdth'_80]">
                  77.8h
                </div>
                <div className="max-w-[16rem] text-right text-sm font-medium">{t({ ko: '3년간 혼자 중계한 시간', en: 'Hours cast solo over three years' })}</div>
              </div>
            )}

            <div className="flex flex-col gap-6 p-6 sm:p-8">
              <DialogHeader className="gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {projectCats(p.id).map((c, i) => (
                    <Badge key={i} variant="outline">
                      {t(c)}
                    </Badge>
                  ))}
                  <Badge variant="secondary">{t(p.role)}</Badge>
                </div>
                <DialogTitle className="text-3xl tracking-tight sm:text-4xl">{t(p.title)}</DialogTitle>
                <DialogDescription className="text-foreground/80 max-w-2xl text-base sm:text-lg">{t(p.detail.pitch)}</DialogDescription>
              </DialogHeader>

              {p.metrics.length > 0 && (
                <dl className={cn('grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-border', p.metrics.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4')}>
                  {p.metrics.map((m, i) => (
                    <div key={i} className="bg-background flex flex-col p-4">
                      <dt className="text-muted-foreground order-2 mt-1 text-xs leading-snug">{t(m.label)}</dt>
                      <dd className="font-display -order-1 text-3xl font-[800] tabular-nums [font-variation-settings:'wdth'_85]">{t(m.value)}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <Tabs defaultValue="why">
                <TabsList>
                  <TabsTrigger value="why">{t({ ko: '개요', en: 'Overview' })}</TabsTrigger>
                  <TabsTrigger value="how">{t({ ko: '구현', en: 'How it works' })}</TabsTrigger>
                  <TabsTrigger value="spec">{t({ ko: '스펙', en: 'Specs' })}</TabsTrigger>
                </TabsList>
                <TabsContent value="why" className="mt-3 grid gap-4 leading-relaxed sm:grid-cols-2">
                  <p>{t(p.detail.purpose)}</p>
                  <p className="text-muted-foreground">{t(p.detail.background)}</p>
                </TabsContent>
                <TabsContent value="how" className="text-foreground/90 mt-3 max-w-3xl leading-relaxed">
                  {t(p.detail.approach)}
                </TabsContent>
                <TabsContent value="spec" className="mt-3">
                  <Table>
                    <TableBody>
                      {p.detail.specs.map((s, i) => (
                        <TableRow key={i}>
                          <TableCell className="text-muted-foreground w-40 align-top font-mono text-xs">{t(s.label)}</TableCell>
                          <TableCell className="whitespace-normal">{t(s.value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s, i) => (
                    <Badge key={i} variant="outline" className="font-mono text-[11px]">
                      {t(s)}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {p.links.demo && (
                    <Button asChild>
                      <a href={p.links.demo} target="_blank" rel="noreferrer">
                        {t({ ko: '라이브 데모', en: 'Live demo' })}
                        <ArrowUpRight />
                      </a>
                    </Button>
                  )}
                  {p.links.youtube && (
                    <Button variant="outline" asChild>
                      <a href={p.links.youtube} target="_blank" rel="noreferrer">
                        <Play />
                        YouTube
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
