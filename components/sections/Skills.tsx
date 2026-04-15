'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import MarqueeTicker from '@/components/ui/MarqueeTicker'

const SKILL_CARDS = [
  {
    icon: '🔍',
    title: 'Research & Strategy',
    desc: 'User interviews, competitive analysis, jobs-to-be-done. I validate before I design.',
    tags: ['User Research', 'Heuristics', 'JTBD', 'Stakeholder Management'],
  },
  {
    icon: '✦',
    title: 'Interaction Design',
    desc: 'From low-fi wireframes to polished Figma prototypes. Every click, every hover, every state.',
    tags: ['Figma', 'Prototyping', 'Motion', 'Component Systems'],
  },
  {
    icon: '◈',
    title: 'Delivery & Systems',
    desc: 'Design systems, developer handoff, QA. I ship work that survives production.',
    tags: ['Design Systems', 'Zeroheight', 'A11y', 'Notion'],
  },
]

export default function Skills() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="skills" className="py-24 bg-off-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <p className="film-label mb-6">Chapter III</p>
        <h2 className="font-display font-bold text-near-black text-4xl md:text-5xl mb-3">Craft &amp; Toolkit</h2>
        <p className="font-body text-muted-text text-lg mb-16 max-w-lg">5 years of honing these across B2B products, consumer apps, and design systems.</p>

        {/* Divider-based skill rows — no card boxes */}
        <div className="grid md:grid-cols-3 mb-20" style={{ borderTop: '1px solid rgba(28,28,28,0.10)' }}>
          {SKILL_CARDS.map((card, i) => (
            <motion.div
              key={i}
              className="flex flex-col gap-4 pt-8 pb-8 cursor-default"
              style={{
                borderRight: i < SKILL_CARDS.length - 1 ? '1px solid rgba(28,28,28,0.08)' : 'none',
                paddingLeft:  i === 0 ? 0 : 32,
                paddingRight: i === SKILL_CARDS.length - 1 ? 0 : 32,
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Icon */}
              <motion.span
                className="text-3xl block"
                animate={{ scale: hovered === i ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {card.icon}
              </motion.span>

              {/* Title */}
              <h3
                className="font-display font-bold text-xl leading-snug transition-colors duration-200"
                style={{ color: hovered === i ? '#2B4EFF' : '#1C1C1C' }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="font-body text-muted-text text-sm leading-relaxed">{card.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {card.tags.map(t => (
                  <span key={t} className="font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-full bg-off-white border border-near-black/10 text-muted-text">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dual marquee ticker */}
      <MarqueeTicker />
    </section>
  )
}
