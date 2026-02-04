'use client';

import Link from 'next/link';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useDemoContext } from '@/contexts/DemoContext';
import { Wand2, Zap, Calculator, Disc, Palette, Star, ArrowRight, Eye } from 'lucide-react';

export function DemoHome() {
  const { getPopularDesigns, stylePresets } = useDemoContext();
  const popularDesigns = getPopularDesigns(4);

  return (
    <Layout className="flex flex-col items-center justify-start min-h-[80vh] py-8">
      {/* Demo Banner */}
      <div className="w-full max-w-4xl mb-8">
        <div className="bg-gradient-to-r from-neon-purple/20 via-neon-cyan/10 to-neon-purple/20 border border-neon-cyan/30 rounded-xl p-4 text-center">
          <p className="text-neon-cyan font-medium">
            <Eye className="inline w-4 h-4 mr-2" />
            DEMO MODE - Experience the full interface without an account
          </p>
        </div>
      </div>

      <div className="max-w-4xl w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="space-y-4">
          <h1 className="text-7xl font-black bg-gradient-to-r from-neon-purple via-white to-neon-cyan bg-clip-text text-transparent tracking-tighter drop-shadow-[0_0_30px_rgba(176,38,255,0.4)]">
            INK SYNTHESIS
          </h1>
          <p className="text-slate-300 text-2xl font-light tracking-wide max-w-2xl mx-auto">
            AI-Driven Tattoo Generation & <span className="text-neon-cyan font-semibold">Haptic Imprinting</span>
          </p>
        </div>

        {/* Main Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <Link href="/demo/generator" className="block">
            <Card variant="neon" className="group cursor-pointer hover:scale-[1.02] transition-transform h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Wand2 className="w-6 h-6 text-neon-purple" />
                  Design Studio
                </CardTitle>
                <CardDescription>
                  Generate unique tattoo designs with our AI engine. Describe your vision, choose a style.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 flex items-center justify-center">
                <Zap className="w-16 h-16 text-neon-purple/20 group-hover:text-neon-purple/80 transition-all duration-500" />
              </CardContent>
              <CardFooter>
                <Button className="w-full font-bold tracking-wider" size="lg">
                  TRY GENERATOR
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/demo/machine" className="block">
            <Card variant="default" className="group border-neon-cyan/20 cursor-pointer hover:scale-[1.02] hover:border-neon-cyan/50 transition-all h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-neon-cyan">
                  <Calculator className="w-6 h-6" />
                  Machine Interface
                </CardTitle>
                <CardDescription>
                  Explore the haptic imprinting hardware controls and calibration settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-32 flex items-center justify-center">
                <Disc className="w-16 h-16 text-neon-cyan/20 group-hover:text-neon-cyan/50 transition-all duration-500" />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full font-bold group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan group-hover:border-neon-cyan transition-all">
                  VIEW MACHINE
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Gallery Link */}
        <Link href="/demo/gallery" className="block">
          <Card variant="glass" className="group cursor-pointer hover:bg-white/10 transition-all">
            <CardContent className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <Palette className="w-8 h-8 text-neon-purple" />
                <div className="text-left">
                  <h3 className="text-lg font-bold text-white">Design Gallery</h3>
                  <p className="text-sm text-slate-400">Browse {popularDesigns.length * 3}+ sample designs across all styles</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-neon-cyan group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        </Link>

        {/* Popular Designs Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-neon-cyan" />
              Popular Designs
            </h2>
            <Link href="/demo/gallery">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-neon-cyan">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularDesigns.map((design) => (
              <Link key={design.id} href={`/demo/design/${design.id}`}>
                <Card variant="glass" padding="none" className="group cursor-pointer overflow-hidden aspect-square relative">
                  <img
                    src={design.imageUrl}
                    alt={design.name}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-sm font-bold text-white truncate">{design.name}</p>
                    <p className="text-xs text-neon-cyan uppercase">{design.style}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-white/70">
                    {design.popularity}%
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Style Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-display font-bold text-white">Available Styles</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {stylePresets.map((preset) => (
              <Link key={preset.id} href={`/demo/generator?style=${preset.style}`}>
                <Button
                  variant="outline"
                  className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase hover:bg-neon-purple/10 hover:border-neon-purple hover:text-neon-purple transition-all"
                >
                  {preset.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to Main App */}
        <div className="pt-8 border-t border-white/10">
          <Link href="/">
            <Button variant="ghost" className="text-slate-400 hover:text-white">
              Exit Demo Mode
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
