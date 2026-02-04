'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TATTOO_STYLES, type TattooStyle } from '@/hooks/use-tattoo-generator';
import { Wand2, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneratorInputProps {
  onGenerate: (prompt: string, style: TattooStyle) => Promise<void>;
  isGenerating: boolean;
}

export function GeneratorInput({ onGenerate, isGenerating }: GeneratorInputProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<TattooStyle>('Cyberpunk');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    await onGenerate(prompt, selectedStyle);
  };

  return (
    <Card variant="neon" className="w-full max-w-2xl mx-auto backdrop-blur-2xl">
      <CardContent className="p-6">
        <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 ml-1">Describe your tattoo idea</label>
          <div className="relative">
            <Input 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A robotic geisha with neon circuitry..." 
              className="h-14 pl-4 pr-12 text-lg bg-black/50 border-white/10 focus-visible:ring-neon-cyan/50"
              disabled={isGenerating}
            />
            <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Select Art Style</label>
            <div className="flex flex-wrap gap-2">
                {TATTOO_STYLES.map((style) => (
                    <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        disabled={isGenerating}
                        className={cn(
                            "px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all border",
                            selectedStyle === style 
                                ? "bg-neon-cyan/20 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.3)]" 
                                : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white"
                        )}
                    >
                        {style}
                    </button>
                ))}
            </div>
        </div>

        <Button 
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="w-full h-12 text-lg font-bold tracking-widest relative overflow-hidden group"
            variant="default" // Using default purple neon variant
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
        </form>
      </CardContent>
    </Card>
  );
}
