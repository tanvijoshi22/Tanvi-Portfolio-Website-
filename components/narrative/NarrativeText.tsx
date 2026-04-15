'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  beat: number
  visible: boolean
}

interface BeatConfig {
  label:      string
  heading:    string
  sub?:       string
  typewriter?: boolean
  size:       'sm' | 'md' | 'lg' | 'xl'
}

const BEATS: BeatConfig[] = [
  // 0 — title card
  {
    label:   'A DESIGN STORY',
    heading: 'Tanvi',
    sub:     'Product Experience Designer',
    size:    'xl',
  },
  // 1
  {
    label:   '02 — PHILOSOPHY',
    heading: 'I love to balance\ncreativity and functionality.',
    size:    'lg',
  },
  // 2
  {
    label:   '03 — EXPERIENCE',
    heading: '5 years of shaping\nexperiences in B2B & B2C.',
    size:    'lg',
  },
  // 3
  {
    label:   '04 — IMPACT',
    heading: 'From confused users\nto delighted ones.',
    size:    'lg',
  },
  // 4 — typewriter
  {
    label:      '05 — INVITATION',
    heading:    'Let me take you to my journey of being a designer.',
    typewriter: true,
    size:       'md',
  },
]

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    setDisplayed('')
    let i = 0
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, 48)
    return () => clearInterval(interval)
  }, [text])

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="blink">|</span>}
    </span>
  )
}

const SIZE_MAP = {
  sm: 'text-2xl md:text-3xl',
  md: 'text-3xl md:text-5xl',
  lg: 'text-4xl md:text-6xl',
  xl: 'text-6xl md:text-8xl',
}

export default function NarrativeText({ beat, visible }: Props) {
  const config = BEATS[Math.min(beat, BEATS.length - 1)]

  return (
    <motion.div
      key={beat}
      className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 24 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {config.label && (
        <p className="film-label mb-8 text-white/40">{config.label}</p>
      )}

      <h2 className={`font-display font-bold text-white leading-tight whitespace-pre-line ${SIZE_MAP[config.size]}`}>
        {config.typewriter
          ? <TypewriterText text={config.heading} />
          : config.heading
        }
      </h2>

      {config.sub && (
        <motion.p
          className="mt-5 font-body text-white/55 text-xl tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {config.sub}
        </motion.p>
      )}
    </motion.div>
  )
}
