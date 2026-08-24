import content from '../data/content.js'
import overrides from '../data/content.overrides.js'

/*
 * 편집 모드 엔진(?edit=1, dev 서버 전용) — 컴포넌트를 고치지 않고 DOM 텍스트를
 * content.js 경로로 역매핑해 즉석 편집·저장한다.
 * 원리: 콘텐츠 전체를 순회해 "렌더된 문자열 → 경로" 맵을 만들고, 그 문자열과 정확히
 * 일치하는 leaf 텍스트 요소에 contenteditable을 건다. 저장 시 원본 문자열로 경로를
 * 찾아 오버라이드를 만들고 POST /__edit/save → vite 미들웨어가 overrides 파일에 기록.
 * 매핑 실패(팀명 등 짧은 중복 포함)시 첫 경로를 쓴다. UI 크롬(버튼 등)은 편집만 되고 저장 안 됨.
 */

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CANVAS'])

function flatten(node, path, out) {
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${path}[${i}]`, out))
    return
  }
  if (node && typeof node === 'object') {
    for (const k of Object.keys(node)) flatten(node[k], path ? `${path}.${k}` : k, out)
    return
  }
  if (typeof node === 'string' && node.trim()) {
    const key = node.trim()
    if (!out.has(key)) out.set(key, [])
    out.get(key).push(path)
  }
}

let stringMap
let editableEls = []

export function currentLang() {
  return document.documentElement.lang || 'ko'
}

function setAtPath(obj, path, value) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.')
  let cur = obj
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i]
    if (typeof cur[k] !== 'object' || cur[k] === null) cur[k] = /^\d+$/.test(parts[i + 1]) ? [] : {}
    cur = cur[k]
  }
  cur[parts[parts.length - 1]] = value
}

export function activateEditMode() {
  stringMap = new Map()
  flatten(content, '', stringMap)

  const sel = 'h1,h2,h3,p,span,li,figcaption,a,button,strong,em'
  editableEls = []
  for (const el of document.querySelectorAll(sel)) {
    if (SKIP_TAGS.has(el.tagName)) continue
    if (el.children.length > 0) continue
    const text = el.textContent.trim()
    if (!text) continue
    if (stringMap.has(text)) {
      el.setAttribute('contenteditable', 'true')
      el.dataset.editOriginal = text
      el.style.outline = '1px dashed rgba(185,222,95,0.35)'
      el.style.outlineOffset = '2px'
      el.addEventListener('focus', () => { el.style.outline = '1px solid var(--volt)' })
      el.addEventListener('blur', () => { el.style.outline = '1px dashed rgba(185,222,95,0.35)' })
      editableEls.push(el)
    }
  }
  return editableEls.length
}

export function editedCount() {
  return editableEls.filter((el) => el.textContent.trim() !== el.dataset.editOriginal).length
}

// 저장: 편집된 요소 → {경로: {ko|en: 새값}} 병합 + 현재 _style 노브 포함
export async function saveEdits(styleKnobs) {
  const lang = currentLang()
  const next = JSON.parse(JSON.stringify(overrides ?? {}))
  next._content = next._content ?? {}
  for (const el of editableEls) {
    const now = el.textContent.trim()
    const orig = el.dataset.editOriginal
    if (now === orig || !now) continue
    const paths = stringMap.get(orig)
    if (!paths) continue
    // {ko,en} 객체 경로(마지막 세그먼트가 ko/en)면 현재 언어 키만 교체
    const path = paths[0]
    const m = path.match(/^(.*)\.(ko|en)$/)
    if (m) setAtPath(next._content, `${m[1]}.${lang}`, now)
    else setAtPath(next._content, path, now)
  }
  next._style = styleKnobs
  const res = await fetch('/__edit/save', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ overrides: next }),
  })
  return res.ok
}
