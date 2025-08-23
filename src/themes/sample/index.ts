import { createLazyRemoteBoundaryComponent, RemoteModuleRegistry } from '@dutchiesdk/ecommerce-extensions-sdk';
import { events } from './events';

const RouteablePages = [
  {
    path: '/terms',
    component: createLazyRemoteBoundaryComponent(() => import(`./pages/terms-of-service`)),
  },
  {
    path: '/about',
    component: createLazyRemoteBoundaryComponent(() => import(`./pages/about`)),
  },
  {
    path: '/about/careers',
    component: createLazyRemoteBoundaryComponent(() => import(`./pages/about/careers`)),
  },
];

export default {
  StoreFrontHeader: createLazyRemoteBoundaryComponent(() => import(`./store-front/header`)),
  StoreFrontFooter: createLazyRemoteBoundaryComponent(() => import(`./store-front/footer`)),
  StoreFrontMeta: createLazyRemoteBoundaryComponent(() => import(`./store-front/meta`)),
  StoreFrontNavigation: createLazyRemoteBoundaryComponent(() => import(`./store-front/navigation`)),
  StoreFrontHero: createLazyRemoteBoundaryComponent(() => import(`./store-front/hero`)),
  ProductDetailsMeta: createLazyRemoteBoundaryComponent(() => import(`./store-front/meta`)),
  ProductDetailsPrimary: createLazyRemoteBoundaryComponent(() => import(`./product-details/primary`)),
  StoreFrontCarouselInterstitials: [
    createLazyRemoteBoundaryComponent(() => import(`./store-front/homepage-interstitials/credit-cards`)),
    createLazyRemoteBoundaryComponent(() => import(`./store-front/homepage-interstitials/new-location`)),
  ],
  RouteablePages,
  events,
} satisfies RemoteModuleRegistry;
