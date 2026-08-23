import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 앱 루트는 portfolio/ — data/content.js 경로 계약(minwo0___/00 문서) 유지
export default defineConfig({
  root: 'portfolio',
  plugins: [react(), tailwindcss()],
})
