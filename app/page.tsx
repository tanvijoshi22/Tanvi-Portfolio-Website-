'use client'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { usePhase }  from '@/contexts/PhaseContext'
import { SectionProvider } from '@/contexts/SectionContext'

// Narrative (heavy — Three.js, lazy load)
const NarrativeIntro = dynamic(() => import('@/components/narrative/NarrativeIntro'), { ssr: false })

// Portfolio UI
import FilmGrain      from '@/components/ui/FilmGrain'
import ScrollProgress from '@/components/ui/ScrollProgress'
import EasterEggs       from '@/components/ui/EasterEggs'
import PhaseTransition  from '@/components/ui/PhaseTransition'
import TopBar          from '@/components/navigation/TopBar'
import FloatingOrb     from '@/components/navigation/FloatingOrb'
import SceneIndicator  from '@/components/navigation/SceneIndicator'

// Portfolio sections
import Hero    from '@/components/sections/Hero'
import Projects    from '@/components/sections/Projects'
import SkillsVault  from '@/components/sections/SkillsVault'
import About        from '@/components/sections/About'
import WhyMe   from '@/components/sections/WhyMe'
import Contact  from '@/components/sections/Contact'

export default function Home() {
  const { phase } = usePhase()
  const isPortfolio = phase === 'portfolio'

  return (
    <>
      <EasterEggs />
      <PhaseTransition />

      <AnimatePresence>
        {(phase === 'narrative' || phase === 'transitioning') && (
          <NarrativeIntro key="narrative" />
        )}
      </AnimatePresence>

      {isPortfolio && (
        <SectionProvider>
          <FilmGrain />
          <ScrollProgress />
          <TopBar />
          <FloatingOrb />
          <SceneIndicator />

          <motion.main
            initial={false}
          >
            <Hero />
            <Projects />
            <SkillsVault />
            <About />
            <WhyMe />
            <Contact />
          </motion.main>
        </SectionProvider>
      )}
    </>
  )
}
