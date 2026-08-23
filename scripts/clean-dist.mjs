/*
 * 빌드 전 dist 정리 — OneDrive가 잠근 dist에 rmSync(recursive)를 돌리면
 * 예외가 아니라 node 프로세스 자체가 크래시(exit 127)한다 (try/catch 불가, Vite emptyOutDir도 동일 사인).
 * 전략: 삭제를 자식 프로세스에서 실행 — 자식이 죽어도 부모는 계속 진행하고 rename으로 치운다.
 * vite.config는 emptyOutDir:false — Vite가 스스로 rmSync하지 않게 한다.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, renameSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const dist = fileURLToPath(new URL('../portfolio/dist', import.meta.url))

function safeRm(p) {
  if (!existsSync(p)) return
  spawnSync(process.execPath, ['-e', `try{require('fs').rmSync(${JSON.stringify(p)},{recursive:true,force:true})}catch(e){}`], { stdio: 'ignore' })
  if (existsSync(p)) {
    try {
      renameSync(p, `${p}_locked_${Date.now()}`)
      console.log(`[clean-dist] 잠긴 폴더 rename으로 치움: ${p}`)
    } catch {
      console.log(`[clean-dist] 경고: ${p} 제거 불가 (OneDrive 잠금) — 이어쓰기`)
    }
  }
}

safeRm(dist)
