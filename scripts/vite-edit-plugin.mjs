/*
 * 편집 모드 저장 미들웨어(dev 전용) — POST /__edit/save { overrides } 본문을
 * portfolio/data/content.overrides.js로 기록한다. 프로덕션 빌드에는 영향 없음.
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

export function editModePlugin() {
  const root = dirname(dirname(fileURLToPath(import.meta.url)))
  const target = join(root, 'portfolio', 'data', 'content.overrides.js')
  return {
    name: 'portfolio-edit-mode',
    configureServer(server) {
      server.middlewares.use('/__edit/save', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end('POST only')
          return
        }
        let body = ''
        req.on('data', (c) => { body += c })
        req.on('end', async () => {
          try {
            const payload = JSON.parse(body || '{}')
            const json = JSON.stringify(payload.overrides ?? {}, null, 2)
            const fileBody = `/* 편집 모드(?edit=1)에서 저장됨 — ${new Date().toISOString()} */\nexport default ${json}\n`
            await writeFile(target, fileBody, 'utf8')
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ ok: true }))
          } catch (e) {
            res.statusCode = 400
            res.end(JSON.stringify({ ok: false, error: String(e) }))
          }
        })
      })
    },
  }
}
