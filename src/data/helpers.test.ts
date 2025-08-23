import { generateMockCartItem, generateMockCart } from './helpers';

describe('helpers', () => {
  describe('generateMockCartItem', () => {
    it('should generate a valid CartItem object', () => {
      const cartItem = generateMockCartItem();

      expect(cartItem).toHaveProperty('productId');
      expect(cartItem).toHaveProperty('name');
      expect(cartItem).toHaveProperty('price');
      expect(cartItem).toHaveProperty('quantity');
    });

    it('should generate price as a number', () => {
      const cartItem = generateMockCartItem();

      expect(typeof cartItem.price).toBe('number');
      expect(cartItem.price).toBeGreaterThan(0);
    });

    it('should generate price within expected range', () => {
      const cartItem = generateMockCartItem();

      expect(cartItem.price).toBeGreaterThanOrEqual(1);
      expect(cartItem.price).toBeLessThanOrEqual(200);
    });
  });

  describe('generateMockCart', () => {
    it('should generate a valid Cart object', () => {
      const cart = generateMockCart(3);

      expect(cart).toHaveProperty('items');
      expect(cart).toHaveProperty('total');
      expect(cart).toHaveProperty('subtotal');
      expect(cart).toHaveProperty('tax');
      expect(cart).toHaveProperty('discount');
    });

    it('should generate correct number of items', () => {
      const numberOfItems = 5;
      const cart = generateMockCart(numberOfItems);

      expect(cart.items).toHaveLength(numberOfItems);
    });

    it('should handle zero items', () => {
      const cart = generateMockCart(0);

      expect(cart.items).toHaveLength(0);
      expect(cart.total).toBe(0.0);
      expect(cart.subtotal).toBe(0.0);
    });
  });
});
