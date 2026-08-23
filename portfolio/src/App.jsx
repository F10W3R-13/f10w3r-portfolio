import { DotMatrixBackground } from '@designcodeio/threeui'
import content from '../data/content.js'

/*
 * Stage 0′ 증명 페이지 — threeui 컴포넌트가 이 스택에서 실제로 렌더링됨을 확인하는 게 목적.
 * 디자인은 Stage 2 콘셉트에서 전면 교체된다.
 */
export default function App() {
  const { hero } = content
  return (
    <main className="relative min-h-[100dvh] bg-zinc-950 text-zinc-100">
      <DotMatrixBackground className="absolute inset-0" opacity={0.45} />
      <section className="relative z-10 flex min-h-[100dvh] flex-col justify-center px-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">{hero.ign}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tighter">{hero.name.ko}</h1>
        <p className="mt-3 max-w-[65ch] leading-relaxed text-zinc-400">{hero.tagline.ko}</p>
      </section>
    </main>
  )
}
