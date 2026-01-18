# INK SYNTHESIS - Upgrade Plan

## Overview

This document outlines the modernization roadmap for INK SYNTHESIS. The project is already running a modern stack with React 19, Vite 7, and Tailwind CSS v4. This plan focuses on incremental improvements to tooling, testing, and component architecture.

---

## Current Stack Status

| Technology | Current Version | Target Version | Status |
|------------|-----------------|----------------|--------|
| React | 19.2.0 | 19.x (LTS) | Current |
| Vite | 7.2.4 | 7.x | Current |
| TypeScript | 5.9.3 | 5.9.x | Current |
| Tailwind CSS | 4.1.18 | 4.x | Current |
| Framer Motion | 12.26.2 | 12.x | Current |
| React Router | 7.12.0 | 7.x | Current |
| ESLint | 9.39.1 | 9.x | Current |
| Vitest | 3.1.0 | 3.x | Current |

---

## Upgrade Phases

### Phase 1: Add shadcn/ui v4 Components

**Priority:** High
**Effort:** Medium
**PR: `feat/add-shadcn-ui`**

shadcn/ui provides production-ready, accessible components built on Radix UI primitives that integrate perfectly with Tailwind CSS v4.

#### Tasks

1. Initialize shadcn/ui configuration
   ```bash
   npx shadcn@latest init
   ```

2. Configure for Tailwind v4 compatibility
   - Ensure CSS variables align with existing theme (`--color-neon-purple`, `--color-neon-cyan`)
   - Update `components.json` to use project's utility functions

3. Install core components to replace existing primitives:
   - `button` - Replace custom button with shadcn variant system
   - `card` - Enhance existing card with additional variants
   - `input` - Add form validation support
   - `slider` - Keep current Radix slider or migrate
   - `dialog` - Add modal support for design previews
   - `dropdown-menu` - Add for action menus
   - `tabs` - Add for generator/machine view navigation
   - `toast` - Add notification system for generation status

4. Maintain cyberpunk/neon theme by customizing shadcn theme tokens:
   ```css
   @layer base {
     :root {
       --primary: 275 100% 58%; /* neon-purple */
       --secondary: 186 100% 50%; /* neon-cyan */
       --background: 240 33% 4%; /* bg-dark */
     }
   }
   ```

#### Acceptance Criteria
- [ ] shadcn/ui initialized with Tailwind v4 support
- [ ] At least 6 core components installed
- [ ] Existing UI maintains cyberpunk aesthetic
- [ ] All existing tests pass
- [ ] Bundle size increase < 50KB

---

### Phase 2: Add Playwright E2E Testing

**Priority:** High
**Effort:** Medium
**PR: `feat/add-playwright-e2e`**

Currently the project uses Vitest for unit testing. Adding Playwright provides comprehensive E2E coverage for user flows.

#### Tasks

1. Install Playwright
   ```bash
   npm install -D @playwright/test
   npx playwright install
   ```

2. Configure Playwright
   ```typescript
   // playwright.config.ts
   import { defineConfig, devices } from '@playwright/test';

   export default defineConfig({
     testDir: './e2e',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:5173',
       trace: 'on-first-retry',
     },
     projects: [
       { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
       { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
       { name: 'webkit', use: { ...devices['Desktop Safari'] } },
       { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
       { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
     ],
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:5173',
       reuseExistingServer: !process.env.CI,
     },
   });
   ```

3. Add npm scripts
   ```json
   {
     "scripts": {
       "test:e2e": "playwright test",
       "test:e2e:ui": "playwright test --ui",
       "test:e2e:debug": "playwright test --debug"
     }
   }
   ```

4. Create core E2E test suites:
   ```
   e2e/
   ├── home.spec.ts          # Home page navigation
   ├── generator.spec.ts     # Tattoo generation flow
   ├── machine.spec.ts       # Machine dashboard interactions
   └── navigation.spec.ts    # View transitions
   ```

5. Key test scenarios:
   - Home page loads with feature cards
   - Navigate to generator view
   - Enter prompt and select style
   - Generate design (mock API response)
   - Navigate to machine dashboard
   - Connect to hardware (simulated)
   - Adjust calibration sliders
   - Mobile responsive behavior

#### Acceptance Criteria
- [ ] Playwright configured with multi-browser support
- [ ] E2E tests cover all three views (home, generator, machine)
- [ ] Tests run in CI pipeline
- [ ] Test report generated on failure
- [ ] Mobile viewport tests included

---

### Phase 3: Enhanced Testing Infrastructure

**Priority:** Medium
**Effort:** Low
**PR: `feat/enhance-test-infrastructure`**

Improve existing Vitest setup with better coverage reporting and component testing utilities.

#### Tasks

1. Add MSW (Mock Service Worker) for API mocking
   ```bash
   npm install -D msw
   ```

2. Configure coverage thresholds in `vitest.config.ts`:
   ```typescript
   export default defineConfig({
     test: {
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html'],
         thresholds: {
           statements: 70,
           branches: 70,
           functions: 70,
           lines: 70,
         },
         exclude: [
           'node_modules/',
           'dist/',
           '**/*.d.ts',
           'e2e/',
         ],
       },
     },
   });
   ```

