import { DemoProvider } from '@/contexts/DemoContext'
import { DemoBottomNav } from '@/components/demo/DemoBottomNav'

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DemoProvider>
      {children}
      <DemoBottomNav />
    </DemoProvider>
  )
}
