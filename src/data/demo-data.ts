import type { TattooStyle } from '@/hooks/use-tattoo-generator';

export interface DemoDesign {
  id: string;
  name: string;
  prompt: string;
  style: TattooStyle;
  imageUrl: string;
  description: string;
  tags: string[];
  createdAt: string;
  popularity: number;
}

export interface DemoCollection {
  id: string;
  name: string;
  description: string;
  designs: DemoDesign[];
}

// Sample tattoo designs showcasing different styles
export const DEMO_DESIGNS: DemoDesign[] = [
  {
    id: 'demo-1',
    name: 'Neon Dragon',
    prompt: 'A cyberpunk dragon with neon circuitry flowing through its scales',
    style: 'Cyberpunk',
    imageUrl: 'https://placehold.co/400x400/0a0a1f/00f3ff?text=Neon+Dragon',
    description: 'Futuristic dragon design with glowing circuit patterns and holographic accents',
    tags: ['dragon', 'neon', 'futuristic', 'sci-fi'],
    createdAt: '2025-01-15T10:30:00Z',
    popularity: 98,
  },
  {
    id: 'demo-2',
    name: 'Classic Rose',
    prompt: 'Traditional American rose with bold outlines and vibrant colors',
    style: 'Traditional',
    imageUrl: 'https://placehold.co/400x400/1a0a0f/ff3366?text=Classic+Rose',
    description: 'Timeless rose design in the American traditional style with bold black outlines',
    tags: ['rose', 'flower', 'classic', 'bold'],
    createdAt: '2025-01-14T14:20:00Z',
    popularity: 92,
  },
  {
    id: 'demo-3',
    name: 'Infinity Wave',
    prompt: 'Minimalist wave forming an infinity symbol',
    style: 'Minimalist',
    imageUrl: 'https://placehold.co/400x400/0f0f0f/ffffff?text=Infinity+Wave',
    description: 'Clean, single-line wave design that flows into an infinity symbol',
    tags: ['wave', 'infinity', 'simple', 'line-art'],
    createdAt: '2025-01-13T09:45:00Z',
    popularity: 87,
  },
  {
    id: 'demo-4',
    name: 'Sacred Geometry Wolf',
    prompt: 'Wolf portrait composed of geometric shapes and sacred geometry patterns',
    style: 'Geometric',
    imageUrl: 'https://placehold.co/400x400/1a1a2f/b026ff?text=Geo+Wolf',
    description: 'Wolf head created entirely from interconnected geometric shapes and patterns',
    tags: ['wolf', 'geometric', 'sacred', 'symmetry'],
    createdAt: '2025-01-12T16:00:00Z',
    popularity: 95,
  },
  {
    id: 'demo-5',
    name: 'Koi Splash',
    prompt: 'Koi fish with watercolor splashes in orange and blue tones',
    style: 'Watercolor',
    imageUrl: 'https://placehold.co/400x400/0f1a2f/ff9500?text=Koi+Splash',
    description: 'Vibrant koi fish with flowing watercolor effects and color bleeds',
    tags: ['koi', 'fish', 'watercolor', 'colorful'],
    createdAt: '2025-01-11T11:30:00Z',
    popularity: 90,
  },
  {
    id: 'demo-6',
    name: 'Warrior Spirit',
    prompt: 'Bold tribal warrior mask with traditional Polynesian patterns',
    style: 'Tribal',
    imageUrl: 'https://placehold.co/400x400/0a0a0a/00f3ff?text=Warrior+Spirit',
    description: 'Powerful tribal mask design inspired by Polynesian warrior traditions',
    tags: ['tribal', 'mask', 'polynesian', 'warrior'],
    createdAt: '2025-01-10T13:15:00Z',
    popularity: 88,
  },
  {
    id: 'demo-7',
    name: 'Hannya Fury',
    prompt: 'Japanese Hannya mask with cherry blossoms and waves',
    style: 'Japanese',
    imageUrl: 'https://placehold.co/400x400/1f0a1a/ff3366?text=Hannya+Fury',
    description: 'Traditional Hannya demon mask surrounded by sakura petals and ocean waves',
    tags: ['hannya', 'japanese', 'demon', 'traditional'],
    createdAt: '2025-01-09T08:00:00Z',
    popularity: 96,
  },
  {
    id: 'demo-8',
    name: 'Cyber Samurai',
    prompt: 'Futuristic samurai with holographic armor and energy katana',
    style: 'Cyberpunk',
    imageUrl: 'https://placehold.co/400x400/0a0a1f/b026ff?text=Cyber+Samurai',
    description: 'Next-gen samurai warrior with augmented reality HUD and plasma weapons',
    tags: ['samurai', 'cyberpunk', 'armor', 'futuristic'],
    createdAt: '2025-01-08T17:45:00Z',
    popularity: 94,
  },
  {
    id: 'demo-9',
    name: 'Phoenix Rising',
    prompt: 'Elegant phoenix with geometric feathers and flame patterns',
    style: 'Geometric',
    imageUrl: 'https://placehold.co/400x400/1a0f0a/ff6600?text=Phoenix+Rising',
    description: 'Majestic phoenix constructed from triangular shapes and gradient flames',
    tags: ['phoenix', 'bird', 'fire', 'geometric'],
    createdAt: '2025-01-07T12:30:00Z',
    popularity: 91,
  },
  {
    id: 'demo-10',
    name: 'Mountain Serenity',
    prompt: 'Minimalist mountain range with single line sun',
    style: 'Minimalist',
    imageUrl: 'https://placehold.co/400x400/0f0f1a/ffffff?text=Mountain+Sun',
    description: 'Peaceful mountain landscape reduced to essential geometric lines',
    tags: ['mountain', 'nature', 'simple', 'landscape'],
    createdAt: '2025-01-06T10:00:00Z',
    popularity: 85,
  },
  {
    id: 'demo-11',
    name: 'Tiger Spirit',
    prompt: 'Traditional Japanese tiger with bamboo and wind elements',
    style: 'Japanese',
    imageUrl: 'https://placehold.co/400x400/1a1a0f/ff9500?text=Tiger+Spirit',
    description: 'Fierce tiger design in traditional Japanese irezumi style',
    tags: ['tiger', 'japanese', 'bamboo', 'traditional'],
    createdAt: '2025-01-05T14:20:00Z',
    popularity: 93,
  },
  {
    id: 'demo-12',
    name: 'Galaxy Butterfly',
    prompt: 'Butterfly wings filled with cosmic nebula and stars',
    style: 'Watercolor',
    imageUrl: 'https://placehold.co/400x400/0f0a1f/b026ff?text=Galaxy+Butterfly',
    description: 'Ethereal butterfly with wings that contain entire galaxies',
    tags: ['butterfly', 'space', 'cosmic', 'colorful'],
    createdAt: '2025-01-04T09:15:00Z',
    popularity: 89,
  },
];

