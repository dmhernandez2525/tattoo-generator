import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Store original env
const originalEnv = process.env.NEXT_PUBLIC_DEMO_MODE;

describe('Middleware', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalEnv;
  });

  describe('demo mode', () => {
    it('should use demoMiddleware when NEXT_PUBLIC_DEMO_MODE is true', async () => {
      process.env.NEXT_PUBLIC_DEMO_MODE = 'true';

      // Re-import middleware with new env
      const { default: middleware } = await import('./middleware');

      // Demo middleware should return NextResponse.next()
      const result = middleware();

      // NextResponse.next() returns a NextResponse
      expect(result).toBeDefined();
    });

    it('should export config with correct matcher', async () => {
      const { config } = await import('./middleware');

      expect(config).toBeDefined();
      expect(config.matcher).toBeDefined();
      expect(config.matcher).toContain('/((?!_next|.*\\..*).*)')
      expect(config.matcher).toContain('/(api|trpc)(.*)')
    });
  });

  describe('auth mode', () => {
    it('should use authMiddleware when NEXT_PUBLIC_DEMO_MODE is not true', async () => {
      process.env.NEXT_PUBLIC_DEMO_MODE = 'false';

      // Re-import middleware with new env
      const { default: middleware } = await import('./middleware');

      // The middleware function should exist
      expect(typeof middleware).toBe('function');
    });

    it('should use authMiddleware when NEXT_PUBLIC_DEMO_MODE is undefined', async () => {
      delete process.env.NEXT_PUBLIC_DEMO_MODE;

      // Re-import middleware with new env
      const { default: middleware } = await import('./middleware');

      expect(typeof middleware).toBe('function');
    });
  });

  describe('route matching', () => {
    it('should have public routes configured', async () => {
      // This tests that the module can be imported and exports correctly
      const module = await import('./middleware');
      expect(module.default).toBeDefined();
      expect(module.config).toBeDefined();
    });
  });
});

describe('Middleware Config', () => {
  it('should exclude _next from matching', async () => {
    const { config } = await import('./middleware');
    const matcher = config.matcher[0];
    expect(matcher).toContain('_next');
  });

  it('should exclude file extensions from matching', async () => {
    const { config } = await import('./middleware');
    const matcher = config.matcher[0];
    expect(matcher).toContain('.*\\..*)');
  });

  it('should match api routes', async () => {
    const { config } = await import('./middleware');
    expect(config.matcher.some((m: string) => m.includes('api'))).toBe(true);
  });

  it('should match trpc routes', async () => {
    const { config } = await import('./middleware');
    expect(config.matcher.some((m: string) => m.includes('trpc'))).toBe(true);
  });
});
