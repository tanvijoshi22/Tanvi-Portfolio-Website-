'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SoundToggle() {
  const [muted, setMuted] = useState(true)

  return (
    <motion.button
      onClick={() => setMuted(m => !m)}
      className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-[#6B6B6B] hover:text-[#1C1C1C] transition-colors duration-200 px-3 py-1.5 border border-[#1C1C1C]/15 rounded-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="nav"
    >
      {/* Waveform icon */}
      <span className="flex items-end gap-[2px] h-3">
        {[2, 4, 3, 5, 2].map((h, i) => (
          <motion.span
            key={i}
            className="w-[2px] rounded-sm bg-current"
            animate={{ height: muted ? 2 : h * 2 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ display: 'inline-block' }}
          />
        ))}
      </span>
      <span>{muted ? 'SOUND OFF' : 'SOUND ON'}</span>
    </motion.button>
  )
}
