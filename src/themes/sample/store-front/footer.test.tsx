import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import Footer from './footer';

// Mock the SDK hook
jest.mock('@dutchiesdk/ecommerce-extensions-sdk', () => ({
  useDataBridge: jest.fn(),
  RemoteBoundaryComponent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseDataBridge = useDataBridge as jest.MockedFunction<any>;

describe('Footer Component', () => {
  const mockDataBridge = {
    location: {
      address: {
        street1: '123 Main St',
        street2: 'Suite 100',
        city: 'Denver',
        state: 'CO',
        zip: '80202',
      },
      phone: '(555) 123-4567',
      email: 'info@example.com',
    },
  };

  beforeEach(() => {
    mockUseDataBridge.mockReturnValue(mockDataBridge);
  });

  it('should render null when location is not available', () => {
    mockUseDataBridge.mockReturnValueOnce({
      location: null,
    });

    const { container } = render(<Footer />);
    expect(container.firstChild).toBeNull();
  });

  describe('Address Section', () => {
    it('should render address when location address exists', () => {
      render(<Footer />);

      expect(screen.getByTestId('address-link')).toHaveTextContent('123 Main St, Suite 100');
      expect(screen.getByTestId('address-link')).toHaveTextContent('Denver, CO, 80202');
    });

    it('should create a correct Google Maps link with the address', () => {
      render(<Footer />);

      const addressLink = screen.getByTestId('address-link');
      const expectedUrl = 'https://maps.google.com/?q=123 Main St, Suite 100, Denver, CO, 80202';

      expect(addressLink).toHaveAttribute('href', expectedUrl);
    });

    it('should not render address section when location address does not exist', () => {
      mockUseDataBridge.mockReturnValueOnce({
        location: {
          phone: '(555) 123-4567',
          email: 'info@example.com',
        },
      });

      render(<Footer />);

      expect(screen.queryByTestId('address-section')).not.toBeInTheDocument();
    });
  });

  describe('Contact Information', () => {
    it('should render phone number with correct tel link', () => {
      render(<Footer />);

      expect(screen.getByTestId('contact-section')).toBeInTheDocument();

      const phoneLink = screen.getByTestId('phone-link');
      expect(phoneLink).toBeInTheDocument();
      expect(phoneLink).toHaveAttribute('href', 'tel:(555) 123-4567');
    });

    it('should render email with correct mailto link', () => {
      render(<Footer />);

      const emailLink = screen.getByTestId('email-link');
      expect(emailLink).toBeInTheDocument();
      expect(emailLink).toHaveAttribute('href', 'mailto:info@example.com');
    });
  });
});
