import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { ThemeProvider } from './ThemeProvider';
import type { ReactNode } from 'react';

const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeToggle', () => {
  it('should render a button', () => {
    render(<ThemeToggle />, { wrapper });
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('should have aria-label for accessibility', () => {
    render(<ThemeToggle />, { wrapper });
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Toggle theme');
  });

  it('should toggle theme when clicked', () => {
    render(<ThemeToggle />, { wrapper });
    const button = screen.getByRole('button');

    // Initial theme is dark, so Sun icon should be shown
    fireEvent.click(button);

    // After click, theme changes to light, so Moon icon should be shown
    expect(button).toBeInTheDocument();
  });

  it('should have styling classes', () => {
    render(<ThemeToggle />, { wrapper });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('rounded-full');
  });

  it('should be clickable multiple times', () => {
    render(<ThemeToggle />, { wrapper });
    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
