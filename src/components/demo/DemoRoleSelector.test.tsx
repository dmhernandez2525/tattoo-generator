import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DemoRoleSelector } from './DemoRoleSelector';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Layout component
vi.mock('@/components/layout/Layout', () => ({
  Layout: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="layout">
      {children}
    </div>
  ),
}));

describe('DemoRoleSelector', () => {
  it('should render the demo mode title', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('DEMO MODE')).toBeInTheDocument();
  });

  it('should render the description', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('Choose a role to explore the demo experience.')).toBeInTheDocument();
  });

  it('should render three role cards', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('Collector')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Studio')).toBeInTheDocument();
  });

  it('should render Collector role description', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('Explore designs, generate concepts, and build your collection.')).toBeInTheDocument();
  });

  it('should render Artist role description', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('Showcase styles, generate client-ready concepts, and export stencils.')).toBeInTheDocument();
  });

  it('should render Studio role description', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByText('Preview multi-client workflows and portfolio-ready exports.')).toBeInTheDocument();
  });

  it('should render Enter Demo buttons for each role', () => {
    render(<DemoRoleSelector />);
    const buttons = screen.getAllByRole('button', { name: 'Enter Demo' });
    expect(buttons).toHaveLength(3);
  });

  it('should have links to the demo page', () => {
    render(<DemoRoleSelector />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '/demo');
    });
  });

  it('should render within the Layout component', () => {
    render(<DemoRoleSelector />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('should render icons for each role', () => {
    const { container } = render(<DemoRoleSelector />);
    // Check for icon container divs
    const iconContainers = container.querySelectorAll('.w-10.h-10.rounded-full');
    expect(iconContainers.length).toBe(3);
  });
});
