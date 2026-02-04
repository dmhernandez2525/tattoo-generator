'use client'

import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggleTheme}
      className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-neon-cyan" />
      ) : (
        <Moon className="w-4 h-4 text-neon-purple" />
      )}
    </Button>
  )
}
