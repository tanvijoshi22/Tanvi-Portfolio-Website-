'use client'
import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { usePhase } from '@/contexts/PhaseContext'

const COLS = 5
const ROWS = 5

export default function PhaseTransition() {
  const { phase } = usePhase()
  const tileRefs  = useRef<(HTMLDivElement | null)[]>([])
  const prevPhase = useRef(phase)

  useEffect(() => {
    const wasNarrative = prevPhase.current === 'narrative' || prevPhase.current === 'transitioning'
    const isPortfolio  = phase === 'portfolio'

    if (!wasNarrative || !isPortfolio) {
      prevPhase.current = phase
      return
    }
    prevPhase.current = phase

    const tiles = tileRefs.current.filter(Boolean) as HTMLDivElement[]

    // In — diagonal stagger
    const inPromises = tiles.map((tile, i) => {
      const col   = i % COLS
      const row   = Math.floor(i / COLS)
      const delay = (col + row) * 0.03
      return animate(tile, { scaleY: [0, 1] }, { delay, duration: 0.2, ease: 'easeIn' })
    })

    // Out — reverse diagonal after in finishes
    Promise.all(inPromises).then(() => {
      tiles.forEach((tile, i) => {
        const col   = (COLS - 1 - i % COLS)
        const row   = (ROWS - 1 - Math.floor(i / COLS))
        const delay = (col + row) * 0.025
        animate(tile, { scaleY: [1, 0] }, { delay, duration: 0.18, ease: 'easeOut' })
      })
    })
  }, [phase])

  return (
    <div
      className="fixed inset-0 z-[9960] pointer-events-none grid"
      style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
    >
      {Array.from({ length: COLS * ROWS }).map((_, i) => (
        <div
          key={i}
          ref={el => { tileRefs.current[i] = el }}
          style={{ background: '#2B4EFF', transform: 'scaleY(0)', transformOrigin: 'top' }}
        />
      ))}
    </div>
  )
}
