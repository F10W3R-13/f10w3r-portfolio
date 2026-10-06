import { motion, type HTMLMotionProps } from 'motion/react'

/** 스크롤 진입 시 떠오르기. 정지 상태에서도 읽히도록 완전 투명에서 시작하지 않는다 */
export function Reveal({ delay = 0, y = 32, ...props }: HTMLMotionProps<'div'> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0.25, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    />
  )
}

/** 단어 단위로 마스크 아래에서 솟아오르는 제목 */
export function SplitWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split('\n').map((line, li) => (
        <span key={li} className="block">
          {line.split(' ').map((w, wi) => (
            <span key={wi} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: delay + (li * 4 + wi) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                {w}
                {' '}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
