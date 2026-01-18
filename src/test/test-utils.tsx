import React, { ReactElement } from 'react';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Custom render function that wraps components with necessary providers
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Add any custom options here
}

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>;
  };

  return {
    user,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override render with custom render
export { customRender as render };

/**
 * Mock generated tattoo image
 */
export function createMockGeneratedImage() {
  return {
    id: crypto.randomUUID(),
    url: 'data:image/png;base64,mock-image-data',
    prompt: 'Test tattoo design',
    style: 'traditional',
    createdAt: new Date().toISOString(),
  };
}

/**
 * Mock machine connection status
 */
export function createMockMachineStatus(connected: boolean = false) {
  return {
    connected,
    voltage: connected ? 12.5 : 0,
    frequency: connected ? 100 : 0,
    needleDepth: connected ? 2.0 : 0,
    lastPing: connected ? new Date().toISOString() : null,
  };
}
