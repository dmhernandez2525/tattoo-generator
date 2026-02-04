import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  showThemeToggle?: boolean;
}

export function Layout({ children, className, showThemeToggle = true }: LayoutProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-bg-dark text-white selection:bg-neon-cyan/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-[20%] right-[30%] w-[20%] h-[20%] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Content */}
      <main className={cn("relative z-10 container mx-auto px-4 py-8", className)}>
        {showThemeToggle && (
          <div className="fixed top-6 right-6 z-20">
            <ThemeToggle />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
