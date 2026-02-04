import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { DemoProvider, useDemoContext } from './DemoContext';
import { DEMO_DESIGNS, STYLE_PRESETS, CALIBRATION_PRESETS } from '@/data/demo-data';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <DemoProvider>{children}</DemoProvider>
);

describe('DemoContext', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useDemoContext without provider', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useDemoContext());
      }).toThrow('useDemoContext must be used within a DemoProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('initial state', () => {
    it('should have isDemo set to true', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.isDemo).toBe(true);
    });

    it('should have selectedDesign as null', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.selectedDesign).toBeNull();
    });

    it('should have empty generatedImages array', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.generatedImages).toEqual([]);
    });

    it('should have default selectedStyle as Cyberpunk', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.selectedStyle).toBe('Cyberpunk');
    });

    it('should have default machine settings', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.machineSettings).toEqual({
        voltage: 7.5,
        frequency: 85,
        depth: 1.2,
      });
    });

    it('should have isGenerating set to false', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.isGenerating).toBe(false);
    });

    it('should have isPrinting set to false', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.isPrinting).toBe(false);
    });

    it('should have isConnected set to true (demo mode)', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.isConnected).toBe(true);
    });

    it('should provide demoDesigns', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.demoDesigns).toEqual(DEMO_DESIGNS);
    });

    it('should provide stylePresets', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.stylePresets).toEqual(STYLE_PRESETS);
    });

    it('should provide calibrationPresets', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      expect(result.current.calibrationPresets).toEqual(CALIBRATION_PRESETS);
    });
  });

  describe('selectDesign', () => {
    it('should select a design', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const design = DEMO_DESIGNS[0];
      if (!design) return;

      act(() => {
        result.current.selectDesign(design);
      });

      expect(result.current.selectedDesign).toEqual(design);
    });

    it('should clear selected design when passed null', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const design = DEMO_DESIGNS[0];
      if (!design) return;

      act(() => {
        result.current.selectDesign(design);
      });

      act(() => {
        result.current.selectDesign(null);
      });

      expect(result.current.selectedDesign).toBeNull();
    });
  });

  describe('setSelectedStyle', () => {
    it('should change the selected style', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.setSelectedStyle('Japanese');
      });

      expect(result.current.selectedStyle).toBe('Japanese');
    });

    it('should work with all tattoo styles', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const styles = ['Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'] as const;

      for (const style of styles) {
        act(() => {
          result.current.setSelectedStyle(style);
        });
        expect(result.current.selectedStyle).toBe(style);
      }
    });
  });

  describe('generateDemoDesign', () => {
    it('should set isGenerating to true when generating', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('Test prompt', 'Cyberpunk');
      });

      expect(result.current.isGenerating).toBe(true);
    });

    it('should set isGenerating to false after generation', async () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('Test prompt', 'Cyberpunk');
      });

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.isGenerating).toBe(false);
    });

    it('should add generated image to array', async () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('Dragon design', 'Japanese');
      });

      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.generatedImages.length).toBe(1);
      const firstImage = result.current.generatedImages[0];
      expect(firstImage?.prompt).toBe('Dragon design');
      expect(firstImage?.style).toBe('Japanese');
    });

    it('should prepend new images', async () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('First', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      act(() => {
        result.current.generateDemoDesign('Second', 'Traditional');
      });
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      const first = result.current.generatedImages[0];
      const second = result.current.generatedImages[1];
      expect(first?.prompt).toBe('Second');
      expect(second?.prompt).toBe('First');
    });

    it('should generate unique IDs', async () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('First', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      // Wait a bit to ensure different timestamp
      await act(async () => {
        vi.advanceTimersByTime(1);
      });

      act(() => {
        result.current.generateDemoDesign('Second', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      const first = result.current.generatedImages[0];
      const second = result.current.generatedImages[1];
      expect(first?.id).not.toBe(second?.id);
    });
  });

  describe('clearGeneratedImages', () => {
    it('should clear all generated images', async () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.generateDemoDesign('Test', 'Cyberpunk');
      });
      await act(async () => {
        vi.advanceTimersByTime(2000);
      });

      expect(result.current.generatedImages.length).toBe(1);

      act(() => {
        result.current.clearGeneratedImages();
      });

      expect(result.current.generatedImages).toEqual([]);
    });
  });

  describe('updateMachineSettings', () => {
    it('should update voltage', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.updateMachineSettings({ voltage: 10 });
      });

      expect(result.current.machineSettings.voltage).toBe(10);
      expect(result.current.machineSettings.frequency).toBe(85);
      expect(result.current.machineSettings.depth).toBe(1.2);
    });

    it('should update frequency', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.updateMachineSettings({ frequency: 100 });
      });

      expect(result.current.machineSettings.frequency).toBe(100);
    });

    it('should update depth', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.updateMachineSettings({ depth: 2.0 });
      });

      expect(result.current.machineSettings.depth).toBe(2.0);
    });

    it('should update multiple settings at once', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.updateMachineSettings({
          voltage: 8,
          frequency: 90,
          depth: 1.5,
        });
      });

      expect(result.current.machineSettings).toEqual({
        voltage: 8,
        frequency: 90,
        depth: 1.5,
      });
    });
  });

  describe('applyCalibrationPreset', () => {
    it('should apply fine lining preset', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const preset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-lining');
      if (!preset) return;

      act(() => {
        result.current.applyCalibrationPreset(preset);
      });

      expect(result.current.machineSettings).toEqual({
        voltage: preset.voltage,
        frequency: preset.frequency,
        depth: preset.depth,
      });
    });

    it('should apply shading preset', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const preset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-shading');
      if (!preset) return;

      act(() => {
        result.current.applyCalibrationPreset(preset);
      });

      expect(result.current.machineSettings).toEqual({
        voltage: preset.voltage,
        frequency: preset.frequency,
        depth: preset.depth,
      });
    });

    it('should apply all calibration presets correctly', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      for (const preset of CALIBRATION_PRESETS) {
        act(() => {
          result.current.applyCalibrationPreset(preset);
        });

        expect(result.current.machineSettings).toEqual({
          voltage: preset.voltage,
          frequency: preset.frequency,
          depth: preset.depth,
        });
      }
    });
  });

  describe('togglePrinting', () => {
    it('should toggle isPrinting from false to true', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      expect(result.current.isPrinting).toBe(false);

      act(() => {
        result.current.togglePrinting();
      });

      expect(result.current.isPrinting).toBe(true);
    });

    it('should toggle isPrinting from true to false', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      act(() => {
        result.current.togglePrinting();
      });

      act(() => {
        result.current.togglePrinting();
      });

      expect(result.current.isPrinting).toBe(false);
    });
  });

  describe('getDesignsByStyle', () => {
    it('should return designs filtered by Cyberpunk style', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getDesignsByStyle('Cyberpunk');
      expect(designs.every((d) => d.style === 'Cyberpunk')).toBe(true);
    });

    it('should return designs filtered by Japanese style', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getDesignsByStyle('Japanese');
      expect(designs.every((d) => d.style === 'Japanese')).toBe(true);
    });

    it('should return designs filtered by each style', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });
      const styles = ['Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'] as const;

      for (const style of styles) {
        const designs = result.current.getDesignsByStyle(style);
        expect(designs.every((d) => d.style === style)).toBe(true);
      }
    });
  });

  describe('getPopularDesigns', () => {
    it('should return default 6 popular designs', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getPopularDesigns();
      expect(designs.length).toBeLessThanOrEqual(6);
    });

    it('should return custom number of popular designs', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getPopularDesigns(3);
      expect(designs.length).toBeLessThanOrEqual(3);
    });

    it('should return designs sorted by popularity descending', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getPopularDesigns(10);
      for (let i = 1; i < designs.length; i++) {
        const prev = designs[i - 1];
        const curr = designs[i];
        if (prev && curr) {
          expect(prev.popularity).toBeGreaterThanOrEqual(curr.popularity);
        }
      }
    });

    it('should return top popular designs', () => {
      const { result } = renderHook(() => useDemoContext(), { wrapper });

      const designs = result.current.getPopularDesigns(1);
      expect(designs.length).toBe(1);

      const allDesigns = [...DEMO_DESIGNS].sort((a, b) => b.popularity - a.popularity);
      const topDesign = allDesigns[0];
      const returnedDesign = designs[0];
      if (topDesign && returnedDesign) {
        expect(returnedDesign.id).toBe(topDesign.id);
      }
    });
  });
});
