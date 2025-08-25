import React from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiCarouselItem } from '../data/strapi-types';
import { strapiContent } from '../data/strapi-content';
import { getStrapiMedia } from '../config/strapi.config';

const UpdatesSection = styled.section`
  background: #fff;
  position: relative;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 2rem 1rem 1rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: #000;
  line-height: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  position: relative;
  padding-right: 1.5rem;

  &::after {
    content: '→';
    position: absolute;
    right: 0;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: translateX(4px);
  }
`;

const ScrollContainer = styled.div`
  position: relative;
`;

const StickyCard = styled.div<{ index: number }>`
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  z-index: ${(props) => 10 + props.index};
  background: #fff;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

const CardContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    order: 2;
  }
`;

const UpdateNumber = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: #000;
  margin-bottom: 1rem;
  line-height: 1;
`;

const ContentSection = styled.div`
  position: relative;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background: #000;
  }
`;

const UpdateBadge = styled.div`
  display: inline-block;
  background: #4ade80;
  color: #000;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  align-self: flex-start;
`;

const UpdateTitle = styled.h3`
  font-size: 2.5rem;
  font-weight: 900;
  color: #000;
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const UpdateDescription = styled.p`
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 250px;
    order: 1;
  }
`;

const UpdateImage = styled.div<{ imageUrl?: string | null }>`
  width: 100%;
  height: 100%;
  background: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : 'linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)'};
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s ease;
`;

const Spacer = styled.div`
  @media (max-width: 768px) {
    height: 20vh;
  }
`;

const CarouselInterstitial: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const carouselItems = strapiContent?.carousel || mockStrapiContent.carousel;

  const handleLinkClick = (url: string) => {
    if (url.includes('/shop')) {
      actions.goToProductList({});
    }
  };

  const handleViewAll = () => {
    actions.goToProductList({});
  };

  const updateTypes = [
    'FIRST TIME PATIENT DEAL',
    'PLUS PLAY PODS $40 OTD!',
    'BRINGING HARVEST CLOSER: EXPANDING TO MORE CITIES NEAR YOU!',
    'LIMITED TIME OFFER',
  ];

  return (
    <UpdatesSection>
      <SectionHeader>
        <SectionTitle>
          LATEST
          <br />
          UPDATES
        </SectionTitle>
        <ViewAllLink onClick={handleViewAll}>VIEW ALL OF OUR PRODUCTS</ViewAllLink>
      </SectionHeader>

      <ScrollContainer>
        {carouselItems.map((item: StrapiCarouselItem, index: number) => (
          <React.Fragment key={item.id}>
            <StickyCard index={index}>
              <CardContent>
                <TextContent>
                  <UpdateNumber>{String(index + 1).padStart(2, '0')}</UpdateNumber>

                  <ContentSection>
                    <UpdateBadge>{index === 0 ? 'NEW' : index === 1 ? 'SALE' : 'UPDATE'}</UpdateBadge>
                    <UpdateTitle>{updateTypes[index % updateTypes.length]}</UpdateTitle>
                    <UpdateDescription>{item?.description?.toUpperCase()}</UpdateDescription>
                  </ContentSection>
                </TextContent>

                <ImageContainer>
                  <UpdateImage
                    imageUrl={item.image?.url ? getStrapiMedia(item.image.url) : null}
                    onClick={() =>
                      item.link && handleLinkClick(Array.isArray(item.link) ? item.link[0]?.url : item.link.url)
                    }
                  />
                </ImageContainer>
              </CardContent>
            </StickyCard>

            {/* Add spacing between cards */}
            {index < carouselItems.length - 1 && <Spacer />}
          </React.Fragment>
        ))}
      </ScrollContainer>
    </UpdatesSection>
  );
};

CarouselInterstitial.DataBridgeVersion = '1';

export default CarouselInterstitial;
