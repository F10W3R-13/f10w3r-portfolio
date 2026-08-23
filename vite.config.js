import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 앱 루트는 portfolio/ — data/content.js 경로 계약(minwo0___/00 문서) 유지
export default defineConfig({
  root: 'portfolio',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    // dist는 scripts/clean-dist.mjs가 관리 — 잠긴 폴더 rmSync가 프로세스를 통째로 죽이는
    // OneDrive 환경 특성 때문에 Vite의 emptyOutDir 자체 rmSync를 끈다.
    emptyOutDir: false,
    // 이 Windows/OneDrive 환경에서 빌드 후반(esbuild/lightningcss)이 간헐 크래시(exit 127).
    // Vercel(Linux CI)에서는 정상이므로 배포 빌드에서만 minify.
    minify: process.env.VERCEL === '1' ? 'esbuild' : false,
  },
})
