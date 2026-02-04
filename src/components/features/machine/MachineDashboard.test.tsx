import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MachineDashboard } from './MachineDashboard';

// Mock HapticMatrix to avoid canvas issues
vi.mock('./HapticMatrix', () => ({
  HapticMatrix: ({ isActive, intensity, className }: { isActive: boolean; intensity: number; className?: string }) => (
    <div
      data-testid="haptic-matrix"
      data-active={isActive}
      data-intensity={intensity}
      className={className}
    >
      Mock HapticMatrix
    </div>
  ),
}));

describe('MachineDashboard', () => {
  const mockOnBack = vi.fn();
  const mockOnSettingsChange = vi.fn();

  beforeEach(() => {
    mockOnBack.mockClear();
    mockOnSettingsChange.mockClear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the dashboard', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('HAPTIC NEEDLE MATRIX')).toBeInTheDocument();
  });

  it('should render Disconnect button', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByRole('button', { name: /Disconnect/i })).toBeInTheDocument();
  });

  it('should call onBack when Disconnect is clicked', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const button = screen.getByRole('button', { name: /Disconnect/i });
    fireEvent.click(button);
    expect(mockOnBack).toHaveBeenCalled();
  });

  it('should show SEARCHING status initially', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('SEARCHING...')).toBeInTheDocument();
  });

  it('should show SYSTEM ONLINE after connection', async () => {
    render(<MachineDashboard onBack={mockOnBack} />);

    // Fast-forward connection timer
    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    expect(screen.getByText('SYSTEM ONLINE')).toBeInTheDocument();
  });

  it('should render CALIBRATION section', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('CALIBRATION')).toBeInTheDocument();
  });

  it('should render voltage slider', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Voltage')).toBeInTheDocument();
    expect(screen.getByText('7.5V')).toBeInTheDocument();
  });

  it('should render frequency slider', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Frequency')).toBeInTheDocument();
    expect(screen.getByText('85Hz')).toBeInTheDocument();
  });

  it('should render needle depth slider', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Needle Depth')).toBeInTheDocument();
    expect(screen.getByText('1.2mm')).toBeInTheDocument();
  });

  it('should render INITIATE IMPRINT button', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByRole('button', { name: /INITIATE IMPRINT/i })).toBeInTheDocument();
  });

  it('should toggle to ABORT when printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const button = screen.getByRole('button', { name: /INITIATE IMPRINT/i });
    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /ABORT/i })).toBeInTheDocument();
  });

  it('should toggle back to INITIATE IMPRINT when abort is clicked', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const initiateButton = screen.getByRole('button', { name: /INITIATE IMPRINT/i });
    fireEvent.click(initiateButton);

    const abortButton = screen.getByRole('button', { name: /ABORT/i });
    fireEvent.click(abortButton);

    expect(screen.getByRole('button', { name: /INITIATE IMPRINT/i })).toBeInTheDocument();
  });

  it('should render HapticMatrix component', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByTestId('haptic-matrix')).toBeInTheDocument();
  });

  it('should show inactive HapticMatrix when not printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const matrix = screen.getByTestId('haptic-matrix');
    expect(matrix).toHaveAttribute('data-active', 'false');
  });

  it('should show active HapticMatrix when printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const button = screen.getByRole('button', { name: /INITIATE IMPRINT/i });
    fireEvent.click(button);

    const matrix = screen.getByTestId('haptic-matrix');
    expect(matrix).toHaveAttribute('data-active', 'true');
  });

  it('should render Active Needles stat', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Active Needles')).toBeInTheDocument();
  });

  it('should render Pressure stat', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Pressure')).toBeInTheDocument();
  });

  it('should render Temp stat', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('Temp')).toBeInTheDocument();
  });

  it('should show 0 active needles when not printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should show 1,024 active needles when printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const button = screen.getByRole('button', { name: /INITIATE IMPRINT/i });
    fireEvent.click(button);
    expect(screen.getByText('1,024')).toBeInTheDocument();
  });

  it('should show 0g pressure when not printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('0g')).toBeInTheDocument();
  });

  it('should show 450g pressure when printing', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const button = screen.getByRole('button', { name: /INITIATE IMPRINT/i });
    fireEvent.click(button);
    expect(screen.getByText('450g')).toBeInTheDocument();
  });

  it('should show temperature value', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('34°C')).toBeInTheDocument();
  });

  it('should call onSettingsChange when settings change', async () => {
    render(<MachineDashboard onBack={mockOnBack} onSettingsChange={mockOnSettingsChange} />);

    // Initial call happens after mount - need to advance timers
    await act(async () => {
      vi.advanceTimersByTime(100);
    });

    expect(mockOnSettingsChange).toHaveBeenCalledWith({
      voltage: 7.5,
      frequency: 85,
      depth: 1.2,
    });
  });

  it('should render without onSettingsChange', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    expect(screen.getByText('CALIBRATION')).toBeInTheDocument();
  });

  it('should have sliders', () => {
    render(<MachineDashboard onBack={mockOnBack} />);
    const sliders = screen.getAllByRole('slider');
    expect(sliders).toHaveLength(3);
  });

  it('should render status indicator', () => {
    const { container } = render(<MachineDashboard onBack={mockOnBack} />);
    const statusIndicator = container.querySelector('.rounded-full.bg-red-500');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('should change status indicator to green when connected', async () => {
    const { container } = render(<MachineDashboard onBack={mockOnBack} />);

    await act(async () => {
      vi.advanceTimersByTime(1500);
    });

    const greenIndicator = container.querySelector('.bg-green-500');
    expect(greenIndicator).toBeInTheDocument();
  });
});
