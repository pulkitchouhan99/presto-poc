import { Cart, CartItem } from '@dutchiesdk/ecommerce-extensions-sdk';

const productCategories = ['Flower', 'Edible', 'Pre-Roll', 'Concentrate', 'Vape', 'Tincture', 'Topical'];
const productAdjectives = ['Premium', 'Organic', 'Artisanal', 'Potent', 'Smooth'];
const productSizes = ['1g', '2g', '5g', '10g', '50g', '100g'];

const randomArrayItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const formatPrice = (price: number): number => {
  return parseFloat(Number(price).toFixed(2));
};

export const generateMockCartItem = (): CartItem => {
  const randomAdjective = randomArrayItem(productAdjectives);
  const randomCategory = randomArrayItem(productCategories);
  const randomSize = randomArrayItem(productSizes);
  const randomId = Math.random().toString(36).substring(2, 15);
  const randomPrice = formatPrice((Math.floor(Math.random() * 19901) + 100) / 100);
  const randomQuantity = Math.floor(Math.random() * 5) + 1;

  return {
    productId: `product-${randomId}`,
    name: `${randomAdjective} ${randomCategory} ${randomSize}`,
    price: randomPrice,
    quantity: randomQuantity,
  };
};

export const generateMockCart = (numberOfItems: number): Cart => {
  const items = Array.from({ length: numberOfItems }, () => generateMockCartItem());

  return {
    items,
    total: formatPrice(items.reduce((acc, item) => acc + item.price * item.quantity, 0)),
    subtotal: formatPrice(items.reduce((acc, item) => acc + item.price * item.quantity, 0)),
    tax: 0,
    discount: 0,
  };
};
