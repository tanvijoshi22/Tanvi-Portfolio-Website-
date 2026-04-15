'use client'
import { useEffect, useRef } from 'react'

export default function FilmGrain() {
  const seedRef = useRef<SVGFETurbulenceElement | null>(null)
  const frameRef = useRef<number>()

  useEffect(() => {
    let seed = 0
    const tick = () => {
      seed = (seed + 1) % 100
      seedRef.current?.setAttribute('seed', String(seed))
      frameRef.current = requestAnimationFrame(tick)
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [])

  return (
    <>
      <svg className="hidden" aria-hidden>
        <filter id="grain">
          <feTurbulence
            ref={seedRef}
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div
        aria-hidden
        className="fixed inset-0 z-[9990] pointer-events-none opacity-[0.035] mix-blend-overlay"
        style={{ filter: 'url(#grain)', width: '100%', height: '100%' }}
      />
    </>
  )
}
