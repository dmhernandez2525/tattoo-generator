import React, { createContext, useContext, useState, useCallback } from 'react';
import type { TattooStyle } from '@/hooks/use-tattoo-generator';
import { DEMO_DESIGNS, STYLE_PRESETS, CALIBRATION_PRESETS } from '@/data/demo-data';
import type { DemoDesign, StylePreset, CalibrationPreset } from '@/data/demo-data';

interface GeneratedDemoImage {
  id: string;
  url: string;
  prompt: string;
  style: TattooStyle;
}

interface DemoState {
  isDemo: boolean;
  selectedDesign: DemoDesign | null;
  generatedImages: GeneratedDemoImage[];
  selectedStyle: TattooStyle;
  machineSettings: {
    voltage: number;
    frequency: number;
    depth: number;
  };
  isGenerating: boolean;
  isPrinting: boolean;
  isConnected: boolean;
}

interface DemoContextValue extends DemoState {
  // Navigation
  selectDesign: (design: DemoDesign | null) => void;

  // Generator actions
  setSelectedStyle: (style: TattooStyle) => void;
  generateDemoDesign: (prompt: string, style: TattooStyle) => Promise<void>;
  clearGeneratedImages: () => void;

  // Machine actions
  updateMachineSettings: (settings: Partial<DemoState['machineSettings']>) => void;
  applyCalibrationPreset: (preset: CalibrationPreset) => void;
  togglePrinting: () => void;

  // Data access
  demoDesigns: DemoDesign[];
  stylePresets: StylePreset[];
  calibrationPresets: CalibrationPreset[];
  getDesignsByStyle: (style: TattooStyle) => DemoDesign[];
  getPopularDesigns: (limit?: number) => DemoDesign[];
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>({
    isDemo: true,
    selectedDesign: null,
    generatedImages: [],
    selectedStyle: 'Cyberpunk',
    machineSettings: {
      voltage: 7.5,
      frequency: 85,
      depth: 1.2,
    },
    isGenerating: false,
    isPrinting: false,
    isConnected: true, // Always connected in demo mode
  });

  const selectDesign = useCallback((design: DemoDesign | null) => {
    setState(prev => ({ ...prev, selectedDesign: design }));
  }, []);

  const setSelectedStyle = useCallback((style: TattooStyle) => {
    setState(prev => ({ ...prev, selectedStyle: style }));
  }, []);

  const generateDemoDesign = useCallback(async (prompt: string, style: TattooStyle) => {
    setState(prev => ({ ...prev, isGenerating: true }));

    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newImage: GeneratedDemoImage = {
      id: `demo-gen-${Date.now()}`,
      url: `https://placehold.co/400x400/${getStyleColor(style)}/ffffff?text=${encodeURIComponent(style + ': ' + prompt.slice(0, 20))}`,
      prompt,
      style,
    };

    setState(prev => ({
      ...prev,
      isGenerating: false,
      generatedImages: [newImage, ...prev.generatedImages],
    }));
  }, []);

  const clearGeneratedImages = useCallback(() => {
    setState(prev => ({ ...prev, generatedImages: [] }));
  }, []);

  const updateMachineSettings = useCallback((settings: Partial<DemoState['machineSettings']>) => {
    setState(prev => ({
      ...prev,
      machineSettings: { ...prev.machineSettings, ...settings },
    }));
  }, []);

  const applyCalibrationPreset = useCallback((preset: CalibrationPreset) => {
    setState(prev => ({
      ...prev,
      machineSettings: {
        voltage: preset.voltage,
        frequency: preset.frequency,
        depth: preset.depth,
      },
    }));
  }, []);

  const togglePrinting = useCallback(() => {
    setState(prev => ({ ...prev, isPrinting: !prev.isPrinting }));
  }, []);

  const getDesignsByStyle = useCallback((style: TattooStyle): DemoDesign[] => {
    return DEMO_DESIGNS.filter(d => d.style === style);
  }, []);

  const getPopularDesigns = useCallback((limit = 6): DemoDesign[] => {
    return [...DEMO_DESIGNS]
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }, []);

  const value: DemoContextValue = {
    ...state,
    selectDesign,
    setSelectedStyle,
    generateDemoDesign,
    clearGeneratedImages,
    updateMachineSettings,
    applyCalibrationPreset,
    togglePrinting,
    demoDesigns: DEMO_DESIGNS,
    stylePresets: STYLE_PRESETS,
    calibrationPresets: CALIBRATION_PRESETS,
    getDesignsByStyle,
    getPopularDesigns,
  };

  return (
    <DemoContext.Provider value={value}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemoContext(): DemoContextValue {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemoContext must be used within a DemoProvider');
  }
  return context;
}

// Helper function to get color based on style
function getStyleColor(style: TattooStyle): string {
  const colors: Record<TattooStyle, string> = {
    Cyberpunk: '0a0a1f/00f3ff',
    Traditional: '1a0a0f/ff3366',
    Minimalist: '0f0f0f/ffffff',
    Geometric: '1a1a2f/b026ff',
    Watercolor: '0f1a2f/ff9500',
    Tribal: '0a0a0a/00f3ff',
    Japanese: '1f0a1a/ff3366',
  };
  return colors[style] || '0a0a0f/ffffff';
}
