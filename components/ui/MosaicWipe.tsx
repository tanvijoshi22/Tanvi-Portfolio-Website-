'use client'
import { useEffect, useRef } from 'react'
import { animate } from 'framer-motion'
import { useSection } from '@/contexts/SectionContext'

const COLS = 4
const ROWS = 4

export default function MosaicWipe() {
  const { activeIndex } = useSection()
  const prevIndex = useRef(activeIndex)
  const tileRefs  = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (prevIndex.current === activeIndex) return
    prevIndex.current = activeIndex

    const tiles = tileRefs.current.filter(Boolean) as HTMLDivElement[]

    tiles.forEach((tile, i) => {
      const delay = i * 0.02
      animate(tile, { scaleY: [0, 1] }, { delay, duration: 0.18, ease: 'easeIn' })
        .then(() => animate(tile, { scaleY: [1, 0] }, { duration: 0.18, ease: 'easeOut' }))
    })
  }, [activeIndex])

  return (
    <div className="fixed inset-0 z-[9970] pointer-events-none grid" style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}>
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
