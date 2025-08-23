import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import Hero from './hero';

// Mock the SDK hook
jest.mock('@dutchiesdk/ecommerce-extensions-sdk', () => ({
  useDataBridge: jest.fn(),
  RemoteBoundaryComponent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseDataBridge = useDataBridge as jest.MockedFunction<any>;

const mockGoToLogin = jest.fn();

describe('Hero Component', () => {
  const mockDataBridge = {
    user: null,
    actions: {
      goToLogin: mockGoToLogin,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDataBridge.mockReturnValue(mockDataBridge);
  });

  describe('User not logged in', () => {
    it('should render promotional message and join button when user is not logged in', () => {
      render(<Hero />);

      expect(screen.getByTestId('new-customer-message')).toBeInTheDocument();
      expect(screen.getByTestId('join-button')).toBeInTheDocument();
    });

    it('should call goToLogin action when join button is clicked', () => {
      render(<Hero />);

      const joinButton = screen.getByTestId('join-button');
      fireEvent.click(joinButton);

      expect(mockGoToLogin).toHaveBeenCalledTimes(1);
    });
  });

  describe('User logged in', () => {
    it('should render welcome message when user is logged in', () => {
      const firstName = 'John';
      mockUseDataBridge.mockReturnValue({
        ...mockDataBridge,
        user: { firstName },
      });

      render(<Hero />);

      expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
    });

    it('should handle user with empty firstName', () => {
      mockUseDataBridge.mockReturnValue({
        ...mockDataBridge,
        user: { firstName: '' },
      });

      render(<Hero />);

      expect(screen.getByTestId('new-customer-message')).toBeInTheDocument();
      expect(screen.getByTestId('join-button')).toBeInTheDocument();
    });

    it('should handle user with null firstName', () => {
      mockUseDataBridge.mockReturnValue({
        ...mockDataBridge,
        user: { firstName: null },
      });

      render(<Hero />);

      expect(screen.getByTestId('new-customer-message')).toBeInTheDocument();
      expect(screen.getByTestId('join-button')).toBeInTheDocument();
    });
  });
});
