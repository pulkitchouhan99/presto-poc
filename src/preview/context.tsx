import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import {
  CommerceComponentsDataInterface,
  RemoteBoundaryComponent,
  RemoteModuleRegistry,
} from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockDataBridge } from '../data/mockDataBridge';

type PreviewContextValue = {
  components: PreviewComponents;
  theme: string;
  page: string;
  setPage: (page: string) => void;
  setTheme: (theme: string) => void;
  routeablePages: RemoteModuleRegistry['RouteablePages'];
  previewProps: {
    data: CommerceComponentsDataInterface;
  };
};

export type PreviewComponentWithProps = RemoteBoundaryComponent &
  React.ComponentType<{
    data: CommerceComponentsDataInterface;
  }>;

type PreviewComponents = {
  [K in keyof Omit<
    RemoteModuleRegistry,
    'RouteablePages' | 'StoreFrontCarouselInterstitials'
  >]?: PreviewComponentWithProps | null;
} & {
  StoreFrontCarouselInterstitials?: PreviewComponentWithProps[] | null;
};

type PreviewProviderProps = {
  children: ReactNode;
};

const PreviewContext = createContext<PreviewContextValue>({
  components: {
    StoreFrontHeader: null,
    StoreFrontNavigation: null,
    StoreFrontFooter: null,
    StoreFrontHero: null,
    ProductDetailsPrimary: null,
    StoreFrontCarouselInterstitials: null,
  },
  theme: '',
  page: '',
  setPage: () => {},
  setTheme: () => {},
  routeablePages: [],
  previewProps: {
    data: mockDataBridge,
  },
});

export function PreviewProvider({ children }: PreviewProviderProps) {
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('page') ?? 'home';
  });

  const [theme, setTheme] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('theme') ?? AVAILABLE_THEMES?.[0];
  });

  const [components, setComponents] = useState<PreviewComponents>({});
  const [routeablePages, setRouteablePages] = useState([]);

  const [previewProps, setPreviewProps] = useState({
    data: mockDataBridge,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('theme', theme);
    url.searchParams.set('page', page);
    window.history.replaceState({}, '', url);
  }, [theme, page]);

  useEffect(() => {
    if (!theme?.length) {
      return;
    }

    import(`../themes/${theme}`)
      .then((module) => {
        setComponents({
          StoreFrontHeader: module.default?.StoreFrontHeader,
          StoreFrontNavigation: module.default?.StoreFrontNavigation,
          StoreFrontFooter: module.default?.StoreFrontFooter,
          StoreFrontHero: module.default?.StoreFrontHero,
          ProductDetailsPrimary: module.default?.ProductDetailsPrimary,
          StoreFrontCarouselInterstitials: module.default?.StoreFrontCarouselInterstitials,
        });
        setRouteablePages(module.default?.RouteablePages);
      })
      .catch((error) => {
        console.error('Failed to import theme:', error);
      });

    import(`../themes/${theme}/mockDataBridge`)
      .then((module) => {
        setPreviewProps({
          data: module.mockDataBridge,
        });
      })
      .catch(() => {
        setPreviewProps({
          data: mockDataBridge,
        });
      });
  }, [theme]);

  return (
    <PreviewContext.Provider value={{ components, theme, page, setPage, setTheme, routeablePages, previewProps }}>
      {children}
    </PreviewContext.Provider>
  );
}

export const usePreview = () => useContext(PreviewContext);
