'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    setLenis(l)

    const raf = (time: number) => { l.raf(time); rafRef.current = requestAnimationFrame(raf) }
    rafRef.current = requestAnimationFrame(raf)

    return () => { l.destroy(); if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)
