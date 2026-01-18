# Software Design Document - INK SYNTHESIS

## 1. Overview

### Project Purpose and Goals
INK SYNTHESIS is an AI-driven tattoo generation and haptic imprinting interface application. The project aims to bridge the gap between creative tattoo design and futuristic hardware-based tattoo application technology.

**Primary Goals:**
- Provide an intuitive interface for generating AI-powered tattoo designs from text prompts
- Offer multiple artistic style options for design generation
- Create a conceptual hardware interface for controlling tattoo imprinting machinery
- Deliver a visually immersive cyberpunk/neon aesthetic experience

### Target Users
- Tattoo artists seeking AI-assisted design inspiration
- Technology enthusiasts exploring human-machine interfaces
- Individuals interested in customized tattoo design generation
- Hardware developers working on automated tattooing systems

### Key Features
1. **AI Design Generator** - Text-to-tattoo design generation with multiple style presets
2. **Style Selection** - Seven distinct artistic styles (Cyberpunk, Traditional, Minimalist, Geometric, Watercolor, Tribal, Japanese)
3. **Machine Dashboard** - Hardware control interface with calibration settings
4. **Haptic Matrix Visualization** - Real-time needle matrix simulation
5. **Design Management** - Download, share, and imprint options for generated designs

---

## 2. Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                           INK SYNTHESIS                              │
│                         React Application                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │      HOME       │    │    GENERATOR    │    │     MACHINE     │ │
│  │                 │───►│                 │    │    DASHBOARD    │ │
│  │  - Navigation   │    │  - Prompt Input │    │                 │ │
│  │  - Feature Cards│◄───│  - Style Select │    │  - Calibration  │ │
│  │                 │    │  - Results Grid │    │  - HapticMatrix │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│           │                      │                      │           │
│           └──────────────────────┼──────────────────────┘           │
│                                  ▼                                   │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                        App.tsx                               │   │
│  │            (View State Management + Routing)                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                  │                                   │
│           ┌──────────────────────┼──────────────────────┐           │
│           ▼                      ▼                      ▼           │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐ │
│  │  Layout.tsx     │    │ useTattooGen... │    │  UI Components  │ │
│  │  (Theme/BG)     │    │  (Hook/State)   │    │  (Button, Card) │ │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘ │
│                                                                      │
├─────────────────────────────────────────────────────────────────────┤
│                        Tailwind CSS + Framer Motion                  │
│                              (Styling Layer)                         │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
App
├── Layout
│   ├── Background Effects (fixed position gradients)
│   ├── Grid Pattern Overlay
│   └── Main Content Area
│       │
│       ├── [HOME VIEW]
│       │   ├── Title Section
│       │   └── Feature Cards Grid
│       │       ├── Generator Card
│       │       └── Machine Card
│       │
│       ├── [GENERATOR VIEW]
│       │   ├── Navigation Header
│       │   ├── GeneratorInput
│       │   │   ├── Prompt Input
│       │   │   ├── Style Selector Buttons
│       │   │   └── Generate Button
│       │   └── GeneratorResults
│       │       └── Image Cards (with actions)
│       │
│       └── [MACHINE VIEW]
│           └── MachineDashboard
│               ├── Connection Status Header
│               ├── HapticMatrix (Canvas visualization)
│               ├── Metrics Display
│               └── Calibration Controls
│                   ├── Voltage Slider
│                   ├── Frequency Slider
│                   ├── Depth Slider
│                   └── Imprint/Abort Button
```

### State Management

The application uses React's built-in state management with `useState` hooks. State is managed at appropriate component levels:

| State Location | State Variables | Purpose |
|----------------|-----------------|---------|
| `App.tsx` | `view` | Controls which view is rendered (home/generator/machine) |
| `useTattooGenerator` hook | `isGenerating`, `generatedImages`, `error` | Manages generation state and results |
| `GeneratorInput` | `prompt`, `selectedStyle` | Form input state |
| `MachineDashboard` | `isConnected`, `isPrinting`, `depth`, `speed`, `voltage` | Hardware simulation state |

---

## 3. Component Design

### App Component
**File:** `/src/App.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Root component managing view routing and composition |
| **Props** | None |
| **State** | `view: ViewState` ('home' \| 'generator' \| 'machine') |
| **Behavior** | Renders appropriate view based on state, passes callbacks for navigation |

