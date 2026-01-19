import { describe, it, expect } from 'vitest';
import { render, screen } from './test/test-utils';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('renders the INK SYNTHESIS title', () => {
    render(<App />);
    expect(screen.getByText(/INK SYNTHESIS/i)).toBeInTheDocument();
  });

  it('renders the generator card', () => {
    render(<App />);
    expect(screen.getByText(/Generate Design/i)).toBeInTheDocument();
  });

  it('renders the machine interface card', () => {
    render(<App />);
    expect(screen.getByText(/Machine Interface/i)).toBeInTheDocument();
  });
});
