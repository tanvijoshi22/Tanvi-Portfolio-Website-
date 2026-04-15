import type { Metadata } from 'next'
import '../styles/globals.css'
import { PhaseProvider }  from '@/contexts/PhaseContext'
import { LenisProvider }  from '@/contexts/LenisContext'
import CustomCursor           from '@/components/ui/CustomCursor'
import GlobalCursorGradient  from '@/components/ui/GlobalCursorGradient'

export const metadata: Metadata = {
  title: 'Tanvi — A Design Story',
  description: 'Product Experience Designer. A cinematic portfolio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <GlobalCursorGradient />
        <CustomCursor />
        <PhaseProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </PhaseProvider>
      </body>
    </html>
  )
}