### Layout Component
**File:** `/src/components/layout/Layout.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Provides consistent page structure with background effects |
| **Props** | `children: React.ReactNode`, `className?: string` |
| **State** | None (presentational) |
| **Behavior** | Renders fixed background effects (gradients, grid overlay), wraps content in main container |

### GeneratorInput Component
**File:** `/src/components/features/generator/GeneratorInput.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Input form for tattoo generation including prompt and style selection |
| **Props** | `onGenerate: (prompt: string, style: TattooStyle) => Promise<void>`, `isGenerating: boolean` |
| **State** | `prompt: string`, `selectedStyle: TattooStyle` |
| **Behavior** | Validates input, triggers generation, displays loading state |

### GeneratorResults Component
**File:** `/src/components/features/generator/GeneratorResults.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Displays grid of generated tattoo images with action buttons |
| **Props** | `images: GeneratedImage[]` |
| **State** | None (presentational) |
| **Behavior** | Renders image cards with hover effects, provides download/share/imprint actions |

### MachineDashboard Component
**File:** `/src/components/features/machine/MachineDashboard.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Hardware control interface with calibration and visualization |
| **Props** | `onBack: () => void` |
| **State** | `isConnected`, `isPrinting`, `depth[]`, `speed[]`, `voltage[]` |
| **Behavior** | Simulates hardware connection, provides slider controls, toggles printing state |

### HapticMatrix Component
**File:** `/src/components/features/machine/HapticMatrix.tsx`

| Aspect | Details |
|--------|---------|
| **Purpose** | Canvas-based visualization of needle matrix activity |
| **Props** | `isActive: boolean`, `intensity: number (0-100)`, `className?: string` |
| **State** | Uses `useRef` for canvas and animation frame |
| **Behavior** | Renders 40x30 grid of needle points, animates based on activity state and intensity |

---

## 4. Generator System Design

### AI Prompt Handling

The generator system is designed with a clean abstraction for future AI integration:

```typescript
// Hook Interface
useTattooGenerator() => {
  generateTattoo: (prompt: string, style: TattooStyle) => Promise<void>,
  isGenerating: boolean,
  generatedImages: GeneratedImage[],
  error: string | null,
  TATTOO_STYLES: TattooStyle[]
}
```

**Current Implementation:**
- Simulates a 3-second generation delay
- Returns placeholder images with style and prompt encoded
- Prepends new results to the image array

**Future AI Integration Points:**
- Replace `setTimeout` with actual API call to AI image generation service
- Add error handling for network/API failures
- Implement rate limiting and queue management

### Style Controls

Seven predefined tattoo styles are available:

| Style | Description |
|-------|-------------|
| Cyberpunk | Futuristic, neon-infused designs |
| Traditional | Classic American tattoo style |
| Minimalist | Clean lines, simple forms |
| Geometric | Mathematical patterns, sacred geometry |
| Watercolor | Soft, flowing color washes |
| Tribal | Bold black patterns, cultural motifs |
| Japanese | Irezumi-inspired imagery |

Style selection is implemented as toggle buttons with visual feedback:
- Active style: Cyan border glow, transparent cyan background
- Inactive style: Muted border, subtle hover effect

### Result Display

Generated images are displayed in a responsive grid:
- Single column on mobile
- Two columns on medium screens
- Three columns on large screens

Each image card features:
- Style tag overlay (top-right)
- Numbered index (top-left)
- Hover-reveal action bar (bottom)
  - Download button
  - Share button
  - Imprint button (connects to machine interface)

---

## 5. Machine Interface Design

### Hardware Connection Concept

The machine interface simulates connection to haptic tattooing hardware:

```
┌─────────────────────────────────────────────┐
│           CONNECTION SEQUENCE               │
├─────────────────────────────────────────────┤
│  1. User clicks "CONNECT HARDWARE"          │
│  2. 1.5s simulated connection delay         │
│  3. Status indicator: RED → GREEN           │
│  4. Display: "SEARCHING..." → "SYSTEM       │
│             ONLINE"                         │
│  5. Controls become fully interactive       │
└─────────────────────────────────────────────┘
```

### Haptic Matrix Visualization

The HapticMatrix component renders a real-time canvas visualization:

**Technical Specifications:**
- Grid size: 40 columns x 30 rows
- Animation: RequestAnimationFrame loop
- Responsive: Auto-resizes with container

**Visual States:**
| State | Appearance |
|-------|------------|
| Inactive | Dim white dots (1px radius) |
| Active | Cyan glowing circles with variable intensity |

