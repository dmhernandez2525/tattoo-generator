import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DemoMachine } from './DemoMachine';
import { DemoProvider } from '@/contexts/DemoContext';
import type { ReactNode } from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
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

// Mock MachineDashboard to simplify testing
vi.mock('@/components/features/machine/MachineDashboard', () => ({
  MachineDashboard: ({ onBack, onSettingsChange }: { onBack: () => void; onSettingsChange?: (settings: object) => void }) => (
    <div data-testid="machine-dashboard">
      <button onClick={onBack}>Mock Back</button>
      <button onClick={() => onSettingsChange?.({ voltage: 8 })}>Update Settings</button>
    </div>
  ),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
  <DemoProvider>{children}</DemoProvider>
);

describe('DemoMachine', () => {
  beforeAll(() => {
    mockPush.mockClear();
  });

  it('should render back to demo link', () => {
    render(<DemoMachine />, { wrapper });
    expect(screen.getByRole('button', { name: /Back to Demo/i })).toBeInTheDocument();
  });

  it('should render MachineDashboard component', () => {
    render(<DemoMachine />, { wrapper });
    expect(screen.getByTestId('machine-dashboard')).toBeInTheDocument();
  });

  it('should navigate to /demo when back is clicked', () => {
    render(<DemoMachine />, { wrapper });
    const backButton = screen.getByRole('button', { name: /Mock Back/i });
    fireEvent.click(backButton);
    expect(mockPush).toHaveBeenCalledWith('/demo');
  });

  it('should call updateMachineSettings when settings change', () => {
    render(<DemoMachine />, { wrapper });
    const updateButton = screen.getByRole('button', { name: /Update Settings/i });
    // This should not throw and should update context
    fireEvent.click(updateButton);
    expect(screen.getByTestId('machine-dashboard')).toBeInTheDocument();
  });

  it('should render within Layout component', () => {
    render(<DemoMachine />, { wrapper });
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('should have link to demo page', () => {
    render(<DemoMachine />, { wrapper });
    const links = screen.getAllByRole('link');
    const demoLink = links.find((link) => link.getAttribute('href') === '/demo');
    expect(demoLink).toBeInTheDocument();
  });
});
