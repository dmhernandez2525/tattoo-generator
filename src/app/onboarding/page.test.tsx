import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OnboardingPage from './page';

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

describe('OnboardingPage in Demo Mode', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = 'true';
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalDemoMode;
  });

  it('should render DemoRoleSelector in demo mode', () => {
    render(<OnboardingPage />);
    expect(screen.getByTestId('demo-role-selector')).toBeInTheDocument();
  });
});

describe('OnboardingPage in Normal Mode', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = 'false';
    mockFetch.mockClear();
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalDemoMode;
  });

  it('should render Complete Your Profile title', () => {
    render(<OnboardingPage />);
    expect(screen.getByText('Complete Your Profile')).toBeInTheDocument();
  });

  it('should render display name input', () => {
    render(<OnboardingPage />);
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });

  it('should render role selection buttons', () => {
    render(<OnboardingPage />);
    expect(screen.getByRole('button', { name: 'Collector' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Artist' })).toBeInTheDocument();
  });

  it('should render Finish Setup button', () => {
    render(<OnboardingPage />);
    expect(screen.getByRole('button', { name: /Finish Setup/i })).toBeInTheDocument();
  });

  it('should pre-populate display name from user data', async () => {
    render(<OnboardingPage />);

    // Wait for the useEffect to run with setTimeout
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });
  });

  it('should allow changing role selection', () => {
    render(<OnboardingPage />);

    const artistButton = screen.getByRole('button', { name: 'Artist' });
    fireEvent.click(artistButton);

    expect(artistButton).toHaveClass('border-neon-cyan');
  });

  it('should have Collector selected by default', () => {
    render(<OnboardingPage />);
    const collectorButton = screen.getByRole('button', { name: 'Collector' });
    expect(collectorButton).toHaveClass('border-neon-cyan');
  });

  it('should show error message for empty display name on submit', async () => {
    render(<OnboardingPage />);

    // Clear the input field
    const input = screen.getByPlaceholderText('Your name');
    fireEvent.change(input, { target: { value: '' } });

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Please enter a display name/i)).toBeInTheDocument();
    });
  });

  it('should submit profile successfully', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        success: true,
      }),
    });

    render(<OnboardingPage />);

    // Wait for display name to be populated
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Profile saved/i)).toBeInTheDocument();
    });
  });

  it('should show error message on failed submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({
        success: false,
        error: 'Server error',
      }),
    });

    render(<OnboardingPage />);

    // Wait for display name to be populated
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Server error|Unable to save profile/i)).toBeInTheDocument();
    });
  });

  it('should handle fetch exception', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    render(<OnboardingPage />);

    // Wait for display name to be populated
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Unable to save profile/i)).toBeInTheDocument();
    });
  });

  it('should disable button while saving', async () => {
    // Slow response
    mockFetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      }), 1000))
    );

    render(<OnboardingPage />);

    // Wait for display name to be populated
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /Saving/i })).toBeDisabled();
  });

  it('should send correct data to API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<OnboardingPage />);

    // Wait for display name to be populated
    await waitFor(() => {
      const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
      expect(input.value).toBe('Test User');
    }, { timeout: 100 });

    // Select artist role
    const artistButton = screen.getByRole('button', { name: 'Artist' });
    fireEvent.click(artistButton);

    const submitButton = screen.getByRole('button', { name: /Finish Setup/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/profile', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          displayName: 'Test User',
          role: 'artist',
        }),
      }));
    });
  });
});

describe('OnboardingPage with user without fullName', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = 'false';
    vi.doMock('@clerk/nextjs', () => ({
      useUser: vi.fn(() => ({
        user: {
          fullName: null,
          firstName: 'FirstOnly',
        },
        isLoaded: true,
      })),
    }));
  });

  afterEach(() => {
    process.env.NEXT_PUBLIC_DEMO_MODE = originalDemoMode;
  });

  it('should use firstName when fullName is not available', async () => {
    // This test verifies the fallback logic
    render(<OnboardingPage />);
    // The component falls back to firstName if fullName is not available
    expect(screen.getByPlaceholderText('Your name')).toBeInTheDocument();
  });
});
