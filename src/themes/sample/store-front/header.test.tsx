import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import Header from './header';

// Mock the SDK hook
jest.mock('@dutchiesdk/ecommerce-extensions-sdk', () => ({
  useDataBridge: jest.fn(),
  RemoteBoundaryComponent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseDataBridge = useDataBridge as jest.MockedFunction<any>;

const mockGoToLogin = jest.fn();
const mockGoToCheckout = jest.fn();

describe('Header Component', () => {
  const mockDataBridge = {
    location: {
      chain: 'Test Dispensary',
      links: {
        website: 'https://example.com',
      },
      orderTypes: {
        inStorePickup: true,
        delivery: true,
      },
    },
    user: null,
    actions: {
      goToLogin: mockGoToLogin,
      goToCheckout: mockGoToCheckout,
    },
    cart: {
      items: [{ id: 1 }, { id: 2 }],
    },
  };

  beforeEach(() => {
    mockUseDataBridge.mockReturnValue(mockDataBridge);
  });

  it('should render null when location is not available', () => {
    mockUseDataBridge.mockReturnValueOnce({
      ...mockDataBridge,
      location: null,
    });

    const { container } = render(<Header />);
    expect(container.firstChild).toBeNull();
  });

  it('should have a logo link that navigates to the homepage', () => {
    render(<Header />);

    const logoLink = screen.getByTestId('logo-link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', 'https://example.com');
  });

  describe('User', () => {
    it('should render a login button when user is not logged in', () => {
      render(<Header />);

      const loginButton = screen.getByTestId('login-button');
      expect(loginButton).toBeInTheDocument();
      fireEvent.click(loginButton);
      expect(mockGoToLogin).toHaveBeenCalled();
    });

    it('should render a user name when user is logged in', () => {
      const firstName = 'John';
      mockUseDataBridge.mockReturnValueOnce({
        ...mockDataBridge,
        user: { firstName },
      });
      render(<Header />);

      const userName = screen.getByTestId('user-name');
      expect(userName).toHaveTextContent(`Hi ${firstName}`);
    });
  });

  describe('Cart', () => {
    it('should render a cart button with the number of items in the cart', () => {
      const cartItems = 2;
      mockUseDataBridge.mockReturnValueOnce({
        ...mockDataBridge,
        cart: { items: Array.from({ length: cartItems }, (_, i) => ({ id: i })) },
      });
      render(<Header />);

      const cartButton = screen.getByTestId('checkout-button');
      expect(cartButton).toBeInTheDocument();
      expect(cartButton).toHaveTextContent(cartItems.toString());
      fireEvent.click(cartButton);
      expect(mockGoToCheckout).toHaveBeenCalled();
    });
  });
});
