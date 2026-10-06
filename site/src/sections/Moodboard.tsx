import { useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'motion/react'

import { img, type ProjectId } from '@/lib/data'
import { useLang, type Text } from '@/lib/lang'
import { cn } from '@/lib/utils'

const BW = 2600
const BH = 1700

type Tile = { big: string; sub: Text; tone: 'ember' | 'paper' | 'line' }
export type BoardItem = {
  src?: string
  tile?: Tile
  x: number
  y: number
  w: number
  ar: number
  rot: number
  cap: Text
  project?: ProjectId
}

const ITEMS: BoardItem[] = [
  { tile: { big: '13', sub: { ko: '거친 팀 · 선수 3 · 코치 10', en: 'teams · 3 as player, 10 as coach' }, tone: 'line' }, x: 1100, y: 200, w: 300, ar: 1.2, rot: -2, cap: '2020 — 2026' },
  { tile: { big: 'T1', sub: { ko: '2020.10 선수로 합류', en: 'Joined as a player, Oct 2020' }, tone: 'paper' }, x: 1500, y: 200, w: 240, ar: 1.2, rot: 2, cap: { ko: '선수 시절', en: 'Player years' } },
  { src: 'hub-player.jpg', x: 650, y: 170, w: 380, ar: 1.5, rot: -2, project: 'coaching-hub', cap: { ko: '코칭 허브 · 선수 상세 기록', en: 'Coaching Hub · player detail' } },
  { src: 'cq-access.jpg', x: 1900, y: 200, w: 360, ar: 1.584, rot: 2, project: 'champions-queue', cap: { ko: "Champion's Queue · 접근 신청 3경로", en: "Champion's Queue · three access routes" } },
  { src: 'rag-chat2.jpg', x: 180, y: 80, w: 300, ar: 1.055, rot: 1.5, project: 'skku-whatsapp-bot', cap: { ko: 'SKKU 봇 · !ask 질문', en: 'SKKU bot · !ask question' } },
  { src: 'cq-intro.jpg', x: 180, y: 470, w: 360, ar: 1.584, rot: -2.5, project: 'champions-queue', cap: { ko: "Champion's Queue · 서버 소개", en: "Champion's Queue · server intro" } },
  { src: 'squad.jpg', x: 600, y: 500, w: 460, ar: 1.333, rot: 2, cap: { ko: 'Luminosity Gaming 시절 팀', en: 'Luminosity Gaming squad' } },
  { src: 'portrait.jpg', x: 1110, y: 540, w: 340, ar: 0.8, rot: -2, cap: { ko: '대회 부스에서', en: 'At the tournament booth' } },
  { tile: { big: '1ST', sub: { ko: 'Snapdragon Pro Series S5: NA 우승 · 코치', en: 'Snapdragon Pro Series S5: NA champion · coach' }, tone: 'ember' }, x: 1500, y: 560, w: 270, ar: 1, rot: 3, cap: '2024.08.10' },
  { src: 'rag-chat.jpg', x: 1990, y: 540, w: 300, ar: 1.068, rot: 2, project: 'skku-whatsapp-bot', cap: { ko: 'SKKU 봇 · 출처 각주를 단 답변', en: 'SKKU bot · answer with source footnotes' } },
  { src: 'hiclub-buddy.jpg', x: 2330, y: 470, w: 250, ar: 1.333, rot: 3, project: 'hiclub', cap: { ko: '하이클럽 · 버디 프로그램', en: 'HiClub · buddy program' } },
  { src: 'rag-chat3.jpg', x: 2330, y: 740, w: 250, ar: 1.214, rot: -2, project: 'skku-whatsapp-bot', cap: { ko: 'SKKU 봇 · 보험·동아리 질문', en: 'SKKU bot · insurance and clubs' } },
  { src: 'hiclub.jpg', x: 250, y: 880, w: 400, ar: 1.333, rot: -1.5, project: 'hiclub', cap: { ko: '하이클럽 · 제2땅굴 필드트립', en: 'HiClub · Second Tunnel field trip' } },
  { src: 'booth.jpg', x: 700, y: 900, w: 320, ar: 1.093, rot: -3, cap: { ko: '메이저 대회 스테이지 부스', en: 'Major tournament stage booth' } },
  { src: 'hub-home.jpg', x: 1500, y: 880, w: 440, ar: 1.5, rot: -1, project: 'coaching-hub', cap: { ko: '코칭 허브 · 메인 대시보드', en: 'Coaching Hub · main dashboard' } },
  { tile: { big: '77.8h', sub: { ko: '커뮤니티 대회 누적 중계', en: 'Community tournament airtime' }, tone: 'paper' }, x: 1990, y: 880, w: 280, ar: 1.25, rot: -2, project: 'community-series', cap: { ko: '8에디션 · 2023.07~', en: '8 editions · since Jul 2023' } },
  { src: 'cq-match.jpg', x: 1080, y: 1040, w: 380, ar: 1.596, rot: 1.5, project: 'champions-queue', cap: { ko: "Champion's Queue · 매치 리포트", en: "Champion's Queue · match report" } },
  { src: 'hub-board.jpg', x: 1990, y: 1120, w: 340, ar: 1.5, rot: -2, project: 'coaching-hub', cap: { ko: '코칭 허브 · K/D 리더보드', en: 'Coaching Hub · K/D leaderboard' } },
  { tile: { big: '91%', sub: { ko: 'RAG 봇 골드셋 정답률', en: 'RAG bot gold-set accuracy' }, tone: 'ember' }, x: 380, y: 1260, w: 250, ar: 1.3, rot: 2, project: 'skku-whatsapp-bot', cap: { ko: '138문항 · 비근거 답변 0', en: '138 questions · 0 unsupported' } },
  { src: 'sd-home.jpg', x: 1540, y: 1250, w: 380, ar: 1.5, rot: 2, project: 'sportsday-hub', cap: { ko: '스포츠데이 허브 · 대시보드', en: 'Sportsday Hub · dashboard' } },
  { src: 'cq-update.jpg', x: 700, y: 1290, w: 340, ar: 1.6, rot: -1.5, project: 'champions-queue', cap: { ko: "Champion's Queue · 업데이트 로그", en: "Champion's Queue · update log" } },
  { src: 'hiclub-trip.jpg', x: 1100, y: 1340, w: 320, ar: 1.333, rot: 1, project: 'hiclub', cap: { ko: '하이클럽 · 필드트립', en: 'HiClub · field trip' } },
  { src: 'sd-handoffs.jpg', x: 2000, y: 1420, w: 320, ar: 1.5, rot: -1, project: 'sportsday-hub', cap: { ko: '스포츠데이 허브 · 인계 게시판', en: 'Sportsday Hub · handoff board' } },
]

export function Moodboard({ onOpenProject, onOpenPhoto }: { onOpenProject: (id: ProjectId) => void; onOpenPhoto: (item: BoardItem) => void }) {
  const { t } = useLang()
  const view = useRef<HTMLDivElement>(null)
  const [dim, setDim] = useState({ w: 1200, h: 800, s: 0.7, coarse: false })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const dragging = useRef(false)
  const lastDrag = useRef(0)
  const [entered, setEntered] = useState(false)

  useLayoutEffect(() => {
    const measure = () => {
      const el = view.current!
      const coarse = matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
      const s = coarse ? 0.4 : Math.max(0.6, Math.min(1, window.innerWidth / 1900))
      const w = el.clientWidth
      const h = coarse ? BH * s : el.clientHeight
      setDim({ w, h, s, coarse })
      x.set((w - BW * s) / 2)
      y.set(coarse ? 0 : (h - BH * s) / 2)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [x, y])

  const { w, h, s, coarse } = dim
  const bounds = { left: Math.min(0, w - BW * s), right: 0, top: Math.min(0, h - BH * s), bottom: 0 }

  // 미니맵
  const MW = coarse ? 120 : 176
  const m = MW / BW
  const vx = useTransform(x, (v) => (-v / s) * m)
  const vy = useTransform(y, (v) => (-v / s) * m)

  function jump(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    const bx = (e.clientX - r.left) / m
    const by = (e.clientY - r.top) / m
    const tx = Math.max(bounds.left, Math.min(0, w / 2 - bx * s))
    const ty = Math.max(bounds.top, Math.min(0, h / 2 - by * s))
    animate(x, tx, { type: 'spring', stiffness: 120, damping: 24 })
    animate(y, ty, { type: 'spring', stiffness: 120, damping: 24 })
  }

  function open(item: BoardItem) {
    if (dragging.current || performance.now() - lastDrag.current < 120) return
    if (item.project) onOpenProject(item.project)
    else onOpenPhoto(item)
  }

  return (
    <section id="board" className="relative py-24 sm:py-32">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-6 px-4 sm:px-8">
        <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02] font-bold tracking-[-0.035em]">
          {t({ ko: '무대 위의 6년,', en: 'Six years on stage,' })}
          <br />
          <span className="text-muted-foreground">{t({ ko: '그 사이에 만든 것들.', en: 'and what I built in between.' })}</span>
        </h2>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          {t({
            ko: '경기장 사진과 직접 만든 툴의 실제 화면입니다. 프로젝트 화면을 누르면 자세한 설명이 열립니다.',
            en: 'Photos from the arena and real screens from the tools I built. Open any project screen for the full story.',
          })}
        </p>
      </div>

      <motion.div
        ref={view}
        onViewportEnter={() => setEntered(true)}
        viewport={{ once: true, amount: 0.25 }}
        className={cn(
          'relative mt-10 overflow-hidden border-y bg-[radial-gradient(circle,oklch(1_0_0/0.07)_1px,transparent_1px)] [background-size:28px_28px]',
          coarse ? '' : 'h-[86svh]',
        )}
        style={coarse ? { height: h } : undefined}
      >
        <motion.div
          drag={coarse ? 'x' : true}
          dragConstraints={bounds}
          dragElastic={0.12}
          dragTransition={{ power: 0.25, timeConstant: 320 }}
          onDragStart={() => (dragging.current = true)}
          onDragEnd={() => {
            dragging.current = false
            lastDrag.current = performance.now()
          }}
          style={{ x, y, width: BW * s, height: BH * s }}
          className="absolute top-0 left-0 cursor-grab active:cursor-grabbing"
        >
          {ITEMS.map((it, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => open(it)}
              className="group absolute block text-left outline-none"
              style={{ left: it.x * s, top: it.y * s, width: it.w * s }}
              initial={{ opacity: 0.25, scale: 0.85, rotate: it.rot * 3, y: 40 }}
              animate={entered ? { opacity: 1, scale: 1, rotate: it.rot, y: 0 } : undefined}
              whileHover={coarse ? undefined : { scale: 1.045, rotate: 0, zIndex: 5 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18, delay: entered ? 0.03 * i : 0 }}
            >
              <div
                className="overflow-hidden rounded-md border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,.9)] transition-[border-color] group-hover:border-primary/70 group-focus-visible:border-primary"
                style={{ aspectRatio: it.ar }}
              >
                {it.src ? (
                  <img src={img(it.src)} alt={t(it.cap)} draggable={false} loading="lazy" className="h-full w-full object-cover" />
                ) : it.tile ? (
                  <TileFace tile={it.tile} s={s} t={t} />
                ) : null}
              </div>
              <div
                className="text-muted-foreground group-hover:text-foreground mt-2 truncate font-mono tracking-wide transition-colors"
                style={{ fontSize: Math.max(10, 12 * s) }}
              >
                {t(it.cap)}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* 미니맵 */}
        <div
          className="bg-background/80 absolute right-3 bottom-3 cursor-pointer rounded-md border p-1.5 backdrop-blur sm:right-5 sm:bottom-5"
          aria-hidden="true"
        >
          <div className="relative" style={{ width: MW, height: BH * m }} onClick={jump}>
            {ITEMS.map((it, i) => (
              <span
                key={i}
                className={cn('absolute rounded-[1px]', it.tile?.tone === 'ember' ? 'bg-primary' : 'bg-white/25')}
                style={{ left: it.x * m, top: it.y * m, width: it.w * m, height: (it.w / it.ar) * m }}
              />
            ))}
            <motion.span
              className="border-primary absolute rounded-[2px] border"
              style={{ left: vx, top: vy, width: (w / s) * m, height: (h / s) * m }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function TileFace({ tile, s, t }: { tile: Tile; s: number; t: (v: Text) => string }) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col justify-between',
        tile.tone === 'ember' && 'bg-primary text-primary-foreground',
        tile.tone === 'paper' && 'bg-paper text-ink',
        tile.tone === 'line' && 'bg-card text-foreground',
      )}
      style={{ padding: 18 * s }}
    >
      <span className="font-mono leading-snug" style={{ fontSize: Math.max(9, 12 * s) }}>
        {t(tile.sub)}
      </span>
      <span
        className="font-display leading-[0.85] font-[900] [font-variation-settings:'wdth'_80]"
        style={{ fontSize: 96 * s }}
      >
        {tile.big}
      </span>
    </div>
  )
}