**Activation Algorithm:**
```typescript
// Noise-based pattern generation
const noise = Math.sin(i * 0.2 + frame * 0.1) * Math.cos(j * 0.2 + frame * 0.1);
const active = Math.random() < (intensity / 100) * 0.5 + (noise * 0.2);
```

### Control Interface

Three calibration sliders control machine parameters:

| Parameter | Range | Unit | Default |
|-----------|-------|------|---------|
| Voltage | 4.0 - 12.0 | V | 7.5 |
| Frequency | 0 - 150 | Hz | 85 |
| Needle Depth | 0.1 - 4.0 | mm | 1.2 |

**Metrics Display (during active printing):**
- Active Needles: 1,024
- Pressure: 450g
- Temperature: 34C (constant)

---

## 6. Data Flow

### User Interaction Flow

```
┌──────────────┐
│  User Opens  │
│     App      │
└──────┬───────┘
       ▼
┌──────────────┐    Select     ┌──────────────┐
│  Home View   │───────────────►│  Generator   │
│              │   Generator    │     View     │
└──────┬───────┘               └──────┬───────┘
       │                               │
       │ Select                        │ Enter Prompt
       │ Machine                       │ Select Style
       ▼                               │ Click Generate
┌──────────────┐                      ▼
│   Machine    │               ┌──────────────┐
│  Dashboard   │               │  Generation  │
└──────────────┘               │   Process    │
                               └──────┬───────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │   Results    │
                               │   Display    │
                               └──────────────┘
```

### Generation Pipeline

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User Input │────►│   Validate  │────►│  Set State  │
│   (prompt)  │     │   (prompt)  │     │ isGenerating│
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
     ┌─────────────────────────────────────────┘
     ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Call API   │────►│   Create    │────►│   Update    │
│ (simulated) │     │   Image     │     │   State     │
└─────────────┘     │   Object    │     │generatedImg │
                    └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │  Re-render  │
                                        │   Results   │
                                        └─────────────┘
```

---

## 7. UI/UX Design

### Theme System (Neon/Cyberpunk Aesthetic)

**Color Palette:**
| Color | Hex Value | Usage |
|-------|-----------|-------|
| Neon Purple | `#b026ff` | Primary accent, buttons, borders |
| Neon Cyan | `#00f3ff` | Secondary accent, highlights, active states |
| Background Dark | `#0a0a0f` | Base background |
| White variations | 5-20% opacity | Cards, borders, text |

**Typography:**
| Font | Usage |
|------|-------|
| Orbitron | Display headings, titles, buttons |
| Inter | Body text, descriptions, labels |

**CSS Custom Properties (defined in index.css):**
```css
@theme {
  --color-neon-purple: #b026ff;
  --color-neon-cyan: #00f3ff;
  --color-bg-dark: #0a0a0f;
  --font-sans: 'Inter', sans-serif;
  --font-display: 'Orbitron', sans-serif;
}
```

### Animation Approach

**Tailwind Animate-In Classes:**
- `fade-in` - Opacity transition
- `slide-in-from-bottom-5` - Entry from below
- `zoom-in-95` - Slight scale up on entry

**Custom Animations:**
- `pulse-slow` - 4s background gradient pulse
- Button hover: `scale-95` on active
- Icon hover: `rotate-12` transform

**Framer Motion Integration:**
- Available for complex animations (imported but minimally used currently)
- Can be extended for page transitions, drag interactions

### Responsive Design

Breakpoint strategy using Tailwind defaults:

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default | < 768px | Single column, stacked layouts |
| `md` | >= 768px | Two-column grids |
| `lg` | >= 1024px | Three-column results, side-by-side panels |

Component-specific responsive behavior:
- Home cards: 1 → 2 columns at `md`
- Results grid: 1 → 2 → 3 columns
- Machine dashboard: Stacked → 2/3 split at `lg`

---

## 8. Dependencies

### Core Framework

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI component library |
| react-dom | ^19.2.0 | DOM rendering |
| typescript | ~5.9.3 | Type safety |
| vite | ^7.2.4 | Build tool and dev server |

### UI Libraries

| Package | Purpose |
|---------|---------|
| @radix-ui/react-slider | Accessible slider primitive for calibration controls |
| @radix-ui/react-slot | Polymorphic component composition |
| lucide-react | Icon library (Wand2, Zap, Power, etc.) |
| framer-motion | Animation library (available for future use) |

### Styling

