'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import NarrativeText from './NarrativeText'
import SkipButton from './SkipButton'
import { usePhase } from '@/contexts/PhaseContext'
import { useLenis } from '@/contexts/LenisContext'

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

const TOTAL_BEATS = 5   // beats 0–4
// No auto-advance — user must scroll / arrow / click to proceed

export default function NarrativeIntro() {
  const { setPhase } = usePhase()
  const lenis = useLenis()

  const [beat, setBeat] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const beatRef   = useRef(beat)
  beatRef.current = beat

  // Stop Lenis during narrative
  useEffect(() => {
    lenis?.stop()
    return () => lenis?.start()
  }, [lenis])

  const goToPortfolio = useCallback(() => {
    setTimeout(() => { lenis?.start(); setPhase('portfolio') }, 700)
  }, [lenis, setPhase])

  const advance = useCallback((dir: 1 | -1) => {
    if (dir === 1) {
      if (beatRef.current >= TOTAL_BEATS - 1) {
        // Already on last beat — next scroll/arrow triggers portfolio
        goToPortfolio()
        return
      }
      setBeat(b => b + 1)
    } else {
      setBeat(b => Math.max(0, b - 1))
    }
  }, [goToPortfolio])

  // Wheel
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      advance(e.deltaY > 0 ? 1 : -1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [advance])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); advance(1) }
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); advance(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance])

  // Touch
  const touchStartY = useRef(0)
  const onTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd   = (e: React.TouchEvent) => {
    const delta = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(delta) < 30) return
    advance(delta > 0 ? 1 : -1)
  }

  const isLastBeat   = beat === TOTAL_BEATS - 1
  const beatLabel    = `${String(beat + 1).padStart(2, '0')} / ${String(TOTAL_BEATS).padStart(2, '0')}`

  return (
    <motion.div
      ref={scrollRef}
      className="fixed inset-0 z-[100] bg-[#080808] flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Particles — gentle drift only, no zoom */}
      <ParticleField beat={beat} explode={false} />

      {/* Beat text */}
      <NarrativeText beat={beat} visible />

      {/* Skip */}
      <SkipButton />

      {/* Bottom UI */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-4">
        {/* Progress bar */}
        <div className="w-36 h-px bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent-blue rounded-full"
            animate={{ width: `${((beat) / (TOTAL_BEATS - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        {/* Beat counter */}
        <div className="overflow-hidden" style={{ height: 14 }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={beat}
              className="block font-mono text-[9px] tracking-widest text-white/30 uppercase"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {beatLabel}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Arrow button — always visible, clickable */}
        <motion.button
          onClick={() => advance(1)}
          className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 hover:border-accent-blue hover:bg-accent-blue/10 transition-colors duration-200"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-label={isLastBeat ? 'Enter portfolio' : 'Next'}
          data-cursor="nav"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1v10M1 6l5 5 5-5" stroke={isLastBeat ? '#2B4EFF' : 'rgba(255,255,255,0.5)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>

        {/* Last beat hint */}
        {isLastBeat && (
          <motion.span
            className="font-mono text-[9px] tracking-widest text-accent-blue uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            scroll to enter →
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}
