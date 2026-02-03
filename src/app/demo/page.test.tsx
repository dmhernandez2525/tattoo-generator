import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoHomePage from './page';

// Mock DemoHome component
vi.mock('@/components/demo/DemoHome', () => ({
  DemoHome: () => <div data-testid="demo-home">Demo Home Component</div>,
}));

describe('DemoHomePage', () => {
  it('should render DemoHome component', () => {
    render(<DemoHomePage />);
    expect(screen.getByTestId('demo-home')).toBeInTheDocument();
  });

  it('should display DemoHome content', () => {
    render(<DemoHomePage />);
    expect(screen.getByText('Demo Home Component')).toBeInTheDocument();
  });
});
