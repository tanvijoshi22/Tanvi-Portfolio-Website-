'use client'
import { motion } from 'framer-motion'
import { usePhase } from '@/contexts/PhaseContext'
import { useLenis } from '@/contexts/LenisContext'

export default function SkipButton() {
  const { setPhase } = usePhase()
  const lenis = useLenis()

  const skip = () => {
    lenis?.start()
    setPhase('portfolio')
  }

  return (
    <motion.button
      onClick={skip}
      className="fixed bottom-8 right-8 z-50 font-mono text-xs tracking-widest uppercase text-white/40 hover:text-white border border-white/20 hover:border-white/60 px-4 py-2 rounded-full transition-colors duration-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      data-cursor="nav"
    >
      SKIP →
    </motion.button>
  )
}
