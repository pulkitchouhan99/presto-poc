import { createCarouselSequence } from './homepage';

describe('createCarouselSequence', () => {
  test('handles 3 interstitials and 2 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2'];
    const interstitials = ['Component 1', 'Component 2', 'Component 3'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Component 1', 'Carousel 1', 'Component 2', 'Carousel 2', 'Component 3']);
  });

  test('handles 5 interstitials and 2 carousels (truncates to avoid adjacency)', () => {
    const carousels = ['Carousel 1', 'Carousel 2'];
    const interstitials = ['Component 1', 'Component 2', 'Component 3', 'Component 4', 'Component 5'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Component 1', 'Carousel 1', 'Component 2', 'Carousel 2', 'Component 3']);
  });

  test('handles 1 interstitial and 4 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2', 'Carousel 3', 'Carousel 4'];
    const interstitials = ['Interstitial 1'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Carousel 1', 'Carousel 2', 'Interstitial 1', 'Carousel 3', 'Carousel 4']);
  });

  test('handles 1 interstitial and 5 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2', 'Carousel 3', 'Carousel 4', 'Carousel 5'];
    const interstitials = ['Interstitial 1'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Carousel 1', 'Carousel 2', 'Carousel 3', 'Interstitial 1', 'Carousel 4', 'Carousel 5']);
  });

  test('handles 2 interstitials and 6 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2', 'Carousel 3', 'Carousel 4', 'Carousel 5', 'Carousel 6'];
    const interstitials = ['Interstitial 1', 'Interstitial 2'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual([
      'Carousel 1',
      'Carousel 2',
      'Carousel 3',
      'Interstitial 1',
      'Carousel 4',
      'Carousel 5',
      'Carousel 6',
      'Interstitial 2',
    ]);
  });

  test('handles 3 interstitials and 6 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2', 'Carousel 3', 'Carousel 4', 'Carousel 5', 'Carousel 6'];
    const interstitials = ['Interstitial 1', 'Interstitial 2', 'Interstitial 3'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual([
      'Carousel 1',
      'Carousel 2',
      'Interstitial 1',
      'Carousel 3',
      'Carousel 4',
      'Interstitial 2',
      'Carousel 5',
      'Carousel 6',
      'Interstitial 3',
    ]);
  });

  test('handles empty interstitials', () => {
    const carousels = ['Carousel 1', 'Carousel 2'];
    const interstitials = null;

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Carousel 1', 'Carousel 2']);
  });

  test('handles empty carousels', () => {
    const carousels: string[] = [];
    const interstitials = ['Component 1', 'Component 2'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual([]);
  });

  test('handles equal number of carousels and interstitials', () => {
    const carousels = ['Carousel 1', 'Carousel 2', 'Carousel 3'];
    const interstitials = ['Component 1', 'Component 2', 'Component 3'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Carousel 1', 'Component 1', 'Carousel 2', 'Component 2', 'Carousel 3', 'Component 3']);
  });

  test('handles 1 interstitial and 2 carousels', () => {
    const carousels = ['Carousel 1', 'Carousel 2'];
    const interstitials = ['Interstitial 1'];

    const result = createCarouselSequence(carousels, interstitials);

    expect(result).toEqual(['Carousel 1', 'Interstitial 1', 'Carousel 2']);
  });
});
