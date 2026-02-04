import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';

// Mock ThemeToggle
vi.mock('@/components/theme/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme Toggle</button>,
}));

describe('Layout', () => {
  it('should render children', () => {
    render(
      <Layout>
        <div data-testid="child">Hello World</div>
      </Layout>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Layout className="custom-class">
        <div>Content</div>
      </Layout>
    );
    const main = container.querySelector('main');
    expect(main).toHaveClass('custom-class');
  });

  it('should have base layout structure', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('relative');
    expect(wrapper).toHaveClass('min-h-screen');
    expect(wrapper).toHaveClass('w-full');
  });

  it('should render theme toggle by default', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('should hide theme toggle when showThemeToggle is false', () => {
    render(
      <Layout showThemeToggle={false}>
        <div>Content</div>
      </Layout>
    );
    expect(screen.queryByTestId('theme-toggle')).not.toBeInTheDocument();
  });

  it('should show theme toggle when showThemeToggle is true', () => {
    render(
      <Layout showThemeToggle={true}>
        <div>Content</div>
      </Layout>
    );
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('should have background effects div', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const backgroundEffects = container.querySelector('.fixed.inset-0.z-0.pointer-events-none');
    expect(backgroundEffects).toBeInTheDocument();
  });

  it('should have grid pattern overlay', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    // Grid pattern has opacity-[0.03] class
    const gridPattern = container.querySelector('[class*="opacity-"]');
    expect(gridPattern).toBeInTheDocument();
  });

  it('should have main content area with proper z-index', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const main = container.querySelector('main');
    expect(main).toHaveClass('z-10');
  });

  it('should have container styling on main', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const main = container.querySelector('main');
    expect(main).toHaveClass('container');
    expect(main).toHaveClass('mx-auto');
    expect(main).toHaveClass('px-4');
    expect(main).toHaveClass('py-8');
  });

  it('should render multiple children', () => {
    render(
      <Layout>
        <div data-testid="child-1">First</div>
        <div data-testid="child-2">Second</div>
        <div data-testid="child-3">Third</div>
      </Layout>
    );
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('should have dark background color class', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('bg-bg-dark');
  });

  it('should have text color class', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('text-white');
  });

  it('should have selection highlight styling', () => {
    const { container } = render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('selection:bg-neon-cyan/30');
  });

  it('should position theme toggle in fixed position', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const toggleContainer = screen.getByTestId('theme-toggle').parentElement;
    expect(toggleContainer).toHaveClass('fixed');
    expect(toggleContainer).toHaveClass('top-6');
    expect(toggleContainer).toHaveClass('right-6');
  });
});
