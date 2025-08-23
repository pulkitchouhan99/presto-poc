import { Homepage } from './pages/homepage';
import { ProductDetail } from './pages/product-detail';
import { usePreview } from './context';

const routeMapping = [
  {
    path: 'home',
    component: Homepage,
  },
  {
    path: 'product',
    component: ProductDetail,
  },
];

export const availableRoutes = routeMapping.map((route) => route.path);

export const Router = () => {
  const { page, routeablePages } = usePreview();

  const allRoutes = [...routeMapping, ...(routeablePages ?? [])];
  const RouteComponent = allRoutes.find((route) => route.path === page)?.component;

  return RouteComponent ? <RouteComponent /> : <Homepage />;
};
