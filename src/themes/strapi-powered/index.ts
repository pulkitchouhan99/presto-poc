import { RemoteModuleRegistry, createLazyRemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const theme: RemoteModuleRegistry = {
  // Store Front Components
  StoreFrontHeader: createLazyRemoteBoundaryComponent(() => import('./store-front/header')),
  StoreFrontFooter: createLazyRemoteBoundaryComponent(() => import('./store-front/footer')),
  // StoreFrontMeta: createLazyRemoteBoundaryComponent(() => import('./store-front/meta')),
  // StoreFrontNavigation: createLazyRemoteBoundaryComponent(() => import('./store-front/navigation')),
  StoreFrontHero: createLazyRemoteBoundaryComponent(() => import('./store-front/hero')),

  // Carousel Interstitials
  StoreFrontCarouselInterstitials: [
    createLazyRemoteBoundaryComponent(() => import('./components/product-carousel')), // Product Carousel
    createLazyRemoteBoundaryComponent(() => import('./components/social-login-modal')), // Social Login
    createLazyRemoteBoundaryComponent(() => import('./components/runtime-test')), // TEST
    createLazyRemoteBoundaryComponent(() => import('./components/intro-interstitial')),
    createLazyRemoteBoundaryComponent(() => import('./components/carousel')),
  ],

  // Routable Pages
  RouteablePages: [
    {
      path: '/about',
      component: createLazyRemoteBoundaryComponent(() => import('./pages/about')),
    },
    {
      path: '/auth/callback',
      component: createLazyRemoteBoundaryComponent(() => import('./pages/auth-callback')),
    },
  ],

  // Events
  events: {
    onAfterCheckout: (data) => {
      console.log('Checkout completed:', data);
    },
  },
};

export default theme;
