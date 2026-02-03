import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoHome } from './DemoHome';
import { DemoProvider } from '@/contexts/DemoContext';
import type { ReactNode } from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
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

describe('DemoHome', () => {
  it('should render the main title', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('INK SYNTHESIS')).toBeInTheDocument();
  });

  it('should render the demo mode banner', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText(/DEMO MODE/)).toBeInTheDocument();
    expect(screen.getByText(/Experience the full interface without an account/)).toBeInTheDocument();
  });

  it('should render the subtitle with Haptic Imprinting', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText(/AI-Driven Tattoo Generation/)).toBeInTheDocument();
    expect(screen.getByText(/Haptic Imprinting/)).toBeInTheDocument();
  });

  it('should render the Design Studio card', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('Design Studio')).toBeInTheDocument();
    expect(screen.getByText(/Generate unique tattoo designs/)).toBeInTheDocument();
  });

  it('should render the Machine Interface card', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('Machine Interface')).toBeInTheDocument();
    expect(screen.getByText(/Explore the haptic imprinting hardware/)).toBeInTheDocument();
  });

  it('should render TRY GENERATOR button', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByRole('button', { name: /TRY GENERATOR/i })).toBeInTheDocument();
  });

  it('should render VIEW MACHINE button', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByRole('button', { name: /VIEW MACHINE/i })).toBeInTheDocument();
  });

  it('should render the Design Gallery link', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('Design Gallery')).toBeInTheDocument();
  });

  it('should render Popular Designs section', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('Popular Designs')).toBeInTheDocument();
  });

  it('should render Available Styles section', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByText('Available Styles')).toBeInTheDocument();
  });

  it('should render Exit Demo Mode button', () => {
    render(<DemoHome />, { wrapper });
    expect(screen.getByRole('button', { name: /Exit Demo Mode/i })).toBeInTheDocument();
  });

  it('should have link to generator page', () => {
    render(<DemoHome />, { wrapper });
    const generatorLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') === '/demo/generator'
    );
    expect(generatorLinks.length).toBeGreaterThan(0);
  });

  it('should have link to machine page', () => {
    render(<DemoHome />, { wrapper });
    const machineLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') === '/demo/machine'
    );
    expect(machineLinks.length).toBeGreaterThan(0);
  });

  it('should have link to gallery page', () => {
    render(<DemoHome />, { wrapper });
    const galleryLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') === '/demo/gallery'
    );
    expect(galleryLinks.length).toBeGreaterThan(0);
  });

  it('should have link back to home', () => {
    render(<DemoHome />, { wrapper });
    const homeLinks = screen.getAllByRole('link').filter(
      (link) => link.getAttribute('href') === '/'
    );
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('should render style preset buttons', () => {
    render(<DemoHome />, { wrapper });
    // Check for some style buttons
    expect(screen.getByRole('button', { name: /Cyberpunk/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Traditional/i })).toBeInTheDocument();
  });

  it('should render View All link in Popular Designs', () => {
    render(<DemoHome />, { wrapper });
    const viewAllButtons = screen.getAllByRole('button', { name: /View All/i });
    expect(viewAllButtons.length).toBeGreaterThan(0);
  });
});
