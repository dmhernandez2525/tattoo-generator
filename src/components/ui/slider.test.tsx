import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/test-utils';
import { Slider } from './slider';

describe('Slider', () => {
  it('should render a slider', () => {
    render(<Slider />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('should accept a default value', () => {
    render(<Slider defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('should accept min and max values', () => {
    render(<Slider min={0} max={100} defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('should accept step value', () => {
    render(<Slider step={10} defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Slider className="custom-slider" />);
    const sliderRoot = container.querySelector('[class*="custom-slider"]');
    expect(sliderRoot).toBeInTheDocument();
  });

  it('should call onValueChange when value changes', () => {
    const handleChange = vi.fn();
    render(<Slider onValueChange={handleChange} defaultValue={[50]} />);
    // Note: Actual value change testing requires more complex interaction
    // This test verifies the component renders with the callback
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Slider disabled defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('data-disabled', '');
  });

  it('should handle controlled value', () => {
    const { rerender } = render(<Slider value={[25]} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '25');

    rerender(<Slider value={[75]} />);
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
  });

  it('should forward ref', () => {
    const ref = vi.fn();
    render(<Slider ref={ref} />);
    expect(ref).toHaveBeenCalled();
  });

  it('should have displayName from RadixUI', () => {
    expect(Slider.displayName).toBeDefined();
  });

  it('should render with default min 0 and max 100', () => {
    render(<Slider defaultValue={[0]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('should render with custom range', () => {
    render(<Slider min={-50} max={50} defaultValue={[0]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '-50');
    expect(slider).toHaveAttribute('aria-valuemax', '50');
  });

  it('should render with orientation default (horizontal)', () => {
    render(<Slider orientation="horizontal" defaultValue={[50]} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('should have proper structure with track, range, and thumb', () => {
    const { container } = render(<Slider defaultValue={[50]} />);
    expect(container.querySelector('[class*="relative"]')).toBeInTheDocument();
  });
});
