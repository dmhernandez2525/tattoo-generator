'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDemoContext } from '@/contexts/DemoContext';
import type { TattooStyle } from '@/hooks/use-tattoo-generator';
import { TATTOO_STYLES } from '@/hooks/use-tattoo-generator';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  Wand2,
  Loader2,
  Sparkles,
  Download,
  Share2,
  Printer,
  Lightbulb,
  Eye,
} from 'lucide-react';

export function DemoGenerator() {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get('style')
  const initialStyle =
    TATTOO_STYLES.find((style) => style === styleParam) ?? 'Cyberpunk'

  const {
    generatedImages,
    isGenerating,
    selectedStyle,
    setSelectedStyle,
    generateDemoDesign,
    stylePresets,
  } = useDemoContext();

  const [prompt, setPrompt] = useState('');

  useEffect(() => {
    if (TATTOO_STYLES.includes(initialStyle)) {
      setSelectedStyle(initialStyle);
    }
  }, [initialStyle, setSelectedStyle]);

  const currentPreset = stylePresets.find((p) => p.style === selectedStyle);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    await generateDemoDesign(prompt, selectedStyle);
  };

  const handleSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-8">
      {/* Demo Banner */}
      <div className="w-full max-w-6xl mb-6">
        <div className="bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg px-4 py-2 text-center">
          <p className="text-neon-cyan text-sm font-medium">
            <Eye className="inline w-4 h-4 mr-2" />
            DEMO MODE - Designs shown are placeholders
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/demo">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back to Demo
            </Button>
          </Link>
          <h2 className="text-2xl font-display font-bold text-white tracking-widest">
            DESIGN STUDIO
          </h2>
          <div className="w-24" />
        </div>

        {/* Generator Input */}
        <div className="flex flex-col items-center">
          <Card variant="neon" className="w-full max-w-2xl mx-auto backdrop-blur-2xl">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Describe your tattoo idea
                </label>
                <div className="relative">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g. A robotic geisha with neon circuitry..."
                    className="h-14 pl-4 pr-12 text-lg bg-black/50 border-white/10 focus-visible:ring-neon-cyan/50"
                    disabled={isGenerating}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                  />
                  <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">
                  Select Art Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {TATTOO_STYLES.map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setSelectedStyle(style)}
                      disabled={isGenerating}
                      className={cn(
                        'px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border',
                        selectedStyle === style
                          ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full h-12 text-lg font-bold tracking-widest relative overflow-hidden group"
                variant="default"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    SYNTHESIZING...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                    GENERATE DESIGN
                  </>
                )}
                {isGenerating && (
                  <div className="absolute bottom-0 left-0 h-1 bg-neon-cyan animate-[loading_2s_ease-in-out_infinite] w-full" />
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Style Info Card */}
          {currentPreset && (
            <Card variant="glass" className="w-full max-w-2xl mx-auto mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-neon-cyan" />
                  {currentPreset.name} Style Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-400">{currentPreset.description}</p>
                <div className="flex flex-wrap gap-2">
                  {currentPreset.characteristics.map((char) => (
                    <span
                      key={char}
                      className="px-2 py-1 bg-white/5 rounded text-xs text-slate-300"
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs text-slate-500 mb-2">Try these prompts:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentPreset.samplePrompts.map((sample) => (
                      <button
                        key={sample}
                        onClick={() => handleSamplePrompt(sample)}
                        className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded-full text-xs text-neon-purple hover:bg-neon-purple/20 transition-colors"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Generated Results */}
          {generatedImages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-20 duration-700">
              {generatedImages.map((img, idx) => (
                <Card
                  key={img.id}
                  variant="glass"
                  padding="none"
                  className="group overflow-hidden relative aspect-square"
                >
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-full h-full bg-gradient-to-br from-slate-800 to-black absolute inset-0 -z-10" />
                      <p className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white/20 to-white/5 absolute top-4 left-4">
                        {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                      </p>
                      <img
                        src={img.url}
                        alt={img.prompt}
                        className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-black"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-full"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Link href="/demo/machine">
                      <Button
                        size="sm"
                        variant="default"
                        className="text-xs bg-neon-purple/80 hover:bg-neon-purple"
                      >
                        <Printer className="w-3 h-3 mr-2" /> IMPRINT
                      </Button>
                    </Link>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest text-white/70 border border-white/10">
                    {img.style}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
