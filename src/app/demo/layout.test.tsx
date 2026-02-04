import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoLayout from './layout';

// Mock DemoContext
vi.mock('@/contexts/DemoContext', () => ({
  DemoProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="demo-provider">{children}</div>
  ),
}));

describe('DemoLayout', () => {
  it('should render children within DemoProvider', () => {
    render(
      <DemoLayout>
        <div data-testid="child">Child content</div>
      </DemoLayout>
    );

    expect(screen.getByTestId('demo-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });

  it('should wrap multiple children in DemoProvider', () => {
    render(
      <DemoLayout>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
      </DemoLayout>
    );

    expect(screen.getByTestId('demo-provider')).toBeInTheDocument();
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
  });

  it('should have DemoProvider as parent of children', () => {
    render(
      <DemoLayout>
        <div data-testid="child">Content</div>
      </DemoLayout>
    );

    const provider = screen.getByTestId('demo-provider');
    const child = screen.getByTestId('child');
    expect(provider.contains(child)).toBe(true);
  });
});