3. Add component testing utilities:
   - Create test utilities for rendering with theme
   - Add custom matchers for canvas testing (HapticMatrix)
   - Create mock factories for generated images

4. Expand test coverage:
   - `useTattooGenerator` hook tests
   - `HapticMatrix` canvas rendering tests
   - `GeneratorInput` interaction tests
   - `MachineDashboard` state management tests

#### Acceptance Criteria
- [ ] MSW configured for API mocking
- [ ] Coverage thresholds enforced in CI
- [ ] All hooks have unit tests
- [ ] Component test coverage > 70%

---

### Phase 4: Code Quality Tooling

**Priority:** Medium
**Effort:** Low
**PR: `feat/code-quality-tooling`**

Add automated code quality enforcement.

#### Tasks

1. Add Prettier for consistent formatting
   ```bash
   npm install -D prettier eslint-config-prettier
   ```

2. Configure Prettier (`.prettierrc`):
   ```json
   {
     "semi": true,
     "singleQuote": true,
     "tabWidth": 2,
     "trailingComma": "es5",
     "printWidth": 100
   }
   ```

3. Add Husky for Git hooks
   ```bash
   npm install -D husky lint-staged
   npx husky init
   ```

4. Configure lint-staged (`.lintstagedrc`):
   ```json
   {
     "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
     "*.{json,md,css}": ["prettier --write"]
   }
   ```

5. Add pre-commit hook:
   ```bash
   echo "npx lint-staged" > .husky/pre-commit
   ```

6. Add commit message linting with Commitlint (optional):
   ```bash
   npm install -D @commitlint/cli @commitlint/config-conventional
   ```

#### Acceptance Criteria
- [ ] Prettier formats code on save
- [ ] ESLint + Prettier work together without conflicts
- [ ] Pre-commit hook runs lint-staged
- [ ] CI fails on linting errors

---

### Phase 5: Performance Monitoring

**Priority:** Low
**Effort:** Low
**PR: `feat/performance-monitoring`**

Add bundle analysis and performance monitoring.

#### Tasks

1. Add bundle analyzer
   ```bash
   npm install -D rollup-plugin-visualizer
   ```

2. Configure in `vite.config.ts`:
   ```typescript
   import { visualizer } from 'rollup-plugin-visualizer';

   export default defineConfig({
     plugins: [
       react(),
       visualizer({
         filename: 'dist/stats.html',
         open: false,
         gzipSize: true,
         brotliSize: true,
       }),
     ],
   });
   ```

3. Add Lighthouse CI
   ```bash
   npm install -D @lhci/cli
   ```

4. Configure Lighthouse CI (`.lighthouserc.json`):
   ```json
   {
     "ci": {
       "collect": {
         "startServerCommand": "npm run preview",
         "url": ["http://localhost:4173/"]
       },
       "assert": {
         "preset": "lighthouse:recommended",
         "assertions": {
           "categories:performance": ["warn", { "minScore": 0.9 }],
           "categories:accessibility": ["error", { "minScore": 0.9 }]
         }
       }
     }
   }
   ```

#### Acceptance Criteria
- [ ] Bundle analysis report generated on build
- [ ] Lighthouse CI runs in pipeline
- [ ] Performance score > 90
- [ ] Accessibility score > 90

---

## Maintenance Notes

### Dependencies to Keep Current

These dependencies are already at their latest major versions and should be updated regularly:

- **React 19** - Current LTS, stable
- **Vite 7** - Latest build tool, excellent DX
- **Tailwind CSS 4** - Latest with native CSS features
- **Framer Motion 12** - Stable animation library
- **React Router 7** - Latest routing solution

### No Upgrades Needed

The following do not require upgrades:

| Package | Reason |
|---------|--------|
| Tailwind CSS | Already on v4 (latest) |
| React | Already on v19 (LTS) |
| Vite | Already on v7 (latest) |
| React Router | Already on v7 (latest) |
| ESLint | Already on v9 (latest flat config) |

---

## PR Checklist Template

For each upgrade PR:

```markdown
## Changes
- [ ] Dependencies updated
- [ ] Configuration files added/modified
- [ ] Documentation updated

## Testing
- [ ] Unit tests pass
- [ ] E2E tests pass (if applicable)
- [ ] Manual testing completed

## Review
- [ ] No breaking changes
- [ ] Bundle size checked
- [ ] Performance verified
```

---

## Timeline Estimate

| Phase | Estimated Effort | Dependencies |
|-------|------------------|--------------|
| Phase 1: shadcn/ui | 4-6 hours | None |
| Phase 2: Playwright | 3-4 hours | None |
| Phase 3: Test Infrastructure | 2-3 hours | Phase 2 |
| Phase 4: Code Quality | 1-2 hours | None |
| Phase 5: Performance | 1-2 hours | None |

**Total Estimated Effort:** 11-17 hours

Each phase is independent (except Phase 3 depends on Phase 2) and can be completed as a separate PR.
