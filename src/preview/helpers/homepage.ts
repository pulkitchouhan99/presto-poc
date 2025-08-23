import { ReactNode } from 'react';

export const createCarouselSequence = (carousels: ReactNode[], interstitials: ReactNode[] | null | undefined) => {
  if (!carousels.length) return [];
  if (!interstitials || !interstitials.length) return carousels;

  const result: ReactNode[] = [];

  // Case 1: More interstitials than carousels
  // Start with interstitial, alternate, truncate naturally
  if (interstitials.length > carousels.length) {
    result.push(interstitials[0]);

    for (let i = 0; i < carousels.length; i++) {
      result.push(carousels[i]);

      // Add next interstitial if we have one
      if (i + 1 < interstitials.length) {
        result.push(interstitials[i + 1]);
      }
    }
  }
  // Case 2: More carousels than interstitials (or equal)
  // Calculate positions where interstitials should be placed
  else {
    const positions = [];

    // Use equal distribution when carousels divide evenly among multiple interstitials
    if (carousels.length % interstitials.length === 0 && interstitials.length > 1) {
      const carouselsPerInterstitial = carousels.length / interstitials.length;
      for (let i = 0; i < interstitials.length; i++) {
        positions.push(carouselsPerInterstitial * (i + 1));
      }
    } else {
      // Otherwise use sections approach
      const totalSections = interstitials.length + 1;
      const carouselsPerSection = Math.floor(carousels.length / totalSections);
      const extraCarousels = carousels.length % totalSections;

      let currentPosition = 0;
      for (let i = 0; i < interstitials.length; i++) {
        const sectionSize = carouselsPerSection + (i < extraCarousels ? 1 : 0);
        currentPosition += sectionSize;
        positions.push(currentPosition);
      }
    }

    let carouselIndex = 0;
    let interstitialIndex = 0;

    while (carouselIndex < carousels.length) {
      result.push(carousels[carouselIndex]);
      carouselIndex++;

      if (interstitialIndex < interstitials.length && carouselIndex === positions[interstitialIndex]) {
        result.push(interstitials[interstitialIndex]);
        interstitialIndex++;
      }
    }

    while (interstitialIndex < interstitials.length) {
      result.push(interstitials[interstitialIndex]);
      interstitialIndex++;
    }
  }

  return result;
};