// Curated collections for demo
export const DEMO_COLLECTIONS: DemoCollection[] = [
  {
    id: 'collection-popular',
    name: 'Most Popular',
    description: 'Our highest-rated designs loved by the community',
    designs: DEMO_DESIGNS.filter(d => d.popularity >= 93),
  },
  {
    id: 'collection-japanese',
    name: 'Japanese Masters',
    description: 'Traditional and modern Japanese-inspired designs',
    designs: DEMO_DESIGNS.filter(d => d.style === 'Japanese' || d.tags.includes('japanese')),
  },
  {
    id: 'collection-futuristic',
    name: 'Future Forward',
    description: 'Cyberpunk and sci-fi inspired tattoo concepts',
    designs: DEMO_DESIGNS.filter(d => d.style === 'Cyberpunk'),
  },
  {
    id: 'collection-nature',
    name: 'Nature & Wildlife',
    description: 'Designs inspired by the natural world',
    designs: DEMO_DESIGNS.filter(d =>
      d.tags.some(t => ['dragon', 'wolf', 'phoenix', 'tiger', 'koi', 'butterfly', 'mountain', 'wave'].includes(t))
    ),
  },
];

// Style presets for customization demo
export interface StylePreset {
  id: string;
  name: string;
  style: TattooStyle;
  description: string;
  samplePrompts: string[];
  characteristics: string[];
}

