import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { HapticMatrix } from './HapticMatrix';

describe('HapticMatrix', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render a canvas element', () => {
    render(<HapticMatrix isActive={false} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<HapticMatrix isActive={false} intensity={50} className="custom-class" />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('custom-class');
  });

  it('should have default styling classes', () => {
    render(<HapticMatrix isActive={false} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('w-full');
    expect(canvas).toHaveClass('h-64');
    expect(canvas).toHaveClass('rounded-xl');
  });

  it('should render when active', () => {
    render(<HapticMatrix isActive={true} intensity={75} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should render when inactive', () => {
    render(<HapticMatrix isActive={false} intensity={0} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should handle intensity at minimum (0)', () => {
    render(<HapticMatrix isActive={true} intensity={0} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should handle intensity at maximum (100)', () => {
    render(<HapticMatrix isActive={true} intensity={100} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should handle intensity in middle range', () => {
    render(<HapticMatrix isActive={true} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should set up resize listener', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    render(<HapticMatrix isActive={false} intensity={50} />);

    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    addEventListenerSpy.mockRestore();
  });

  it('should clean up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = render(<HapticMatrix isActive={false} intensity={50} />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it('should use animation frame when active', () => {
    // Animation frame is mocked in setup.ts, just verify the component renders
    render(<HapticMatrix isActive={true} intensity={50} />);

    // Fast-forward to allow animation frames
    vi.advanceTimersByTime(100);

    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('should cleanup on unmount', () => {
    const { unmount } = render(<HapticMatrix isActive={true} intensity={50} />);

    vi.advanceTimersByTime(100);
    unmount();

    // After unmount, canvas should no longer be in document
    const canvas = document.querySelector('canvas');
    expect(canvas).not.toBeInTheDocument();
  });

  it('should re-render when isActive changes', () => {
    const { rerender } = render(<HapticMatrix isActive={false} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();

    rerender(<HapticMatrix isActive={true} intensity={50} />);
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('should re-render when intensity changes', () => {
    const { rerender } = render(<HapticMatrix isActive={true} intensity={25} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();

    rerender(<HapticMatrix isActive={true} intensity={75} />);
    expect(document.querySelector('canvas')).toBeInTheDocument();
  });

  it('should have border styling', () => {
    render(<HapticMatrix isActive={false} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('border');
    expect(canvas).toHaveClass('border-white/10');
  });

  it('should have background styling', () => {
    render(<HapticMatrix isActive={false} intensity={50} />);
    const canvas = document.querySelector('canvas');
    expect(canvas).toHaveClass('bg-black/40');
  });
});
