# Phase 1: MVP - Core Tattoo Generation

## Overview

Build the foundational AI-powered tattoo design generation platform with style presets, stencil-ready export, and basic editing capabilities.

**Duration:** 4-5 weeks
**Goal:** Functional text-to-tattoo generator with professional output quality

---

## Milestones

### M1: Project Foundation (Week 1)

- [ ] Next.js 14 frontend scaffolding with TypeScript
- [ ] Strapi 5 CMS backend setup
- [ ] Express microservice for AI generation
- [ ] PostgreSQL and Redis configuration
- [ ] Docker Compose for local development
- [ ] CI/CD pipeline setup

**Acceptance Criteria:**
- All services running via Docker Compose
- Basic API communication between services
- Development environment documented

### M2: AI Generation Pipeline (Week 1-2)

- [ ] SDXL integration via Replicate/RunPod API
- [ ] Prompt enhancement system for tattoo-specific generation
- [ ] Negative prompt injection for quality control
- [ ] Batch generation (4 variations per request)
- [ ] Generation queue with Redis
- [ ] Fallback to DALL-E 3 for premium tier

**Prompt Enhancement:**
```
User: "dragon around katana"
Enhanced: "A fierce dragon wrapped around a katana, [STYLE_TOKENS],
bold black outlines, professional tattoo design, white background,
stencil ready, high contrast, clean lines"
Negative: "blurry, low quality, distorted, skin texture, photograph,
realistic skin, noise, artifacts, watermark"
```

**Acceptance Criteria:**
- Generation completes in <30 seconds
- 4 variations returned per request
- <5% generation failure rate

### M3: Style Preset System (Week 2)

- [ ] 15+ tattoo-specific style presets:
  - Traditional American
  - Neo-Traditional
  - Japanese Irezumi
  - Blackwork
  - Dotwork
  - Geometric
  - Fine Line/Minimalist
  - Watercolor
  - Realism
  - Tribal
  - Biomechanical
  - Lettering/Script
  - New School
  - Trash Polka
  - Custom/Mixed
- [ ] Style-specific prompt tokens and LoRA selection
- [ ] Style mixing/blending capability
- [ ] Style preview gallery

**Acceptance Criteria:**
- Each style produces visually distinct outputs
- Style mixing works with 2-3 styles
- Preview images available for all styles

### M4: Core Generation UI (Week 2-3)

- [ ] Prompt input with suggestions
- [ ] Style selector grid with previews
- [ ] Generation progress indicator
- [ ] Result gallery with thumbnail view
- [ ] Design detail modal
- [ ] Regeneration with variations

**Acceptance Criteria:**
- Intuitive prompt entry flow
- Clear progress feedback during generation
- Easy comparison of variations

### M5: Post-Processing Pipeline (Week 3)

- [ ] Background removal (rembg)
- [ ] Contrast enhancement for stencil clarity
- [ ] Edge sharpening
- [ ] Real-ESRGAN upscaling to 2048x2048
- [ ] Quality check filter
- [ ] Thumbnail generation

**Acceptance Criteria:**
- Clean transparent backgrounds
- Sharp, high-contrast linework
- Consistent 2048x2048 output resolution

### M6: Export & Stencil Features (Week 3-4)

- [ ] High-resolution PNG export (300 DPI)
- [ ] Stencil-ready format (B&W, high contrast)
- [ ] Thermal printer compatibility (Brother PocketJet)
- [ ] Vector SVG export (line art only)
- [ ] Print-ready PDF generation
- [ ] Multiple size presets (3", 6", 9", 12")

**Export Specifications:**
| Format | Resolution | Use Case |
|--------|------------|----------|
| PNG | 300 DPI | Standard download |
| Stencil PNG | 300 DPI, B&W | Thermal printer |
| SVG | Vector | Line art editing |
| PDF | 300 DPI | Print-ready |

**Acceptance Criteria:**
- Stencil output prints correctly on thermal printers
- Vector export maintains line quality
- Multiple size options work correctly

### M7: User System & Gallery (Week 4)

- [ ] User authentication (email + OAuth)
- [ ] Generation history/gallery
- [ ] Design favoriting and organization
- [ ] Collections/folders
- [ ] Basic sharing features
- [ ] Account settings

**Acceptance Criteria:**
- Users can save and access their designs
- Gallery loads quickly with pagination
- Sharing generates public links

### M8: MVP Polish (Week 4-5)

- [ ] Mobile-responsive design
- [ ] Performance optimization (<3s page load)
- [ ] Error handling and recovery
- [ ] Loading states and feedback
- [ ] Basic analytics integration
- [ ] 80%+ test coverage

**Acceptance Criteria:**
- Works well on mobile devices
- Fast, responsive UI
- Graceful error handling

---

## Technical Requirements

### Generation Cost Targets

| Volume | API Cost | Strategy |
|--------|----------|----------|
| 10K images/mo | $300-400 | Replicate API |
| 50K images/mo | $1,000-1,500 | Hybrid (API + self-hosted) |
| 100K+ images/mo | $700-1,000 | Self-hosted SDXL |

### Performance Targets

| Metric | Target | Maximum |
|--------|--------|---------|
| Generation time | <20s | 30s |
| Page load | <2s | 3s |
| Export time | <5s | 10s |
| API response | <200ms | 500ms |

### Dependencies

```json
{
  "next": "^14.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^4.0.0",
  "@reduxjs/toolkit": "^2.0.0",
  "fabric": "^6.0.0",
  "@replicate/replicate": "^1.0.0",
  "rembg": "^2.0.0",
  "sharp": "^0.33.0"
}
```

---

## Definition of Done

- [ ] All milestones complete
- [ ] 80%+ test coverage
- [ ] Mobile-responsive UI
- [ ] <30s generation time
- [ ] <5% generation failure rate
- [ ] Stencil export works with thermal printers
- [ ] Documentation updated
- [ ] No critical bugs
