import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Primary from './primary';
import { mockProductReviews } from '../../../data/mockProductReviews';

// Mock only the SDK components (external dependency)
jest.mock('@dutchiesdk/ecommerce-extensions-sdk', () => ({
  RemoteBoundaryComponent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Primary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Review Summary', () => {
    it('should render the review summary section', () => {
      render(<Primary />);
      expect(screen.getByTestId('review-summary')).toBeInTheDocument();
    });

    it('should display the stars component', () => {
      render(<Primary />);
      const starsComponent = screen.getByTestId('review-stars');
      expect(starsComponent).toBeInTheDocument();
    });

    it('should display the correct number of reviews', () => {
      render(<Primary />);
      const reviewCount = screen.getByTestId('review-count');
      expect(reviewCount).toHaveTextContent(`${mockProductReviews.length} reviews`);
    });

    it('should show the submit review button initially', () => {
      render(<Primary />);
      const submitButton = screen.getByTestId('submit-review-button');
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Review Form Interaction', () => {
    it('should show review form when submit button is clicked', () => {
      render(<Primary />);

      const submitButton = screen.getByTestId('submit-review-button');
      fireEvent.click(submitButton);

      expect(screen.getByTestId('review-form-wrapper')).toBeInTheDocument();
    });

    it('should hide the submit button when review form is open', () => {
      render(<Primary />);

      const submitButton = screen.getByTestId('submit-review-button');
      fireEvent.click(submitButton);

      expect(screen.queryByTestId('submit-review-button')).not.toBeInTheDocument();
    });

    it('should not show review form initially', () => {
      render(<Primary />);

      expect(screen.queryByTestId('review-form-wrapper')).not.toBeInTheDocument();
    });
  });

  describe('Reviews List', () => {
    it('should render the reviews list', () => {
      render(<Primary />);
      expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    });
  });
});
