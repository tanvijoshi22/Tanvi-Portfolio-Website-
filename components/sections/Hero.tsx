'use client'
import { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

/* ── Typewriter h1 ─────────────────────────────────────────────── */
const HERO_TEXT = "Hi, I'm Tanvi, Product Experience Designer crafting thoughtful solutions through creativity and passion."
const GRAD_START = HERO_TEXT.indexOf('Product')                         // 15
const GRAD_END   = HERO_TEXT.indexOf(' crafting')                       // 42

function TypewriterHero() {
  const [displayed, setDisplayed] = useState('')
  const [done,      setDone]      = useState(false)

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setDisplayed(HERO_TEXT.slice(0, i))
      if (i >= HERO_TEXT.length) { setDone(true); clearInterval(t) }
    }, 38)
    return () => clearInterval(t)
  }, [])

  const before = displayed.slice(0, GRAD_START)
  const middle = displayed.length > GRAD_START ? displayed.slice(GRAD_START, GRAD_END) : ''
  const after  = displayed.length > GRAD_END   ? displayed.slice(GRAD_END)             : ''

  return (
    <h1 className="font-display font-bold text-3xl md:text-[2.6rem] leading-[1.2] tracking-tight mb-8" style={{ color: '#1C1C1C' }}>
      {before}
      {middle && (
        <span style={{
          background:              'linear-gradient(90deg, #2B4EFF 0%, #7C3AED 100%)',
          WebkitBackgroundClip:    'text',
          WebkitTextFillColor:     'transparent',
          backgroundClip:          'text',
        }}>
          {middle}
        </span>
      )}
      {after}
      {!done && <span className="blink" style={{ marginLeft: 2, WebkitTextFillColor: '#2B4EFF', color: '#2B4EFF' }}>|</span>}
    </h1>
  )
}

export default function Hero() {
  const ref    = useRef<HTMLElement>(null)
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 })

  const springX = useSpring(0.5, { stiffness: 60, damping: 20 })
  const springY = useSpring(0.5, { stiffness: 60, damping: 20 })
  const bgX = useTransform(springX, [0, 1], ['-4%', '4%'])
  const bgY = useTransform(springY, [0, 1], ['-4%', '4%'])

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    springX.set((e.clientX - r.left) / r.width)
    springY.set((e.clientY - r.top) / r.height)
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height })
  }

  const hue = Math.round(mouse.x * 60 + 200)

  return (
    <section
      id="hero"
      data-section="hero"
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: `radial-gradient(ellipse at ${mouse.x * 100}% ${mouse.y * 100}%, hsl(${hue},80%,92%) 0%, #F7F6F3 60%)` }}
    >
      {/* Static ambient blob — top right */}
      <div className="ambient-blob" style={{
        top: '-120px', right: '-120px',
        background: 'rgba(43,78,255,0.08)',
      }} />

      {/* Parallax glow */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ x: bgX, y: bgY }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(43,78,255,0.06) 0%, transparent 70%)' }} />
      </motion.div>

      {/* ── Top meta bar ───────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-wrap items-center gap-3 px-6 md:px-10 pt-24 pb-0"
        initial={false}
      >
        {/* Location */}
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-text uppercase border border-muted-text/20 px-3 py-1.5 rounded-full">
          <svg width="8" height="10" viewBox="0 0 8 10" fill="none" className="opacity-60">
            <path d="M4 0C2.07 0 .5 1.57.5 3.5 .5 6.13 4 10 4 10s3.5-3.87 3.5-6.5C7.5 1.57 5.93 0 4 0zm0 4.75a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" fill="currentColor"/>
          </svg>
          Hyderabad, IN
        </span>

        {/* Experience */}
        <span className="font-mono text-[10px] tracking-widest text-muted-text uppercase border border-muted-text/20 px-3 py-1.5 rounded-full">
          5 yrs experience
        </span>

        {/* Available */}
        <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#1a9e5c] uppercase border border-[#1a9e5c]/25 bg-[#1a9e5c]/06 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_#22c55e]" />
          Available to work
        </span>
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center max-w-6xl mx-auto px-6 md:px-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center w-full py-8">

          {/* Left — text */}
          <div>
            <TypewriterHero />

            <motion.div
              className="flex flex-wrap gap-3"
              initial={false}
            >
              <a
                href="#work"
                className="bg-accent-blue text-white font-display font-semibold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-[#1f3de0] transition-colors duration-200"
                data-cursor="cta"
              >
                View Work
              </a>
              <a
                href="/Resume-Tanvi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-near-black/20 text-near-black font-display font-semibold text-sm tracking-wide px-6 py-3 rounded-full hover:bg-near-black hover:text-white transition-colors duration-200"
                data-cursor="nav"
              >
                Resume
              </a>
            </motion.div>
          </div>

          {/* Right — photo */}
          <motion.div
            className="relative border border-near-black/10 overflow-hidden aspect-[3/4] bg-card-bg"
            initial={false}
            style={{ borderRadius: 4 }}
          >
            <Image
              src="/tanvi.png"
              alt="Tanvi — Product Designer"
              fill
              className="object-cover object-top"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll pulse */}
      <div className="relative z-10 pb-8 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-widest text-muted-text uppercase">Scroll</span>
        <div className="w-px h-8 bg-muted-text/30 scroll-pulse" />
      </div>
    </section>
  )
}
