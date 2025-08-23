import { createLazyRemoteBoundaryComponent, RemoteModuleRegistry } from '@dutchiesdk/ecommerce-extensions-sdk';

export default {
  StoreFrontHeader: createLazyRemoteBoundaryComponent(() => import(`./store-front/header`)),
  StoreFrontFooter: createLazyRemoteBoundaryComponent(() => import(`./store-front/footer`)),
} satisfies RemoteModuleRegistry;
