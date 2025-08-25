import { RemoteModuleRegistry, createLazyRemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const theme: RemoteModuleRegistry = {
  // Store Front Components
  StoreFrontHeader: createLazyRemoteBoundaryComponent(() => import('./store-front/header')),
  StoreFrontFooter: createLazyRemoteBoundaryComponent(() => import('./store-front/footer')),
  StoreFrontMeta: createLazyRemoteBoundaryComponent(() => import('./store-front/meta')),
  // StoreFrontNavigation: createLazyRemoteBoundaryComponent(() => import('./store-front/navigation')),
  StoreFrontHero: createLazyRemoteBoundaryComponent(() => import('./store-front/hero')),

  // Carousel Interstitials
  StoreFrontCarouselInterstitials: [
    createLazyRemoteBoundaryComponent(() => import('./components/intro-interstitial')),
    createLazyRemoteBoundaryComponent(() => import('./components/carousel')),
  ],

  // Routable Pages
  RouteablePages: [
    {
      path: '/about',
      component: createLazyRemoteBoundaryComponent(() => import('./pages/about')),
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
