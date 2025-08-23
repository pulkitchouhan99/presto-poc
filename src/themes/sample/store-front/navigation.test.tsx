import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDataBridge, useAsyncLoader } from '@dutchiesdk/ecommerce-extensions-sdk';
import Navigation from './navigation';

// Mock the SDK hooks
jest.mock('@dutchiesdk/ecommerce-extensions-sdk', () => ({
  useDataBridge: jest.fn(),
  useAsyncLoader: jest.fn(),
  RemoteBoundaryComponent: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseDataBridge = useDataBridge as jest.MockedFunction<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockUseAsyncLoader = useAsyncLoader as jest.MockedFunction<any>;

const mockGoToStoreFront = jest.fn();
const mockGoToCategory = jest.fn();
const mockGoToInfoPage = jest.fn();

describe('Navigation Component', () => {
  const mockDataBridge = {
    location: {
      name: 'Test Dispensary',
      orderTypes: {
        inStorePickup: true,
        curbsidePickup: false,
        driveThruPickup: true,
        delivery: true,
      },
    },
    actions: {
      goToStoreFront: mockGoToStoreFront,
      goToCategory: mockGoToCategory,
      goToInfoPage: mockGoToInfoPage,
    },
    dataLoaders: {
      categories: jest.fn(),
    },
  };

  const mockCategories = [
    { id: '1', name: 'Flower' },
    { id: '2', name: 'Edibles' },
    { id: '3', name: 'Concentrates' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDataBridge.mockReturnValue(mockDataBridge);
    mockUseAsyncLoader.mockReturnValue({
      data: mockCategories,
      isLoading: false,
    });
  });

  describe('null state', () => {
    it('should render null when categories are loading', () => {
      mockUseAsyncLoader.mockReturnValueOnce({
        data: null,
        isLoading: true,
      });

      const { container } = render(<Navigation />);

      expect(container.firstChild).toBeNull();
    });

    it('should render null when location is not available', () => {
      mockUseDataBridge.mockReturnValueOnce({
        ...mockDataBridge,
        location: null,
      });

      const { container } = render(<Navigation />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Categories Dropdown', () => {
    it('should render categories dropdown button when categories are available', () => {
      render(<Navigation />);

      const categoriesButton = screen.getByTestId('categories-dropdown-button');
      expect(categoriesButton).toBeInTheDocument();
    });

    it('should not render categories dropdown when categories are empty', () => {
      mockUseAsyncLoader.mockReturnValueOnce({
        data: [],
        isLoading: false,
      });

      render(<Navigation />);

      expect(screen.queryByTestId('categories-dropdown-button')).not.toBeInTheDocument();
    });

    it('should call goToCategory action when category button is clicked', () => {
      render(<Navigation />);

      const firstCategoryButton = screen.getByTestId('category-button-1');
      fireEvent.click(firstCategoryButton);

      expect(mockGoToCategory).toHaveBeenCalledWith({ id: '1' });
    });
  });

  describe('Order Types Display', () => {
    it('should render order types section', () => {
      render(<Navigation />);

      const orderTypes = screen.getByTestId('order-types');
      expect(orderTypes).toBeInTheDocument();
    });

    it('should display single order type correctly', () => {
      mockUseDataBridge.mockReturnValueOnce({
        ...mockDataBridge,
        location: {
          ...mockDataBridge.location,
          orderTypes: {
            inStorePickup: true,
            curbsidePickup: false,
            driveThruPickup: false,
            delivery: false,
          },
        },
      });

      render(<Navigation />);

      const orderTypes = screen.getByTestId('order-types');
      expect(orderTypes).toHaveTextContent('Available for In-Store Pickup');
    });

    it('should display multiple order types correctly', () => {
      render(<Navigation />);

      const orderTypes = screen.getByTestId('order-types');
      expect(orderTypes).toHaveTextContent('Available for In-Store Pickup, Drive-Thru Pickup & Delivery');
    });

    it('should handle empty order types', () => {
      mockUseDataBridge.mockReturnValueOnce({
        ...mockDataBridge,
        location: {
          ...mockDataBridge.location,
          orderTypes: {},
        },
      });

      render(<Navigation />);

      const orderTypes = screen.queryByTestId('order-types');
      expect(orderTypes).toBeNull();
    });
  });

  describe('Navigation Actions', () => {
    it('should call goToStoreFront when home button is clicked', () => {
      render(<Navigation />);

      const homeButton = screen.getByTestId('home-button');
      fireEvent.click(homeButton);

      expect(mockGoToStoreFront).toHaveBeenCalled();
    });

    it('should call goToInfoPage when info button is clicked', () => {
      render(<Navigation />);

      const infoButton = screen.getByTestId('info-button');
      fireEvent.click(infoButton);

      expect(mockGoToInfoPage).toHaveBeenCalled();
    });
  });
});
