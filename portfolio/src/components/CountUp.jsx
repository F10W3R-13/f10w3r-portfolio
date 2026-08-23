import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'

/*
 * 수치 카운트업 — animate 스킬 판정: 드뭄(첫 방문)+설명(마케팅 수치).
 * 숫자가 아닌 값은 그대로 출력. reduced-motion이면 즉시 최종값(단 ?motion=1 검수 시 재생).
 */
const EASE = [0.23, 1, 0.32, 1]

export default function CountUp({ value, delay = 0 }) {
  const str = String(value)
  const numeric = /^\d+$/.test(str)
  const target = numeric ? Number.parseInt(str, 10) : 0
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduce = useReducedMotion()
  const force = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('motion') === '1'
  const [display, setDisplay] = useState(() => (numeric && !(reduce && !force) ? 0 : target))

  useEffect(() => {
    if (!numeric || !inView) return
    if (reduce && !force) {
      setDisplay(target)
      return
    }
    const controls = animate(0, target, {
      duration: 0.9,
      delay,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, numeric, reduce, force, target, delay])

  return <span ref={ref} className="tabular-nums">{numeric ? display : str}</span>
}
