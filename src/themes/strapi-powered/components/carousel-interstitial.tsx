import React, { useState } from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiCarouselItem } from '../data/strapi-types';
import { strapiContent } from '../data/strapi-content';
import { getStrapiMedia } from '../config/strapi.config';

const CarouselContainer = styled.section`
  padding: 4rem 0;
  background-color: #f8f9fa;
`;

const CarouselContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
`;

const CarouselTrack = styled.div<{ currentIndex: number }>`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(-${(props) => props.currentIndex * 100}%);
`;

const CarouselSlide = styled.div`
  min-width: 100%;
  position: relative;
  height: 400px;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
`;

const SlideTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SlideDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SlideLink = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  pointer-events: none;
`;

const ControlButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Indicator = styled.button<{ active: boolean }>`
  width: ${(props) => (props.active ? '24px' : '8px')};
  height: 8px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#007bff' : '#ccc')};
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? '#0056b3' : '#999')};
  }
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: white;
`;

const CarouselInterstitial: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems: any[] = strapiContent?.carousel || mockStrapiContent.carousel;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const handleLinkClick = (url: string) => {
    if (url.includes('/shop')) {
      actions.goToProductList({});
    } else if (url === '/specials') {
      actions.goToProductList({});
    }
  };

  if (!carouselItems || carouselItems.length === 0) {
    return null;
  }

  return (
    <CarouselContainer>
      <CarouselContent>
        <CarouselWrapper>
          <CarouselTrack currentIndex={currentIndex}>
            {carouselItems.map((item, index) => (
              <CarouselSlide key={item.id}>
                {item.image?.url ? (
                  <SlideImage src={getStrapiMedia(item.image.url) || ''} alt={item.image.alternativeText || item.title} />
                ) : (
                  <PlaceholderImage>{index + 1}</PlaceholderImage>
                )}
                <SlideContent>
                  <SlideTitle>{item.title}</SlideTitle>
                  {item.description && <SlideDescription>{item.description}</SlideDescription>}
                  {item.link && (
                    Array.isArray(item.link) ? (
                      item.link[0] && (
                        <SlideLink onClick={() => handleLinkClick(item.link[0].url)}>{item.link[0].label}</SlideLink>
                      )
                    ) : (
                      <SlideLink onClick={() => handleLinkClick(item.link.url)}>{item.link.label}</SlideLink>
                    )
                  )}
                </SlideContent>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          {carouselItems.length > 1 && (
            <CarouselControls>
              <ControlButton onClick={handlePrevious} aria-label='Previous slide'>
                ←
              </ControlButton>
              <ControlButton onClick={handleNext} aria-label='Next slide'>
                →
              </ControlButton>
            </CarouselControls>
          )}
        </CarouselWrapper>

        {carouselItems.length > 1 && (
          <CarouselIndicators>
            {carouselItems.map((_, index) => (
              <Indicator
                key={index}
                active={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </CarouselIndicators>
        )}
      </CarouselContent>
    </CarouselContainer>
  );
};

CarouselInterstitial.DataBridgeVersion = 1;

export default CarouselInterstitial;