export const STYLE_PRESETS: StylePreset[] = [
  {
    id: 'preset-cyberpunk',
    name: 'Cyberpunk',
    style: 'Cyberpunk',
    description: 'Neon-lit, futuristic designs with circuit patterns and holographic elements',
    samplePrompts: [
      'A robotic geisha with neon circuitry',
      'Cyborg skull with glowing eye implants',
      'Holographic snake wrapped around a circuit board',
    ],
    characteristics: ['Neon colors', 'Circuit patterns', 'Holographic effects', 'Tech fusion'],
  },
  {
    id: 'preset-traditional',
    name: 'Traditional',
    style: 'Traditional',
    description: 'Classic American style with bold lines and limited color palette',
    samplePrompts: [
      'Anchor with rope and banner',
      'Eagle clutching a heart',
      'Dagger through a rose',
    ],
    characteristics: ['Bold outlines', 'Limited palette', 'Classic motifs', 'Solid fills'],
  },
  {
    id: 'preset-minimalist',
    name: 'Minimalist',
    style: 'Minimalist',
    description: 'Clean, simple designs with single-line work and negative space',
    samplePrompts: [
      'Single-line cat silhouette',
      'Tiny constellation pattern',
      'Abstract face outline',
    ],
    characteristics: ['Single lines', 'Negative space', 'Subtle detail', 'Clean aesthetic'],
  },
  {
    id: 'preset-geometric',
    name: 'Geometric',
    style: 'Geometric',
    description: 'Precision-based designs using shapes, patterns, and sacred geometry',
    samplePrompts: [
      'Mandala with intricate patterns',
      'Geometric lion portrait',
      'Sacred geometry eye design',
    ],
    characteristics: ['Precise shapes', 'Symmetry', 'Pattern work', 'Sacred symbols'],
  },
  {
    id: 'preset-watercolor',
    name: 'Watercolor',
    style: 'Watercolor',
    description: 'Fluid, painterly designs with color splashes and soft edges',
    samplePrompts: [
      'Watercolor hummingbird in flight',
      'Abstract color splash portrait',
      'Dreamscape with bleeding colors',
    ],
    characteristics: ['Color bleeds', 'Soft edges', 'Paint splashes', 'Gradient flows'],
  },
  {
    id: 'preset-tribal',
    name: 'Tribal',
    style: 'Tribal',
    description: 'Bold black designs inspired by Polynesian and indigenous cultures',
    samplePrompts: [
      'Full sleeve tribal pattern',
      'Tribal sun with intricate details',
      'Maori-inspired arm band',
    ],
    characteristics: ['Bold black', 'Flowing curves', 'Cultural motifs', 'Negative space'],
  },
  {
    id: 'preset-japanese',
    name: 'Japanese',
    style: 'Japanese',
    description: 'Traditional irezumi-inspired designs with classic Japanese imagery',
    samplePrompts: [
      'Koi fish with lotus flowers',
      'Dragon among clouds',
      'Geisha with cherry blossoms',
    ],
    characteristics: ['Classic imagery', 'Background waves', 'Color gradients', 'Flowing composition'],
  },
];

// Machine calibration presets for demo
export interface CalibrationPreset {
  id: string;
  name: string;
  voltage: number;
  frequency: number;
  depth: number;
  description: string;
  bestFor: string[];
}

export const CALIBRATION_PRESETS: CalibrationPreset[] = [
  {
    id: 'preset-lining',
    name: 'Fine Lining',
    voltage: 7.5,
    frequency: 120,
    depth: 1.0,
    description: 'Precise settings for crisp, thin outlines',
    bestFor: ['Outlines', 'Fine details', 'Single-needle work'],
  },
  {
    id: 'preset-shading',
    name: 'Smooth Shading',
    voltage: 6.5,
    frequency: 90,
    depth: 1.5,
    description: 'Gentle settings for gradual color transitions',
    bestFor: ['Shading', 'Gradients', 'Soft fills'],
  },
  {
    id: 'preset-packing',
    name: 'Color Packing',
    voltage: 8.5,
    frequency: 100,
    depth: 2.0,
    description: 'Powerful settings for solid color saturation',
    bestFor: ['Solid fills', 'Bold colors', 'Traditional style'],
  },
  {
    id: 'preset-dotwork',
    name: 'Dotwork',
    voltage: 5.5,
    frequency: 60,
    depth: 0.8,
    description: 'Light, controlled settings for stippling effects',
    bestFor: ['Stippling', 'Mandala work', 'Geometric patterns'],
  },
];
