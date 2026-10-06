import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * 조명을 받는 글자. 처음 보일 때 빛이 한 번 훑고 지나간 뒤 전체가 밝아지고,
 * 이후(마우스 환경) 커서의 가로 위치를 빛이 따라간다.
 */
export function LitText({ children, className, delay = 0, follow = true }: { children: ReactNode; className?: string; delay?: number; follow?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const lx = useMotionValue(-35)
  const lr = useMotionValue(20)
  const sx = useSpring(lx, { stiffness: 50, damping: 18 })
  const bg = useMotionTemplate`radial-gradient(ellipse ${lr}% 160% at ${sx}% 30%, #fffaf5 0%, #ffe0c8 22%, oklch(0.72 0.19 45) 48%, oklch(0.34 0.07 40) 78%, oklch(0.2 0.01 50) 100%)`

  useEffect(() => {
    if (!inView) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      lx.jump(50)
      sx.jump(50)
      lr.set(80)
      return
    }
    let followOn = false
    const a = animate(lx, 125, { duration: 1.7, delay, ease: [0.45, 0, 0.2, 1] })
    a.then(() => {
      animate(lx, 50, { duration: 1.1, ease: [0.16, 1, 0.3, 1] })
      animate(lr, 78, { duration: 1.4, ease: [0.16, 1, 0.3, 1] }).then(() => {
        followOn = true
      })
    })
    const fine = matchMedia('(pointer: fine)').matches
    const onMove = (e: PointerEvent) => {
      if (!followOn || !follow || !fine) return
      lx.set(15 + (e.clientX / window.innerWidth) * 70)
    }
    window.addEventListener('pointermove', onMove)
    return () => {
      a.stop()
      window.removeEventListener('pointermove', onMove)
    }
  }, [inView, delay, follow, lx, lr, sx])

  const clip = { backgroundImage: bg, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as const
  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60 blur-[28px]" style={clip}>
        {children}
      </motion.span>
      <motion.span className="relative" style={clip}>
        {children}
      </motion.span>
    </span>
  )
}

/** 한 줄 텍스트를 부모 내용 폭에 꽉 맞춘다 (폰트 로드·리사이즈 시 재계산) */
export function FitLine({ children, className }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const fit = () => {
      const o = outer.current, i = inner.current
      if (!o || !i) return
      const cs = getComputedStyle(o)
      const avail = o.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      for (let k = 0; k < 2; k++) {
        const cur = parseFloat(getComputedStyle(i).fontSize)
        const w = i.getBoundingClientRect().width
        if (w > 0) i.style.fontSize = (cur * avail) / w + 'px'
      }
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(outer.current!)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={outer} className={cn('w-full', className)}>
      <span ref={inner} className="inline-block whitespace-nowrap" style={{ fontSize: '20vw' }}>
        {children}
      </span>
    </div>
  )
}
