import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoGeneratorPage from './page';

// Mock DemoGenerator component
vi.mock('@/components/demo/DemoGenerator', () => ({
  DemoGenerator: () => <div data-testid="demo-generator">Demo Generator Component</div>,
}));

describe('DemoGeneratorPage', () => {
  it('should render DemoGenerator component', () => {
    render(<DemoGeneratorPage />);
    expect(screen.getByTestId('demo-generator')).toBeInTheDocument();
  });

  it('should display DemoGenerator content', () => {
    render(<DemoGeneratorPage />);
    expect(screen.getByText('Demo Generator Component')).toBeInTheDocument();
  });
});
