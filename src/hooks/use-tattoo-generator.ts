'use client';

import { useState } from 'react';

// Mock styles for specialized generation
export type TattooStyle = 'Cyberpunk' | 'Traditional' | 'Minimalist' | 'Geometric' | 'Watercolor' | 'Tribal' | 'Japanese';

export const TATTOO_STYLES: TattooStyle[] = [
  'Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'
];

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: TattooStyle;
}

interface TattooGeneratorState {
  generateTattoo: (prompt: string, style: TattooStyle) => Promise<void>;
  isGenerating: boolean;
  generatedImages: GeneratedImage[];
  error: string | null;
  TATTOO_STYLES: TattooStyle[];
}

export function useTattooGenerator(): TattooGeneratorState {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateTattoo = async (prompt: string, style: TattooStyle): Promise<void> => {
    setIsGenerating(true);
    setError(null);

    // Simulate API delay
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsGenerating(false);
        // Add a mock result
        const newImage: GeneratedImage = {
          id: Math.random().toString(36).substr(2, 9),
          // Using a placeholder image service or a gradient for now
          url: `https://placehold.co/400x400/1a1a1a/FFF?text=${encodeURIComponent(style + ': ' + prompt)}`,
          prompt,
          style
        };
        setGeneratedImages(prev => [newImage, ...prev]);
        resolve();
      }, 3000); // 3 second "generation" time for effect
    });
  };

  return {
    generateTattoo,
    isGenerating,
    generatedImages,
    error,
    TATTOO_STYLES
  };
}
