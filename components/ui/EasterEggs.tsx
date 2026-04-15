'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Konami code sequence ────────────────────────────────────────────────────
const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']

function Confetti() {
  const items = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#2B4EFF','#E85D26','#FFD700','#00C896','#FF6B9D'][i % 5],
    delay: Math.random() * 0.4,
    rotate: Math.random() * 720,
  }))
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      {items.map(p => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ left: `${p.x}%`, top: -8, background: p.color }}
          initial={{ y: -8, opacity: 1, rotate: 0 }}
          animate={{ y: window.innerHeight + 20, opacity: 0, rotate: p.rotate }}
          transition={{ duration: 2.5 + Math.random(), delay: p.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}

// ── Ghost cursor typing "Tanvi" ─────────────────────────────────────────────
const GHOST_WORD = 'Tanvi'
const IDLE_TIMEOUT = 8000

function GhostCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [letterIndex, setLetterIndex] = useState(0)

  useEffect(() => {
    setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const interval = setInterval(() => {
      setLetterIndex(i => (i + 1) % (GHOST_WORD.length + 1))
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed z-[9997] pointer-events-none"
      style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)' }}
    >
      <div className="relative">
        <div className="w-3 h-3 rounded-full border border-accent-blue opacity-40" />
        <span className="absolute left-4 top-0 font-mono text-xs text-accent-blue tracking-widest opacity-60">
          {GHOST_WORD.slice(0, letterIndex)}
          <span className="blink">|</span>
        </span>
      </div>
    </div>
  )
}

// ── Click counter easter egg ─────────────────────────────────────────────────
function ClickBurst({ count }: { count: number }) {
  return (
    <motion.div
      key={count}
      className="fixed bottom-24 right-8 z-[9996] pointer-events-none font-mono text-xs text-accent-blue"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8 }}
    >
      {count === 10 ? '🎉 you found it!' : `×${count}`}
    </motion.div>
  )
}

export default function EasterEggs() {
  const konamiBuffer = useRef<string[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const idleTimer = useRef<ReturnType<typeof setTimeout>>()
  const [showGhost, setShowGhost] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  const [showClickBurst, setShowClickBurst] = useState(false)
  const clickTimer = useRef<ReturnType<typeof setTimeout>>()

  // Konami code
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      konamiBuffer.current.push(e.key)
      if (konamiBuffer.current.length > KONAMI.length) konamiBuffer.current.shift()
      if (konamiBuffer.current.join(',') === KONAMI.join(',')) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3500)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Idle ghost cursor (8s idle → show ghost)
  useEffect(() => {
    const reset = () => {
      setShowGhost(false)
      clearTimeout(idleTimer.current)
      idleTimer.current = setTimeout(() => setShowGhost(true), IDLE_TIMEOUT)
    }
    reset()
    window.addEventListener('mousemove', reset)
    window.addEventListener('keydown', reset)
    return () => {
      window.removeEventListener('mousemove', reset)
      window.removeEventListener('keydown', reset)
      clearTimeout(idleTimer.current)
    }
  }, [])

  // Click counter (10 rapid clicks)
  const handleClick = () => {
    setClickCount(prev => {
      const next = prev + 1
      clearTimeout(clickTimer.current)
      clickTimer.current = setTimeout(() => setClickCount(0), 2000)
      if (next === 10) {
        setShowClickBurst(true)
        setTimeout(() => setShowClickBurst(false), 1200)
        return 0
      }
      if (next > 1) {
        setShowClickBurst(true)
        setTimeout(() => setShowClickBurst(false), 800)
      }
      return next
    })
  }

  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <>
      <AnimatePresence>{showConfetti && <Confetti key="confetti" />}</AnimatePresence>
      <AnimatePresence>{showGhost && <GhostCursor key="ghost" />}</AnimatePresence>
      <AnimatePresence>{showClickBurst && <ClickBurst key={clickCount} count={clickCount} />}</AnimatePresence>
    </>
  )
}
