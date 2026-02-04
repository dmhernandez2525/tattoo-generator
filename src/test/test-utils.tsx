import type { ReactElement } from 'react';
import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

/**
 * Custom render function that wraps components with necessary providers
 */
type CustomRenderOptions = Omit<RenderOptions, 'wrapper'>;

function customRender(
  ui: ReactElement,
  options?: CustomRenderOptions
): RenderResult & { user: ReturnType<typeof userEvent.setup> } {
  const user = userEvent.setup();

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
  };

  return {
    user,
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
}

// Re-export commonly used utilities from testing-library
export {
  screen,
  waitFor,
  within,
  fireEvent,
  cleanup,
  act,
} from '@testing-library/react';

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
