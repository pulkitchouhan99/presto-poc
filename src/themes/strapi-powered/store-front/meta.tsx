import React from 'react';
import { RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';

const StoreFrontMeta: RemoteBoundaryComponent = () => {
  return (
    <>
      <meta name="description" content="Premium Cannabis Dispensary - Quality products and exceptional service" />
      <meta name="keywords" content="cannabis, dispensary, marijuana, flower, edibles, concentrates" />
      <meta property="og:title" content="Premium Cannabis Dispensary" />
      <meta property="og:description" content="Discover our curated selection of high-quality cannabis products" />
      <meta property="og:type" content="website" />
    </>
  );
};

StoreFrontMeta.DataBridgeVersion = 1;

export default StoreFrontMeta;