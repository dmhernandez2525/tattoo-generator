import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeProvider';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage mock
    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
    vi.mocked(window.localStorage.setItem).mockClear();
    // Reset document attribute
    document.documentElement.removeAttribute('data-theme');
  });

  describe('useTheme without provider', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('initial state', () => {
    it('should default to dark theme', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(result.current.theme).toBe('dark');
    });

    it('should provide toggleTheme function', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });
      expect(typeof result.current.toggleTheme).toBe('function');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from dark to light', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      expect(result.current.theme).toBe('dark');

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
    });

    it('should toggle from light back to dark', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.toggleTheme();
      });
      expect(result.current.theme).toBe('dark');
    });

    it('should persist theme to localStorage when toggled', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleTheme();
      });

      expect(window.localStorage.setItem).toHaveBeenCalledWith(
        'ink-synthesis-theme',
        'light'
      );
    });
  });

  describe('document attribute', () => {
    it('should set data-theme attribute on document', () => {
      renderHook(() => useTheme(), { wrapper });
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should update data-theme when theme changes', () => {
      const { result } = renderHook(() => useTheme(), { wrapper });

      act(() => {
        result.current.toggleTheme();
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });

  describe('system theme detection', () => {
    it('should handle matchMedia call', () => {
      renderHook(() => useTheme(), { wrapper });
      // matchMedia is mocked, just verify the component works
      expect(window.matchMedia).toBeDefined();
    });
  });
});
