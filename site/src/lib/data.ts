import { PORTFOLIO_CONTENT } from '@/data/content'
import type { Text } from '@/lib/lang'

export const C = PORTFOLIO_CONTENT
export const img = (f: string) => `${import.meta.env.BASE_URL}img/${f}`

export type ProjectId =
  | 'coaching-hub'
  | 'champions-queue'
  | 'skku-whatsapp-bot'
  | 'community-series'
  | 'sportsday-hub'
  | 'hiclub'

/** content.js에 없는 표시용 정보: 썸네일, 갤러리 이미지(content gallery 순서와 동일), 대표 지표 */
export const PROJECT_META: Record<ProjectId, { thumb?: string; gallery: string[]; key: number; live?: string }> = {
  'coaching-hub': { thumb: 'hub-home.jpg', gallery: ['hub-home.jpg', 'hub-board.jpg', 'hub-player.jpg'], key: 0, live: 'demo' },
  'champions-queue': { thumb: 'cq-match.jpg', gallery: ['cq-intro.jpg', 'cq-access.jpg', 'cq-match.jpg', 'cq-update.jpg'], key: 0 },
  'skku-whatsapp-bot': { thumb: 'rag-chat.jpg', gallery: ['rag-chat.jpg', 'rag-chat2.jpg', 'rag-chat3.jpg'], key: 0 },
  'community-series': { gallery: [], key: 2 },
  'sportsday-hub': { thumb: 'sd-home.jpg', gallery: ['sd-home.jpg', 'sd-content.jpg', 'sd-handoffs.jpg'], key: -1, live: 'demo' },
  hiclub: { thumb: 'hiclub.jpg', gallery: ['hiclub.jpg', 'hiclub-buddy.jpg', 'hiclub-trip.jpg'], key: 1 },
}

export type Project = {
  id: ProjectId
  title: Text
  role: Text
  summary: Text
  highlight?: boolean
  stack: Text[]
  metrics: { value: Text; label: Text }[]
  links: { demo?: string; youtube?: string }
  detail: {
    pitch: Text
    purpose: Text
    background: Text
    approach: Text
    specs: { label: Text; value: Text }[]
    gallery: { file: string; caption: Text }[]
  }
}

export const PROJECTS: Project[] = C.projects.list

export const projectCats = (id: ProjectId): Text[] =>
  C.categories.filter((c: { projects: string[] }) => c.projects.includes(id)).map((c: { label: Text }) => c.label)

export type Result = {
  date: string
  event: string
  tier: 'S' | 'A' | 'B' | 'C'
  won: boolean
  result: Text
  role: Text
}
export const RESULTS: Result[] = C.achievements.list
