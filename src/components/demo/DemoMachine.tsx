'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { MachineDashboard } from '@/components/features/machine/MachineDashboard'
import { useDemoContext } from '@/contexts/DemoContext'
import { ChevronLeft } from 'lucide-react'

type DemoMachineSettings = {
  voltage: number
  frequency: number
  depth: number
}

export function DemoMachine() {
  const router = useRouter()
  const { updateMachineSettings } = useDemoContext()

  const handleSettingsChange = (settings: DemoMachineSettings) => {
    updateMachineSettings(settings)
  }

  const handleBack = () => {
    router.push('/demo')
  }

  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-8">
      <div className="w-full max-w-5xl space-y-4">
        <Link href="/demo">
          <Button variant="ghost" className="text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Demo
          </Button>
        </Link>
        <MachineDashboard onBack={handleBack} onSettingsChange={handleSettingsChange} />
      </div>
    </Layout>
  )
}
