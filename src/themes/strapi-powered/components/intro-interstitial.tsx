import { RemoteBoundaryComponent } from '@dutchiesdk/ecommerce-extensions-sdk';
import IntroSection from './page-sections/intro-section';
import { mockStrapiContent } from '../data/strapi-types';
import { strapiContent } from '../data/strapi-content';

const IntroInterstitial: RemoteBoundaryComponent = () => {
  const introData = strapiContent?.introSection || mockStrapiContent.introSection;

  return <IntroSection data={introData} />;
};

IntroInterstitial.DataBridgeVersion = '1';

export default IntroInterstitial;
