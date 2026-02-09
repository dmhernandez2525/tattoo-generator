'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import {
  Home,
  Wand2,
  Image,
  Calculator,
  Menu,
  X,
  Palette,
  LogOut,
} from 'lucide-react';
import type { Route } from 'next';

type NavItem = {
  name: string;
  href: Route;
  icon: LucideIcon;
};

const tabItems: NavItem[] = [
  { name: 'Home', href: '/demo' as Route, icon: Home },
  { name: 'Generator', href: '/demo/generator' as Route, icon: Wand2 },
  { name: 'Gallery', href: '/demo/gallery' as Route, icon: Image },
  { name: 'Machine', href: '/demo/machine' as Route, icon: Calculator },
];

const menuItems: NavItem[] = [
  { name: 'Demo Home', href: '/demo' as Route, icon: Home },
  { name: 'Design Studio', href: '/demo/generator' as Route, icon: Wand2 },
  { name: 'Gallery', href: '/demo/gallery' as Route, icon: Image },
  { name: 'Machine', href: '/demo/machine' as Route, icon: Calculator },
  { name: 'Styles', href: '/demo/generator?style=Cyberpunk' as Route, icon: Palette },
];

export function DemoBottomNav() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/demo') return pathname === '/demo';
    const base = href.split('?')[0] ?? href;
    return pathname.startsWith(base);
  };

  const firstTwo = tabItems.slice(0, 2);
  const lastTwo = tabItems.slice(2);

  return (
    <>
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {isMenuOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-dark border-t border-white/10 rounded-t-3xl animate-slide-up max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-lg text-white tracking-wider">NAVIGATE</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl transition-colors',
                    isActive(item.href)
                      ? 'bg-neon-purple/20 text-neon-purple'
                      : 'text-slate-400 hover:bg-white/5'
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4">
              <Link
                href={'/' as Route}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-white/5 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="text-sm font-medium">Exit Demo</span>
              </Link>
            </div>
          </div>
          <div className="pb-[env(safe-area-inset-bottom)]" />
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-bg-dark/95 backdrop-blur-md border-t border-white/10">
        <div className="flex items-center justify-around h-16 px-2">
          {firstTwo.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 min-w-[3.5rem] py-1 transition-colors',
                  active ? 'text-neon-purple' : 'text-slate-500'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan text-white shadow-[0_0_20px_rgba(176,38,255,0.4)]"
          >
            <Menu className="h-6 w-6" />
          </button>

          {lastTwo.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 min-w-[3.5rem] py-1 transition-colors',
                  active ? 'text-neon-cyan' : 'text-slate-500'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="pb-[env(safe-area-inset-bottom)]" />
      </nav>
    </>
  );
}
