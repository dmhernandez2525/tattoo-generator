'use client'

import Link from 'next/link'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useDemoContext } from '@/contexts/DemoContext'
import { ChevronLeft } from 'lucide-react'

export default function DemoGalleryPage() {
  const { demoDesigns } = useDemoContext()

  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-8">
      <div className="w-full max-w-6xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-between">
          <Link href="/demo">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Demo
            </Button>
          </Link>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest">GALLERY</h2>
          <div className="w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoDesigns.map((design) => (
            <Link key={design.id} href={`/demo/design/${design.id}`}>
              <Card variant="glass" padding="none" className="group overflow-hidden aspect-square relative">
                <img
                  src={design.imageUrl}
                  alt={design.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-sm font-bold text-white truncate">{design.name}</p>
                  <p className="text-xs text-neon-cyan uppercase">{design.style}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}