| Package | Purpose |
|---------|---------|
| tailwindcss | Utility-first CSS framework |
| @tailwindcss/vite | Vite integration for Tailwind |
| class-variance-authority | Variant-based component styling |
| clsx | Conditional class merging |
| tailwind-merge | Intelligent Tailwind class deduplication |

### Development Tools

| Package | Purpose |
|---------|---------|
| @vitejs/plugin-react | React support for Vite |
| eslint | Code linting |
| eslint-plugin-react-hooks | React hooks linting rules |
| eslint-plugin-react-refresh | Fast refresh support |

---

## 9. Testing Strategy

### Test Types and Coverage Goals

**Unit Testing (Target: 80% coverage)**
- Utility functions (`lib/utils.ts`)
- Custom hooks (`useTattooGenerator`)
- Individual component rendering

**Component Testing (Target: 70% coverage)**
- UI primitives (Button, Card, Input, Slider)
- Feature components with mock data
- User interaction flows

**Integration Testing (Target: 60% coverage)**
- View transitions
- Generator input → results flow
- Machine dashboard state management

### Recommended Test Framework Setup

```bash
# Suggested dependencies (not yet installed)
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Test Structure:**
```
src/
├── __tests__/
│   ├── components/
│   │   ├── ui/
│   │   └── features/
│   ├── hooks/
│   └── integration/
```

### Key Test Scenarios

1. **Generator Input**
   - Renders with default state
   - Disables submit when prompt is empty
   - Shows loading state during generation
   - Calls onGenerate with correct arguments

2. **Generator Results**
   - Returns null for empty array
   - Renders correct number of images
   - Displays style tags correctly

3. **HapticMatrix**
   - Creates canvas element
   - Responds to isActive prop changes
   - Intensity affects visual output

4. **useTattooGenerator Hook**
   - Manages generating state correctly
   - Accumulates generated images
   - Handles concurrent generation calls

---

## 10. Future Considerations

### AI Integration Plans

**Phase 1: API Integration**
- Connect to image generation API (Stable Diffusion, DALL-E, Midjourney)
- Implement prompt engineering for tattoo-specific results
- Add style-specific prompt modifiers

**Phase 2: Advanced Features**
- Image-to-image refinement
- Negative prompts for exclusions
- Seed control for reproducibility
- History and favorites system

**Phase 3: Enhancement Pipeline**
- Automatic line art conversion
- Stencil-ready output generation
- Size and placement preview on body model

### Hardware Implementation Roadmap

**Phase 1: Protocol Design**
- Define communication protocol (WebSocket/Serial)
- Create hardware abstraction layer
- Implement connection state machine

**Phase 2: Calibration System**
- Real sensor data integration
- Auto-calibration routines
- Safety interlock systems

**Phase 3: Print Pipeline**
- Design vectorization
- Path optimization
- Real-time feedback visualization

### Planned Improvements

**User Experience:**
- [ ] Add user accounts and saved designs
- [ ] Implement design editing tools
- [ ] Add placement preview on body templates
- [ ] Create sharing and gallery features

**Technical:**
- [ ] Add comprehensive test suite
- [ ] Implement proper routing with react-router-dom
- [ ] Add state persistence (localStorage/IndexedDB)
- [ ] Implement proper error boundaries

**Performance:**
- [ ] Lazy load heavy components
- [ ] Implement virtual scrolling for large result sets
- [ ] Optimize canvas rendering for mobile
- [ ] Add PWA support for offline access

**Accessibility:**
- [ ] Add ARIA labels to interactive elements
- [ ] Implement keyboard navigation
- [ ] Add high contrast mode option
- [ ] Ensure screen reader compatibility

---

## Appendix

### File Structure Reference

```
tattoo-generator/
├── public/                    # Static assets
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── generator/
│   │   │   │   ├── GeneratorInput.tsx
│   │   │   │   └── GeneratorResults.tsx
│   │   │   └── machine/
│   │   │       ├── HapticMatrix.tsx
│   │   │       └── MachineDashboard.tsx
│   │   ├── layout/
│   │   │   └── Layout.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── slider.tsx
│   ├── hooks/
│   │   └── use-tattoo-generator.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### TypeScript Types Reference

```typescript
// View State
type ViewState = 'home' | 'generator' | 'machine';

// Tattoo Styles
type TattooStyle =
  | 'Cyberpunk'
  | 'Traditional'
  | 'Minimalist'
  | 'Geometric'
  | 'Watercolor'
  | 'Tribal'
  | 'Japanese';

// Generated Image
interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: TattooStyle;
}
```
