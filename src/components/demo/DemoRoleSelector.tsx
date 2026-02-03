'use client'

import Link from 'next/link'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Brush, Building2 } from 'lucide-react'

type DemoRole = {
  id: string
  title: string
  description: string
  icon: JSX.Element
  href: string
}

const demoRoles: DemoRole[] = [
  {
    id: 'user',
    title: 'Collector',
    description: 'Explore designs, generate concepts, and build your collection.',
    icon: <User className="w-6 h-6 text-neon-cyan" />,
    href: '/demo',
  },
  {
    id: 'artist',
    title: 'Artist',
    description: 'Showcase styles, generate client-ready concepts, and export stencils.',
    icon: <Brush className="w-6 h-6 text-neon-purple" />,
    href: '/demo',
  },
  {
    id: 'studio',
    title: 'Studio',
    description: 'Preview multi-client workflows and portfolio-ready exports.',
    icon: <Building2 className="w-6 h-6 text-neon-cyan" />,
    href: '/demo',
  },
]

export function DemoRoleSelector() {
  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-12">
      <div className="w-full max-w-4xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-display font-bold text-white tracking-widest">DEMO MODE</h1>
          <p className="text-slate-300">Choose a role to explore the demo experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoRoles.map((role) => (
            <Card key={role.id} variant="glass" className="flex flex-col">
              <CardHeader className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                  {role.icon}
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Link href={role.href} className="block">
                  <Button className="w-full">Enter Demo</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
