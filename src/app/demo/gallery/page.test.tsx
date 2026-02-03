import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import DemoGalleryPage from './page';
import { DemoProvider } from '@/contexts/DemoContext';
import type { ReactNode } from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock Layout
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

describe('DemoGalleryPage', () => {
  it('should render the gallery title', () => {
    render(<DemoGalleryPage />, { wrapper });
    expect(screen.getByText('GALLERY')).toBeInTheDocument();
  });

  it('should render Back to Demo link', () => {
    render(<DemoGalleryPage />, { wrapper });
    expect(screen.getByRole('button', { name: /Back to Demo/i })).toBeInTheDocument();
  });

  it('should render design cards', () => {
    render(<DemoGalleryPage />, { wrapper });
    // Should render images for each design
    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);
  });

  it('should have links to design details', () => {
    render(<DemoGalleryPage />, { wrapper });
    const links = screen.getAllByRole('link');
    // Should have links to /demo/design/[id]
    const designLinks = links.filter((link) =>
      link.getAttribute('href')?.startsWith('/demo/design/')
    );
    expect(designLinks.length).toBeGreaterThan(0);
  });

  it('should have link back to demo', () => {
    render(<DemoGalleryPage />, { wrapper });
    const links = screen.getAllByRole('link');
    const demoLink = links.find((link) => link.getAttribute('href') === '/demo');
    expect(demoLink).toBeInTheDocument();
  });

  it('should render within Layout component', () => {
    render(<DemoGalleryPage />, { wrapper });
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });
});
