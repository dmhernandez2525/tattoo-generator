import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeneratorInput } from './GeneratorInput';

describe('GeneratorInput', () => {
  const mockOnGenerate = vi.fn();

  beforeEach(() => {
    mockOnGenerate.mockClear();
    mockOnGenerate.mockResolvedValue(undefined);
  });

  it('should render prompt input field', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    expect(screen.getByPlaceholderText(/A robotic geisha/i)).toBeInTheDocument();
  });

  it('should render label for prompt input', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    expect(screen.getByText('Describe your tattoo idea')).toBeInTheDocument();
  });

  it('should render style selection label', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    expect(screen.getByText('Select Art Style')).toBeInTheDocument();
  });

  it('should render all style buttons', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    expect(screen.getByRole('button', { name: 'Cyberpunk' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Traditional' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Minimalist' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Geometric' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Watercolor' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tribal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Japanese' })).toBeInTheDocument();
  });

  it('should render generate button', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    expect(screen.getByRole('button', { name: /GENERATE DESIGN/i })).toBeInTheDocument();
  });

  it('should have Cyberpunk selected by default', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    const cyberpunkButton = screen.getByRole('button', { name: 'Cyberpunk' });
    expect(cyberpunkButton).toHaveClass('bg-neon-cyan/20');
  });

  it('should disable generate button when prompt is empty', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });
    expect(button).toBeDisabled();
  });

  it('should enable generate button when prompt is entered', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    const input = screen.getByPlaceholderText(/A robotic geisha/i);
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });

    await user.type(input, 'Test prompt');

    expect(button).not.toBeDisabled();
  });

  it('should call onGenerate when form is submitted', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    const input = screen.getByPlaceholderText(/A robotic geisha/i);

    await user.type(input, 'Dragon design');
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });
    await user.click(button);

    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledWith('Dragon design', 'Cyberpunk');
    });
  });

  it('should call onGenerate with selected style', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);

    const input = screen.getByPlaceholderText(/A robotic geisha/i);
    const japaneseButton = screen.getByRole('button', { name: 'Japanese' });

    await user.click(japaneseButton);
    await user.type(input, 'Koi fish');
    const submitButton = screen.getByRole('button', { name: /GENERATE DESIGN/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledWith('Koi fish', 'Japanese');
    });
  });

  it('should not call onGenerate when prompt is only whitespace', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);
    const input = screen.getByPlaceholderText(/A robotic geisha/i);

    await user.type(input, '   ');

    // Even with spaces, button should be enabled but form submission should check trim
    const button = screen.getByRole('button', { name: /GENERATE DESIGN/i });

    // Create a form submit event directly
    const form = button.closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnGenerate).not.toHaveBeenCalled();
  });

  it('should show SYNTHESIZING text when generating', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={true} />);
    expect(screen.getByText(/SYNTHESIZING/)).toBeInTheDocument();
  });

  it('should disable input when generating', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={true} />);
    const input = screen.getByPlaceholderText(/A robotic geisha/i);
    expect(input).toBeDisabled();
  });

  it('should disable style buttons when generating', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={true} />);
    const cyberpunkButton = screen.getByRole('button', { name: 'Cyberpunk' });
    expect(cyberpunkButton).toBeDisabled();
  });

  it('should disable generate button when generating', () => {
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={true} />);
    const button = screen.getByRole('button', { name: /SYNTHESIZING/i });
    expect(button).toBeDisabled();
  });

  it('should change selected style when style button is clicked', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);

    const traditionalButton = screen.getByRole('button', { name: 'Traditional' });
    await user.click(traditionalButton);

    expect(traditionalButton).toHaveClass('bg-neon-cyan/20');
  });

  it('should allow cycling through all styles', async () => {
    const user = userEvent.setup();
    render(<GeneratorInput onGenerate={mockOnGenerate} isGenerating={false} />);

    const styles = ['Cyberpunk', 'Traditional', 'Minimalist', 'Geometric', 'Watercolor', 'Tribal', 'Japanese'];

    for (const style of styles) {
      const button = screen.getByRole('button', { name: style });
      await user.click(button);
      expect(button).toHaveClass('bg-neon-cyan/20');
    }
  });
});
