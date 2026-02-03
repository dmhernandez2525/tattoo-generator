import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

// Mock App component
vi.mock('@/App', () => ({
  default: () => <div data-testid="app">App Component</div>,
}));

describe('HomePage', () => {
  it('should render the App component', () => {
    render(<HomePage />);
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('should display App content', () => {
    render(<HomePage />);
    expect(screen.getByText('App Component')).toBeInTheDocument();
  });
});
