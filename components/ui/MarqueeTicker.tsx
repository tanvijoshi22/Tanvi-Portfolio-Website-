'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS_ROW1 = [
  'UX Research', 'Product Strategy', 'Figma', 'Prototyping',
  'User Testing', 'Design Systems', 'Wireframing', 'Information Architecture',
  'UX Research', 'Product Strategy', 'Figma', 'Prototyping',
  'User Testing', 'Design Systems', 'Wireframing', 'Information Architecture',
]
const SKILLS_ROW2 = [
  'Journey Mapping', 'Interaction Design', 'A/B Testing', 'Usability Audit',
  'Accessibility', 'Motion Design', 'Visual Design', 'Product Thinking',
  'Journey Mapping', 'Interaction Design', 'A/B Testing', 'Usability Audit',
  'Accessibility', 'Motion Design', 'Visual Design', 'Product Thinking',
]

function SkillChip({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ color: hovered ? '#2B4EFF' : '#1C1C1C', scale: hovered ? 1.05 : 1 }}
      transition={{ duration: 0.18 }}
      className="font-mono text-[11px] tracking-widest uppercase px-4 py-2 border border-[#1C1C1C]/20 rounded-full whitespace-nowrap"
    >
      {label}
    </motion.span>
  )
}

export default function MarqueeTicker() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      className="overflow-hidden space-y-3 py-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Row 1 — scrolls left */}
      <div className="flex gap-3" style={{ animation: 'tickerLeft 30s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
        {SKILLS_ROW1.map((s, i) => <SkillChip key={i} label={s} />)}
      </div>
      {/* Row 2 — scrolls right */}
      <div className="flex gap-3" style={{ animation: 'tickerRight 30s linear infinite', animationPlayState: paused ? 'paused' : 'running' }}>
        {SKILLS_ROW2.map((s, i) => <SkillChip key={i} label={s} />)}
      </div>
    </div>
  )
}
