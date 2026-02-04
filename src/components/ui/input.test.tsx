import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@/test/test-utils';
import { Input } from './input';

describe('Input', () => {
  it('should render an input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should accept a placeholder', () => {
    render(<Input placeholder="Enter text here" />);
    const input = screen.getByPlaceholderText('Enter text here');
    expect(input).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should display the value', () => {
    render(<Input value="Test value" readOnly />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Test value');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(<Input className="custom-class" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('should support different input types', () => {
    const { rerender, container } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

    rerender(<Input type="password" />);
    expect(container.querySelector('input[type="password"]')).toBeInTheDocument();

    rerender(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('should forward ref to input element', () => {
    const ref = vi.fn();
    render(<Input ref={ref} />);
    expect(ref).toHaveBeenCalled();
    const firstCall = ref.mock.calls[0];
    expect(firstCall?.[0]).toBeInstanceOf(HTMLInputElement);
  });

  it('should pass through additional props', () => {
    render(<Input data-testid="custom-input" aria-label="Custom input" />);
    const input = screen.getByTestId('custom-input');
    expect(input).toHaveAttribute('aria-label', 'Custom input');
  });

  it('should have base styling classes', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('flex');
    expect(input).toHaveClass('rounded-md');
  });

  it('should handle focus events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it('should support name attribute', () => {
    render(<Input name="username" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'username');
  });

  it('should support id attribute', () => {
    render(<Input id="user-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('id', 'user-input');
  });

  it('should support required attribute', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });

  it('should support maxLength attribute', () => {
    render(<Input maxLength={50} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('maxLength', '50');
  });

  it('should have displayName set', () => {
    expect(Input.displayName).toBe('Input');
  });
});
