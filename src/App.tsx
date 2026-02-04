'use client'

import { useState } from 'react'
import { Disc, Zap, Wand2, Calculator, ChevronLeft } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { GeneratorInput } from '@/components/features/generator/GeneratorInput'
import { GeneratorResults } from '@/components/features/generator/GeneratorResults'
import { MachineDashboard } from '@/components/features/machine/MachineDashboard'
import { useTattooGenerator } from '@/hooks/use-tattoo-generator'

// Simple view state management for now
type ViewState = 'home' | 'generator' | 'machine'

function App() {
  const [view, setView] = useState<ViewState>('home')
  const { generateTattoo, isGenerating, generatedImages } = useTattooGenerator()

  const renderHome = () => (
    <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="space-y-4">
          <h1 className="text-7xl font-black bg-gradient-to-r from-neon-purple via-white to-neon-cyan bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_30px_rgba(176,38,255,0.4)]">
            INK SYNTHESIS
          </h1>
          <p className="text-slate-300 text-2xl font-light tracking-wide max-w-2xl mx-auto">
            AI-Driven Tattoo Generation & <span className="text-neon-cyan font-semibold">Haptic Imprinting</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Card variant="neon" className="group cursor-pointer hover:scale-[1.02] transition-transform" onClick={() => setView('generator')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Wand2 className="w-6 h-6 text-neon-purple" />
                Generate Design
              </CardTitle>
              <CardDescription>
                Describe your vision. Our neural network will render it in infinite styles.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
               <Zap className="w-16 h-16 text-neon-purple/20 group-hover:text-neon-purple/80 transition-all duration-500" />
            </CardContent>
            <CardFooter>
               <Button className="w-full font-bold tracking-wider" size="lg">
                  ENTER GENERATOR
               </Button>
            </CardFooter>
          </Card>

          <Card variant="default" className="group border-neon-cyan/20 cursor-pointer hover:scale-[1.02] hover:border-neon-cyan/50 transition-all" onClick={() => setView('machine')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-neon-cyan">
                <Calculator className="w-6 h-6" />
                Machine Interface
              </CardTitle>
              <CardDescription>
                Connect to the imprinting hardware to transfer designs to skin.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-32 flex items-center justify-center">
               <Disc className="w-16 h-16 text-neon-cyan/20 group-hover:text-neon-cyan/50 transition-all duration-500" />
            </CardContent>
            <CardFooter>
               <Button variant="outline" className="w-full font-bold group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan group-hover:border-neon-cyan transition-all">
                  CONNECT HARDWARE
               </Button>
            </CardFooter>
          </Card>
        </div>
    </div>
  )

  const renderGenerator = () => (
      <div className="w-full max-w-6xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => setView('home')} className="text-slate-400 hover:text-white">
                  <ChevronLeft className="w-4 h-4 mr-2" /> Back to Home
              </Button>
              <h2 className="text-2xl font-display font-bold text-white tracking-widest">DESIGN STUDIO</h2>
              <div className="w-24" /> {/* Spacer */}
          </div>

          <div className="flex flex-col items-center">
              <GeneratorInput onGenerate={generateTattoo} isGenerating={isGenerating} />
              <GeneratorResults images={generatedImages} />
          </div>
      </div>
  )

  const renderMachine = () => (
      <MachineDashboard onBack={() => setView('home')} />
  )

  return (
    <Layout className="flex flex-col items-center justify-center min-h-[80vh]">
      {view === 'home' && renderHome()}
      {view === 'generator' && renderGenerator()}
      {view === 'machine' && renderMachine()}
    </Layout>
  )
}

export default App
