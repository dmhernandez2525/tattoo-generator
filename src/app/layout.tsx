import type { Metadata } from 'next'
import { RootProviders } from '@/components/providers/RootProviders'
import './globals.css'

export const metadata: Metadata = {
  title: 'INK SYNTHESIS',
  description: 'AI-Driven Tattoo Generation & Haptic Imprinting Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  )
}
