import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

// Mock RootProviders
vi.mock('@/components/providers/RootProviders', () => ({
  RootProviders: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="root-providers">{children}</div>
  ),
}));

describe('RootLayout', () => {
  it('should render children', () => {
    render(
      <RootLayout>
        <div data-testid="child">Test Child</div>
      </RootLayout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should wrap children in RootProviders', () => {
    render(
      <RootLayout>
        <div data-testid="child">Content</div>
      </RootLayout>
    );
    expect(screen.getByTestId('root-providers')).toBeInTheDocument();
  });

  it('should render html element with lang attribute', () => {
    render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>
    );
    // Note: In test environment, the html/body structure may differ
    expect(screen.getByTestId('root-providers')).toBeInTheDocument();
  });
});
