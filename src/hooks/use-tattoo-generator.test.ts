import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTattooGenerator, TATTOO_STYLES, type TattooStyle } from './use-tattoo-generator';

describe('useTattooGenerator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('TATTOO_STYLES constant', () => {
    it('should export all 7 tattoo styles', () => {
      expect(TATTOO_STYLES).toHaveLength(7);
    });

    it('should contain specific styles', () => {
      expect(TATTOO_STYLES).toContain('Cyberpunk');
      expect(TATTOO_STYLES).toContain('Traditional');
      expect(TATTOO_STYLES).toContain('Minimalist');
      expect(TATTOO_STYLES).toContain('Geometric');
      expect(TATTOO_STYLES).toContain('Watercolor');
      expect(TATTOO_STYLES).toContain('Tribal');
      expect(TATTOO_STYLES).toContain('Japanese');
    });
  });

  describe('initial state', () => {
    it('should have isGenerating set to false initially', () => {
      const { result } = renderHook(() => useTattooGenerator());
      expect(result.current.isGenerating).toBe(false);
    });

    it('should have empty generatedImages array initially', () => {
      const { result } = renderHook(() => useTattooGenerator());
      expect(result.current.generatedImages).toEqual([]);
    });

    it('should have null error initially', () => {
      const { result } = renderHook(() => useTattooGenerator());
      expect(result.current.error).toBeNull();
    });

    it('should return TATTOO_STYLES in the state', () => {
      const { result } = renderHook(() => useTattooGenerator());
      expect(result.current.TATTOO_STYLES).toEqual(TATTOO_STYLES);
    });
  });

  describe('generateTattoo', () => {
    it('should set isGenerating to true when generating', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('Test prompt', 'Cyberpunk');
      });

      expect(result.current.isGenerating).toBe(true);
    });

    it('should set isGenerating to false after generation completes', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('Test prompt', 'Cyberpunk');
      });

      expect(result.current.isGenerating).toBe(true);

      // Fast-forward the timer
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.isGenerating).toBe(false);
    });

    it('should add generated image to the array', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('A dragon design', 'Japanese');
      });

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.generatedImages.length).toBe(1);
      const generatedImage = result.current.generatedImages[0];
      expect(generatedImage?.prompt).toBe('A dragon design');
      expect(generatedImage?.style).toBe('Japanese');
    });

    it('should prepend new images to the array', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      // Generate first image
      act(() => {
        result.current.generateTattoo('First design', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      // Generate second image
      act(() => {
        result.current.generateTattoo('Second design', 'Traditional');
      });
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.generatedImages.length).toBe(2);
      // Most recent should be first
      const first = result.current.generatedImages[0];
      const second = result.current.generatedImages[1];
      expect(first?.prompt).toBe('Second design');
      expect(second?.prompt).toBe('First design');
    });

    it('should generate unique IDs for each image', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('First design', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      act(() => {
        result.current.generateTattoo('Second design', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      const firstImage = result.current.generatedImages[0];
      const secondImage = result.current.generatedImages[1];
      expect(firstImage?.id).not.toBe(secondImage?.id);
    });

    it('should include the style in the generated image URL', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('Dragon', 'Japanese');
      });
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      const image = result.current.generatedImages[0];
      expect(image?.url).toContain('Japanese');
    });

    it('should work with all tattoo styles', async () => {
      for (const style of TATTOO_STYLES) {
        const { result } = renderHook(() => useTattooGenerator());

        act(() => {
          result.current.generateTattoo(`Test ${style}`, style as TattooStyle);
        });
        await act(async () => {
          vi.advanceTimersByTime(3000);
        });

        const generatedImage = result.current.generatedImages[0];
        expect(generatedImage?.style).toBe(style);
      }
    });

    it('should clear error when generating', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      // Initial state should have null error
      expect(result.current.error).toBeNull();

      act(() => {
        result.current.generateTattoo('Test prompt', 'Cyberpunk');
      });

      // Error should still be null during generation
      expect(result.current.error).toBeNull();

      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      // Error should remain null after successful generation
      expect(result.current.error).toBeNull();
    });

    it('should return a promise from generateTattoo', () => {
      const { result } = renderHook(() => useTattooGenerator());

      const promise = result.current.generateTattoo('Test', 'Cyberpunk');
      expect(promise).toBeInstanceOf(Promise);
    });

    it('should resolve the promise after generation', async () => {
      const { result } = renderHook(() => useTattooGenerator());

      act(() => {
        result.current.generateTattoo('Test', 'Cyberpunk');
      });

      // Advance timers to complete generation
      await act(async () => {
        vi.advanceTimersByTime(3000);
      });

      // Verify the promise resolved (no assertion needed - if it resolves, test passes)
      expect(result.current.isGenerating).toBe(false);
      expect(result.current.generatedImages.length).toBe(1);
    });
  });
});
