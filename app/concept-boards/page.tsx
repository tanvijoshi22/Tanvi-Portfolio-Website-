'use client'
import ConceptHero    from '@/components/concept-boards/ConceptHero'
import HorizontalTicker from '@/components/concept-boards/HorizontalTicker'
import ConceptFooter  from '@/components/concept-boards/ConceptFooter'

export default function ConceptBoardsPage() {
  return (
    <main style={{ background: '#0D1117', minHeight: '100vh' }}>
      <ConceptHero />
      <HorizontalTicker />
      <ConceptFooter />
    </main>
  )
}
