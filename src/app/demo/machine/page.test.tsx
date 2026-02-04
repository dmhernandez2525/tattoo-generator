import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoMachinePage from './page';

// Mock DemoMachine component
vi.mock('@/components/demo/DemoMachine', () => ({
  DemoMachine: () => <div data-testid="demo-machine">Demo Machine Component</div>,
}));

describe('DemoMachinePage', () => {
  it('should render DemoMachine component', () => {
    render(<DemoMachinePage />);
    expect(screen.getByTestId('demo-machine')).toBeInTheDocument();
  });

  it('should display DemoMachine content', () => {
    render(<DemoMachinePage />);
    expect(screen.getByText('Demo Machine Component')).toBeInTheDocument();
  });
});
