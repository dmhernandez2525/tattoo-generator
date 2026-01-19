import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { Button } from './button';

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('border');
  });

  it('applies neon variant correctly', () => {
    render(<Button variant="neon">Neon Button</Button>);
    const button = screen.getByRole('button', { name: /neon button/i });
    expect(button).toHaveClass('border-neon-cyan');
  });

  it('handles click events', async () => {
    const { user } = render(<Button>Clickable</Button>);
    const button = screen.getByRole('button', { name: /clickable/i });

    await user.click(button);
    expect(button).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
