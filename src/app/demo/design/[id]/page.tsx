'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useDemoContext } from '@/contexts/DemoContext'
import { ChevronLeft } from 'lucide-react'

export default function DemoDesignPage() {
  const params = useParams()
  const designId = Array.isArray(params.id) ? params.id[0] : params.id
  const { demoDesigns } = useDemoContext()
  const design = demoDesigns.find((item) => item.id === designId)

  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-8">
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="flex items-center justify-between">
          <Link href="/demo/gallery">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Gallery
            </Button>
          </Link>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest">DESIGN DETAIL</h2>
          <div className="w-24" />
        </div>

        {!design ? (
          <Card variant="glass">
            <CardContent className="p-10 text-center text-slate-300">
              Design not found.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card variant="glass" padding="none" className="overflow-hidden aspect-square">
              <img src={design.imageUrl} alt={design.name} className="w-full h-full object-cover" />
            </Card>
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-2xl">{design.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-400">{design.description}</p>
                <div className="text-xs uppercase tracking-widest text-neon-cyan">{design.style}</div>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <Link href="/demo/generator">
                    <Button className="w-full">Generate Similar</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  )
}
