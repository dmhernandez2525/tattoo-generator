import { Suspense } from 'react'
import { DemoGenerator } from '@/components/demo/DemoGenerator'

function GeneratorLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading generator...</div>
    </div>
  )
}

export default function DemoGeneratorPage() {
  return (
    <Suspense fallback={<GeneratorLoading />}>
      <DemoGenerator />
    </Suspense>
  )
}
