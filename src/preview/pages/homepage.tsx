import { Fragment } from 'react';
import styled from 'styled-components';
import { usePreview } from '../context';
import { createCarouselSequence } from '../helpers/homepage';

export const Homepage = () => {
  const { components, previewProps } = usePreview();
  const interstitialCount = components?.StoreFrontCarouselInterstitials?.length ?? 0;
  const numberOfCarousels = Math.max(interstitialCount, 3);

  const carousels = Array.from({ length: numberOfCarousels }, (_, index) => (
    <Carousel key={`carousel-${index}`}>Product Carousel</Carousel>
  ));

  const interstitials = components?.StoreFrontCarouselInterstitials?.map((Interstitial, index) => (
    <Interstitial key={`interstitial-${index}`} {...previewProps} />
  ));

  const carouselSequence = createCarouselSequence(carousels, interstitials);

  return (
    <>
      {components.StoreFrontHero && <components.StoreFrontHero {...previewProps} />}

      <PageWrapper>
        <HomepageBox>Dutchie Top Homepage Content</HomepageBox>

        {carouselSequence.map((item, index) => (
          <Fragment key={index}>{item}</Fragment>
        ))}
      </PageWrapper>
    </>
  );
};

const HomepageBox = styled.div`
  align-items: center;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  height: 200px;
  width: 100%;
`;

const Carousel = styled(HomepageBox)`
  margin-top: 32px;
`;

const PageWrapper = styled.div`
  margin: 0 auto;
  max-width: 1240px;
  padding: 0 20px;
`;
