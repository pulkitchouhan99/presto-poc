import { CommerceComponentsDataInterface } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockDataBridge as mockDataBridgeBase } from '../../data/mockDataBridge';
import { generateMockCart } from '../../data/helpers';

export const mockDataBridge: CommerceComponentsDataInterface = {
  ...mockDataBridgeBase,
  cart: generateMockCart(2),
};
