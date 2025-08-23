import { OnAfterCheckoutData } from '@dutchiesdk/ecommerce-extensions-sdk';

const onAfterCheckout = (data: OnAfterCheckoutData) => {
  console.log('onAfterCheckout', data);
};

export const events = {
  onAfterCheckout,
};
