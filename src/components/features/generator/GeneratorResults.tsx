'use client';

import { Card } from '@/components/ui/card';
import type { TattooStyle } from '@/hooks/use-tattoo-generator';
import { Download, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratedImage {
    id: string;
    url: string;
    prompt: string;
    style: TattooStyle;
}

interface GeneratorResultsProps {
    images: GeneratedImage[];
}

export function GeneratorResults({ images }: GeneratorResultsProps) {
    if (images.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-20 duration-700">
            {images.map((img, idx) => (
                <Card key={img.id} variant="glass" padding="none" className="group overflow-hidden relative aspect-square">
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                         {/* In a real app, this would be the <img> tag */}
                         <div className="text-center p-6">
                            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-black absolute inset-0 -z-10" />
                            <p className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white/20 to-white/5 absolute top-4 left-4">
                                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                            </p>
                            <img src={img.url} alt={img.prompt} className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                         </div>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Actions */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-between gap-2">
                        <div className="flex gap-2">
                             <Button size="icon" variant="outline" className="h-8 w-8 rounded-full border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-black">
                                <Download className="w-4 h-4" />
                             </Button>
                             <Button size="icon" variant="outline" className="h-8 w-8 rounded-full">
                                <Share2 className="w-4 h-4" />
                             </Button>
                        </div>
                         <Button size="sm" variant="default" className="text-xs bg-neon-purple/80 hover:bg-neon-purple">
                            <Printer className="w-3 h-3 mr-2" /> IMPRINT
                         </Button>
                    </div>
                    
                    {/* Style Tag */}
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest text-white/70 border border-white/10">
                        {img.style}
                    </div>
                </Card>
            ))}
        </div>
    );
}
