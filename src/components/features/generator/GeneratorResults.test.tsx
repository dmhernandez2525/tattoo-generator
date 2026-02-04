import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GeneratorResults } from './GeneratorResults';
import type { TattooStyle } from '@/hooks/use-tattoo-generator';

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: TattooStyle;
}

const mockImages: GeneratedImage[] = [
  {
    id: '1',
    url: 'https://example.com/image1.png',
    prompt: 'Dragon design',
    style: 'Cyberpunk',
  },
  {
    id: '2',
    url: 'https://example.com/image2.png',
    prompt: 'Rose tattoo',
    style: 'Traditional',
  },
  {
    id: '3',
    url: 'https://example.com/image3.png',
    prompt: 'Geometric wolf',
    style: 'Geometric',
  },
];

describe('GeneratorResults', () => {
  it('should return null when images array is empty', () => {
    const { container } = render(<GeneratorResults images={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render images when provided', () => {
    render(<GeneratorResults images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(3);
  });

  it('should display image with correct alt text', () => {
    render(<GeneratorResults images={mockImages} />);
    expect(screen.getByAltText('Dragon design')).toBeInTheDocument();
    expect(screen.getByAltText('Rose tattoo')).toBeInTheDocument();
    expect(screen.getByAltText('Geometric wolf')).toBeInTheDocument();
  });

  it('should display image with correct src', () => {
    render(<GeneratorResults images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.png');
    expect(images[1]).toHaveAttribute('src', 'https://example.com/image2.png');
  });

  it('should display style tags', () => {
    render(<GeneratorResults images={mockImages} />);
    expect(screen.getByText('Cyberpunk')).toBeInTheDocument();
    expect(screen.getByText('Traditional')).toBeInTheDocument();
    expect(screen.getByText('Geometric')).toBeInTheDocument();
  });

  it('should display numbered index for each image', () => {
    render(<GeneratorResults images={mockImages} />);
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('should format index with leading zero for single digits', () => {
    const firstImage = mockImages[0];
    render(<GeneratorResults images={firstImage ? [firstImage] : []} />);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('should not add leading zero for double digit index', () => {
    const manyImages: GeneratedImage[] = [];
    for (let i = 0; i < 12; i++) {
      manyImages.push({
        id: `img-${i}`,
        url: `https://example.com/image${i}.png`,
        prompt: `Image ${i}`,
        style: 'Cyberpunk',
      });
    }
    render(<GeneratorResults images={manyImages} />);
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('should render download button for each image', () => {
    render(<GeneratorResults images={mockImages} />);
    const downloadButtons = screen.getAllByRole('button').filter((button) =>
      button.querySelector('svg')
    );
    // At least one button per image (download, share, imprint)
    expect(downloadButtons.length).toBeGreaterThanOrEqual(3);
  });

  it('should render IMPRINT button for each image', () => {
    render(<GeneratorResults images={mockImages} />);
    const imprintButtons = screen.getAllByRole('button', { name: /IMPRINT/i });
    expect(imprintButtons).toHaveLength(3);
  });

  it('should render with grid layout', () => {
    const { container } = render(<GeneratorResults images={mockImages} />);
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid).toHaveClass('grid-cols-1');
    expect(grid).toHaveClass('md:grid-cols-2');
    expect(grid).toHaveClass('lg:grid-cols-3');
  });

  it('should render cards for each image', () => {
    render(<GeneratorResults images={mockImages} />);
    // Cards should have aspect-square class
    const { container } = render(<GeneratorResults images={mockImages} />);
    const cards = container.querySelectorAll('.aspect-square');
    expect(cards.length).toBeGreaterThanOrEqual(3);
  });

  it('should handle single image', () => {
    const firstImage = mockImages[0];
    render(<GeneratorResults images={firstImage ? [firstImage] : []} />);
    expect(screen.getByAltText('Dragon design')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('should work with all tattoo styles', () => {
    const allStyleImages: GeneratedImage[] = [
      { id: '1', url: 'https://example.com/1.png', prompt: 'Test 1', style: 'Cyberpunk' as const },
      { id: '2', url: 'https://example.com/2.png', prompt: 'Test 2', style: 'Traditional' as const },
      { id: '3', url: 'https://example.com/3.png', prompt: 'Test 3', style: 'Minimalist' as const },
      { id: '4', url: 'https://example.com/4.png', prompt: 'Test 4', style: 'Geometric' as const },
      { id: '5', url: 'https://example.com/5.png', prompt: 'Test 5', style: 'Watercolor' as const },
      { id: '6', url: 'https://example.com/6.png', prompt: 'Test 6', style: 'Tribal' as const },
      { id: '7', url: 'https://example.com/7.png', prompt: 'Test 7', style: 'Japanese' as const },
    ];

    render(<GeneratorResults images={allStyleImages} />);

    expect(screen.getByText('Cyberpunk')).toBeInTheDocument();
    expect(screen.getByText('Traditional')).toBeInTheDocument();
    expect(screen.getByText('Minimalist')).toBeInTheDocument();
    expect(screen.getByText('Geometric')).toBeInTheDocument();
    expect(screen.getByText('Watercolor')).toBeInTheDocument();
    expect(screen.getByText('Tribal')).toBeInTheDocument();
    expect(screen.getByText('Japanese')).toBeInTheDocument();
  });
});
