'use client'
import { createContext, useContext, useState } from 'react'

export type Phase = 'narrative' | 'transitioning' | 'portfolio'

interface Ctx { phase: Phase; setPhase: (p: Phase) => void }
const PhaseContext = createContext<Ctx>({ phase: 'narrative', setPhase: () => {} })

export function PhaseProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('narrative')
  return <PhaseContext.Provider value={{ phase, setPhase }}>{children}</PhaseContext.Provider>
}

export const usePhase = () => useContext(PhaseContext)
