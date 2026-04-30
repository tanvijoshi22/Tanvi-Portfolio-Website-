import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Concept Boards — Tanvi',
  description: "Visual direction through mood boards, colour palettes and typographic studies — Chapter VII of Tanvi's design story.",
}

export default function ConceptBoardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
