import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AccountPage from './page';

// Store original env
const originalDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE;

// Mock @clerk/nextjs
vi.mock('@clerk/nextjs', () => ({
  useUser: vi.fn(() => ({
    user: {
      fullName: 'Test User',
      firstName: 'Test',
    },
    isLoaded: true,
  })),
}));

// Mock Layout
vi.mock('@/components/layout/Layout', () => ({
  Layout: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className} data-testid="layout">
      {children}
    </div>
  ),
}));

// Mock DemoRoleSelector
vi.mock('@/components/demo/DemoRoleSelector', () => ({
  DemoRoleSelector: () => <div data-testid="demo-role-selector">Demo Role Selector</div>,
}));

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('AccountPage in Demo Mode', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalDemoMode;
  });

  it('should render DemoRoleSelector in demo mode', () => {
    render(<AccountPage />);
    expect(screen.getByTestId('demo-role-selector')).toBeInTheDocument();
  });
});

describe('AccountPage in Normal Mode', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = 'false';
    mockFetch.mockClear();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalDemoMode;
  });

  it('should render Account Settings title', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    render(<AccountPage />);
    expect(screen.getByText('Account Settings')).toBeInTheDocument();
  });

  it('should render display name input', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    render(<AccountPage />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('should render role selection buttons', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    render(<AccountPage />);
    expect(screen.getByRole('button', { name: 'Collector' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Artist' })).toBeInTheDocument();
  });

  it('should render Save Changes button', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    render(<AccountPage />);
    expect(screen.getByRole('button', { name: /Save Changes/i })).toBeInTheDocument();
  });

  it('should load profile data on mount', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Loaded User', role: 'artist' },
      }),
    });

    render(<AccountPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/profile');
    });
  });

  it('should allow changing role selection', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    render(<AccountPage />);

    const artistButton = screen.getByRole('button', { name: 'Artist' });
    fireEvent.click(artistButton);

    expect(artistButton).toHaveClass('border-neon-cyan');
  });

  it('should show error message for empty display name on submit', async () => {
    // First mock for profile load - returns empty displayName
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: '', role: 'user' },
      }),
    });

    render(<AccountPage />);

    // Wait for profile to load
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/profile');
    });

    // Since useUser returns fullName 'Test User', it will set that as displayName
    // We need to clear it manually
    const input = screen.getByPlaceholderText('Your name');
    fireEvent.change(input, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a display name/i)).toBeInTheDocument();
    });
  });

  it('should submit profile update successfully', async () => {
    // First call - load profile
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    // Second call - update profile
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
      }),
    });

    render(<AccountPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    const submitButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Profile updated/i)).toBeInTheDocument();
    });
  });

  it('should show error message on failed submission', async () => {
    // First call - load profile
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    // Second call - update fails
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({
        success: false,
        error: 'Server error',
      }),
    });

    render(<AccountPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    const submitButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // The error message is either from server or fallback
      expect(screen.getByText(/Server error|Unable to update profile/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should disable button while saving', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
        data: { displayName: 'Test User', role: 'user' },
      }),
    });

    // Slow response for update
    mockFetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }), 1000))
    );

    render(<AccountPage />);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });

    const submitButton = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(submitButton);

    // Button text changes to "Saving..." with ellipsis
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Saving/i })).toBeDisabled();
    });
  });
});
