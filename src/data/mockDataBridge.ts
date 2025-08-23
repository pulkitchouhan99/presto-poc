import { CartItem, CommerceComponentsDataInterface } from '@dutchiesdk/ecommerce-extensions-sdk';

type GoToIdOrCnameParameters = {
  id?: string;
  cname?: string;
};

type GoToProductListParameters = {
  brandCname?: string;
  brandId?: string;
  categoryCname?: string;
  categoryId?: string;
  collectionCname?: string;
  collectionId?: string;
};

const mockDayHours = {
  active: true,
  start: '09:00',
  end: '17:00',
};

const mockHoursSettings = {
  enabled: true,
  effectiveHours: {
    Monday: mockDayHours,
    Tuesday: mockDayHours,
    Wednesday: mockDayHours,
    Thursday: mockDayHours,
    Friday: mockDayHours,
    Saturday: mockDayHours,
    Sunday: mockDayHours,
  },
};

const mockOrderTypesConfig = {
  enableASAPOrdering: true,
  enableScheduledOrdering: false,
  enableAfterHoursOrdering: true,
};

export const mockDataBridge: CommerceComponentsDataInterface = {
  dataLoaders: {
    brands: async () => [],
    categories: async () => [
      {
        id: '1',
        cname: 'flower',
        name: 'Flower',
      },
      {
        id: '2',
        cname: 'edibles',
        name: 'Edibles',
      },
    ],
    collections: async () => [],
    integrationValue: async () => {
      return 'custom value';
    },
    locations: async () => [],
    products: async () => [],
    specials: async () => [],
  },
  actions: {
    addToCart: async (item: CartItem) => {
      console.log('addToCart', item);
    },
    clearCart: () => {
      console.log('clearCart');
    },
    goToBrand: ({ id, cname }: GoToIdOrCnameParameters) => {
      console.log('goToBrand', id, cname);
    },
    goToBrandList: () => {
      console.log('goToBrandList');
    },
    goToCategory: ({ id, cname }: GoToIdOrCnameParameters) => {
      console.log('goToCategory', id, cname);
    },
    goToCheckout: () => {
      console.log('goToCheckout');
    },
    goToCollection: ({ id, cname }: GoToIdOrCnameParameters) => {
      console.log('goToCollection', id, cname);
    },
    goToLogin: () => {
      console.log('goToLogin');
    },
    goToLoyalty: () => {
      console.log('goToLoyalty');
    },
    goToProductDetails: ({ id, cname }: GoToIdOrCnameParameters) => {
      console.log('goToProductDetails', id, cname);
    },
    goToProductList: ({
      brandCname,
      brandId,
      categoryCname,
      categoryId,
      collectionCname,
      collectionId,
    }: GoToProductListParameters) => {
      console.log('goToProductList', categoryId, categoryCname, brandId, brandCname, collectionId, collectionCname);
    },
    goToRegister: () => {
      console.log('goToRegister');
    },
    goToSearch: (searchTerm?: string) => {
      console.log('goToSearch', searchTerm);
    },
    goToStore: ({ id, cname }: GoToIdOrCnameParameters) => {
      console.log('goToStore', id, cname);
    },
    goToStoreBrowser: () => {
      console.log('goToStoreBrowser');
    },
    goToStoreFront: () => {
      console.log('goToStoreFront');
    },
    goToStoreLocator: () => {
      console.log('goToStoreLocator');
    },
    hideCart: () => {
      console.log('hideCart');
    },
    removeFromCart: async (item: CartItem) => {
      console.log('removeFromCart', item);
    },
    showCart: () => {
      console.log('showCart');
    },
    updateCartItem: (existingItem: CartItem, newItem: CartItem) => {
      console.log('updateCartItem', existingItem, newItem);
    },
    updatePricingType: (pricingType: 'med' | 'rec') => {
      console.log('updatePricingType', pricingType);
    },
    goToInfoPage: () => {
      console.log('goToInfoPage');
    },
  },
  location: {
    id: '1',
    status: 'active',
    name: 'Test Location',
    cname: 'Test Location',
    address: {
      street1: '123 Main St',
      street2: 'Apt 1',
      city: 'Anytown',
      state: 'CA',
      stateAbbreviation: 'CA',
      zip: '12345',
    },
    phone: '123-456-7890',
    email: 'test@test.com',
    chain: 'My Awesome Dispensary Chain',
    hours: {
      inStorePickup: mockHoursSettings,
      curbsidePickup: mockHoursSettings,
      driveThruPickup: undefined,
      delivery: mockHoursSettings,
    },
    medDispensary: true,
    orderTypes: {
      pickup: true,
      inStorePickup: true,
      curbsidePickup: true,
      driveThruPickup: false,
      delivery: true,
      kiosk: false,
    },
    images: {
      logo: '',
    },
    links: {
      website: '/',
      storeFrontRoot: '',
    },
    orderTypesConfig: {
      inStorePickup: mockOrderTypesConfig,
      curbsidePickup: mockOrderTypesConfig,
      driveThruPickup: undefined,
      delivery: mockOrderTypesConfig,
      offerAnyPickupService: true,
      offerDeliveryService: true,
    },
    recDispensary: true,
  },
  user: undefined,
  cart: undefined,
  menuContext: 'store-front',
};
