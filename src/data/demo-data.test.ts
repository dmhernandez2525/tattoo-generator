import { describe, it, expect } from 'vitest';
import {
  DEMO_DESIGNS,
  DEMO_COLLECTIONS,
  STYLE_PRESETS,
  CALIBRATION_PRESETS,
  type DemoDesign,
  type DemoCollection,
  type StylePreset,
  type CalibrationPreset,
} from './demo-data';

describe('Demo Data', () => {
  describe('DEMO_DESIGNS', () => {
    it('should have at least 10 designs', () => {
      expect(DEMO_DESIGNS.length).toBeGreaterThanOrEqual(10);
    });

    it('should have required properties for each design', () => {
      DEMO_DESIGNS.forEach((design: DemoDesign) => {
        expect(design).toHaveProperty('id');
        expect(design).toHaveProperty('name');
        expect(design).toHaveProperty('prompt');
        expect(design).toHaveProperty('style');
        expect(design).toHaveProperty('imageUrl');
        expect(design).toHaveProperty('description');
        expect(design).toHaveProperty('tags');
        expect(design).toHaveProperty('createdAt');
        expect(design).toHaveProperty('popularity');
      });
    });

    it('should have valid popularity scores (0-100)', () => {
      DEMO_DESIGNS.forEach((design) => {
        expect(design.popularity).toBeGreaterThanOrEqual(0);
        expect(design.popularity).toBeLessThanOrEqual(100);
      });
    });

    it('should have unique IDs', () => {
      const ids = DEMO_DESIGNS.map((d) => d.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have valid styles', () => {
      const validStyles = ['Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'];
      DEMO_DESIGNS.forEach((design) => {
        expect(validStyles).toContain(design.style);
      });
    });

    it('should have non-empty tags arrays', () => {
      DEMO_DESIGNS.forEach((design) => {
        expect(Array.isArray(design.tags)).toBe(true);
        expect(design.tags.length).toBeGreaterThan(0);
      });
    });

    it('should have valid ISO date strings for createdAt', () => {
      DEMO_DESIGNS.forEach((design) => {
        const date = new Date(design.createdAt);
        expect(date.toString()).not.toBe('Invalid Date');
      });
    });

    it('should have valid image URLs', () => {
      DEMO_DESIGNS.forEach((design) => {
        expect(design.imageUrl).toMatch(/^https?:\/\//);
      });
    });
  });

  describe('DEMO_COLLECTIONS', () => {
    it('should have at least 3 collections', () => {
      expect(DEMO_COLLECTIONS.length).toBeGreaterThanOrEqual(3);
    });

    it('should have required properties for each collection', () => {
      DEMO_COLLECTIONS.forEach((collection: DemoCollection) => {
        expect(collection).toHaveProperty('id');
        expect(collection).toHaveProperty('name');
        expect(collection).toHaveProperty('description');
        expect(collection).toHaveProperty('designs');
      });
    });

    it('should have unique IDs', () => {
      const ids = DEMO_COLLECTIONS.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have designs that exist in DEMO_DESIGNS', () => {
      const allDesignIds = DEMO_DESIGNS.map((d) => d.id);
      DEMO_COLLECTIONS.forEach((collection) => {
        collection.designs.forEach((design) => {
          expect(allDesignIds).toContain(design.id);
        });
      });
    });

    it('should have the popular collection with high-popularity designs', () => {
      const popularCollection = DEMO_COLLECTIONS.find((c) => c.id === 'collection-popular');
      expect(popularCollection).toBeDefined();
      popularCollection?.designs.forEach((design) => {
        expect(design.popularity).toBeGreaterThanOrEqual(93);
      });
    });

    it('should have the Japanese collection with Japanese style designs', () => {
      const japaneseCollection = DEMO_COLLECTIONS.find((c) => c.id === 'collection-japanese');
      expect(japaneseCollection).toBeDefined();
      japaneseCollection?.designs.forEach((design) => {
        const hasJapaneseStyle = design.style === 'Japanese';
        const hasJapaneseTag = design.tags.includes('japanese');
        expect(hasJapaneseStyle || hasJapaneseTag).toBe(true);
      });
    });

    it('should have the futuristic collection with Cyberpunk style designs', () => {
      const futuristicCollection = DEMO_COLLECTIONS.find((c) => c.id === 'collection-futuristic');
      expect(futuristicCollection).toBeDefined();
      futuristicCollection?.designs.forEach((design) => {
        expect(design.style).toBe('Cyberpunk');
      });
    });
  });

  describe('STYLE_PRESETS', () => {
    it('should have 7 style presets', () => {
      expect(STYLE_PRESETS.length).toBe(7);
    });

    it('should have required properties for each preset', () => {
      STYLE_PRESETS.forEach((preset: StylePreset) => {
        expect(preset).toHaveProperty('id');
        expect(preset).toHaveProperty('name');
        expect(preset).toHaveProperty('style');
        expect(preset).toHaveProperty('description');
        expect(preset).toHaveProperty('samplePrompts');
        expect(preset).toHaveProperty('characteristics');
      });
    });

    it('should have unique IDs', () => {
      const ids = STYLE_PRESETS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have at least 3 sample prompts per preset', () => {
      STYLE_PRESETS.forEach((preset) => {
        expect(preset.samplePrompts.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should have at least 3 characteristics per preset', () => {
      STYLE_PRESETS.forEach((preset) => {
        expect(preset.characteristics.length).toBeGreaterThanOrEqual(3);
      });
    });

    it('should cover all tattoo styles', () => {
      const expectedStyles = ['Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'];
      const presetStyles = STYLE_PRESETS.map((p) => p.style);
      expectedStyles.forEach((style) => {
        expect(presetStyles).toContain(style);
      });
    });
  });

  describe('CALIBRATION_PRESETS', () => {
    it('should have 4 calibration presets', () => {
      expect(CALIBRATION_PRESETS.length).toBe(4);
    });

    it('should have required properties for each preset', () => {
      CALIBRATION_PRESETS.forEach((preset: CalibrationPreset) => {
        expect(preset).toHaveProperty('id');
        expect(preset).toHaveProperty('name');
        expect(preset).toHaveProperty('voltage');
        expect(preset).toHaveProperty('frequency');
        expect(preset).toHaveProperty('depth');
        expect(preset).toHaveProperty('description');
        expect(preset).toHaveProperty('bestFor');
      });
    });

    it('should have unique IDs', () => {
      const ids = CALIBRATION_PRESETS.map((p) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should have realistic voltage values (4-12V)', () => {
      CALIBRATION_PRESETS.forEach((preset) => {
        expect(preset.voltage).toBeGreaterThanOrEqual(4);
        expect(preset.voltage).toBeLessThanOrEqual(12);
      });
    });

    it('should have realistic frequency values (0-150Hz)', () => {
      CALIBRATION_PRESETS.forEach((preset) => {
        expect(preset.frequency).toBeGreaterThanOrEqual(0);
        expect(preset.frequency).toBeLessThanOrEqual(150);
      });
    });

    it('should have realistic depth values (0.1-4.0mm)', () => {
      CALIBRATION_PRESETS.forEach((preset) => {
        expect(preset.depth).toBeGreaterThanOrEqual(0.1);
        expect(preset.depth).toBeLessThanOrEqual(4.0);
      });
    });

    it('should have at least 1 bestFor use case per preset', () => {
      CALIBRATION_PRESETS.forEach((preset) => {
        expect(preset.bestFor.length).toBeGreaterThanOrEqual(1);
      });
    });

    it('should have the fine lining preset', () => {
      const liningPreset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-lining');
      expect(liningPreset).toBeDefined();
      expect(liningPreset?.name).toBe('Fine Lining');
    });

    it('should have the shading preset', () => {
      const shadingPreset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-shading');
      expect(shadingPreset).toBeDefined();
      expect(shadingPreset?.name).toBe('Smooth Shading');
    });

    it('should have the color packing preset', () => {
      const packingPreset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-packing');
      expect(packingPreset).toBeDefined();
      expect(packingPreset?.name).toBe('Color Packing');
    });

    it('should have the dotwork preset', () => {
      const dotworkPreset = CALIBRATION_PRESETS.find((p) => p.id === 'preset-dotwork');
      expect(dotworkPreset).toBeDefined();
      expect(dotworkPreset?.name).toBe('Dotwork');
    });
  });
});
