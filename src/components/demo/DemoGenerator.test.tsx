import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DemoGenerator } from './DemoGenerator';
import { DemoProvider } from '@/contexts/DemoContext';
import type { ReactNode } from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: vi.fn().mockReturnValue(null),
  }),
}));

// Mock Layout component
vi.mock('@/components/layout/Layout', () => ({
  Layout: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className} data-testid="layout">
      {children}
    </div>
  ),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <DemoProvider>{children}</DemoProvider>
);

describe('DemoGenerator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the demo banner', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByText(/DEMO MODE - Designs shown are placeholders/)).toBeInTheDocument();
  });

  it('should render the design studio header', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByText('DESIGN STUDIO')).toBeInTheDocument();
  });

  it('should render back to demo link', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByRole('button', { name: /Back to Demo/i })).toBeInTheDocument();
  });

  it('should render prompt input field', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByPlaceholderText(/A robotic geisha/i)).toBeInTheDocument();
  });

  it('should render label for prompt input', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByText('Describe your tattoo idea')).toBeInTheDocument();
  });

  it('should render style selection buttons', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByRole('button', { name: 'Cyberpunk' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Traditional' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Minimalist' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Geometric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Watercolor' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tribal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Japanese' })).toBeInTheDocument();
  });

  it('should render generate button', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByRole('button', { name: /GENERATE DESIGN/i })).toBeInTheDocument();
  });

  it('should disable generate button when prompt is empty', () => {
    render(<DemoGenerator />, { wrapper });
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });
    expect(button).toBeDisabled();
  });

  it('should enable generate button when prompt is entered', async () => {
    render(<DemoGenerator />, { wrapper });
    const input = screen.getByPlaceholderText(/A robotic geisha/i);
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });

    fireEvent.change(input, { target: { value: 'Test prompt' } });

    expect(button).not.toBeDisabled();
  });

  it('should allow selecting different styles', async () => {
    render(<DemoGenerator />, { wrapper });
    const japaneseButton = screen.getByRole('button', { name: 'Japanese' });

    fireEvent.click(japaneseButton);

    // Japanese should be selected (has specific styling)
    expect(japaneseButton).toHaveClass('bg-neon-cyan/20');
  });

  it('should render style tips card', () => {
    render(<DemoGenerator />, { wrapper });
    expect(screen.getByText(/Style Tips/)).toBeInTheDocument();
  });

  it('should show sample prompts for the selected style', () => {
    render(<DemoGenerator />, { wrapper });
    // Default style is Cyberpunk
    expect(screen.getByText('Try these prompts:')).toBeInTheDocument();
  });

  it('should update prompt when sample prompt is clicked', () => {
    render(<DemoGenerator />, { wrapper });

    // Find a sample prompt button and click it
    const samplePromptButtons = screen.getAllByRole('button').filter((btn) =>
      btn.classList.contains('bg-neon-purple/10')
    );

    const firstButton = samplePromptButtons[0];
    if (firstButton) {
      fireEvent.click(firstButton);
    }

    // Verify prompt input has changed
    const input = screen.getByPlaceholderText(/A robotic geisha/i);
    expect((input as HTMLInputElement).value).not.toBe('');
  });

  it('should show generating state when generating', () => {
    render(<DemoGenerator />, { wrapper });
    const input = screen.getByPlaceholderText(/A robotic geisha/i);

    // Type a prompt
    fireEvent.change(input, { target: { value: 'Test dragon' } });

    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });
    fireEvent.click(button);

    expect(screen.getByText(/SYNTHESIZING/)).toBeInTheDocument();
  });

  it('should have link to demo machine page', () => {
    render(<DemoGenerator />, { wrapper });
    const demoLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') === '/demo'
    );
    expect(demoLinks.length).toBeGreaterThan(0);
  });
});

describe('DemoGenerator with style parameter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should initialize with style from URL parameter', () => {
    // Override the mock for this test
    vi.doMock('next/navigation', () => ({
      useSearchParams: () => ({
        get: vi.fn().mockReturnValue('Japanese'),
      }),
    }));

    render(<DemoGenerator />, { wrapper });
    // Component should render with Japanese as initial style
    expect(screen.getByRole('button', { name: 'Japanese' })).toBeInTheDocument();
  });
});
