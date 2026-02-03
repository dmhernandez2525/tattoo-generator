'use client'

import { ClerkProvider } from '@clerk/nextjs'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'

export function RootProviders({ children }: { children: ReactNode }) {
  if (demoMode) {
    return <ThemeProvider>{children}</ThemeProvider>
  }

  return (
    <ClerkProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </ClerkProvider>
  )
}
