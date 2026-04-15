'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

export interface SectionMeta {
  id:      string
  chapter: string
  label:   string
  index:   number
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero',    chapter: 'CHAPTER I',   label: 'Opening',    index: 0 },
  { id: 'work',    chapter: 'CHAPTER II',  label: 'Work',       index: 1 },
  { id: 'about',   chapter: 'CHAPTER III', label: 'About',      index: 2 },
  { id: 'why-me',  chapter: 'CHAPTER IV',  label: 'Why Me',     index: 3 },
  { id: 'contact', chapter: 'CHAPTER V',   label: 'Contact',    index: 4 },
]

interface SectionCtx {
  active: SectionMeta
  activeIndex: number
}

const SectionContext = createContext<SectionCtx>({
  active: SECTIONS[0],
  activeIndex: 0,
})

export function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndex = useRef(0)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id, index }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index)
            prevIndex.current = index
          }
        },
        { threshold: 0.15 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <SectionContext.Provider value={{ active: SECTIONS[activeIndex], activeIndex }}>
      {children}
    </SectionContext.Provider>
  )
}

export const useSection = () => useContext(SectionContext)
