import React from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiHero } from '../data/strapi-types';
import { strapiContent } from '../data/strapi-content';
import { getStrapiMedia } from '../config/strapi.config';

interface HeroContainerProps {
  backgroundImage?: string;
  backgroundColor?: string;
  hasOverlay?: boolean;
  overlayOpacity?: number;
}

const HeroContainer = styled.section<HeroContainerProps>`
  position: relative;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.backgroundColor || '#f8f9fa'};
  ${props => props.backgroundImage && `
    background-image: url(${props.backgroundImage});
    background-size: cover;
    background-position: center;
  `}
  
  ${props => props.hasOverlay && `
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, ${props.overlayOpacity || 0.5});
    }
  `}
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  color: ${props => props.theme?.darkBackground ? '#ffffff' : '#333333'};
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background-color: #007bff;
          color: white;
          border: none;
          &:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background-color: #6c757d;
          color: white;
          border: none;
          &:hover {
            background-color: #5a6268;
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${props.theme?.darkBackground ? 'white' : '#007bff'};
          border: 2px solid ${props.theme?.darkBackground ? 'white' : '#007bff'};
          &:hover {
            background-color: ${props.theme?.darkBackground ? 'rgba(255,255,255,0.1)' : 'rgba(0,123,255,0.1)'};
          }
        `;
      default:
        return '';
    }
  }}
`;

const StoreFrontHero: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const heroData: any = strapiContent?.hero || mockStrapiContent.hero;

  const handleCTAClick = (url: string) => {
    if (url === '/shop' || url.startsWith('/shop')) {
      actions.goToProductList({});
    } else if (url === '/about') {
      actions.goToInfoPage();
    } else if (url === '/specials') {
      actions.goToProductList({});
    }
  };

  const theme = {
    darkBackground: heroData.backgroundColor === '#1a1a1a' || heroData.overlay
  };

  return (
    <HeroContainer
      backgroundImage={heroData.backgroundImage?.url ? getStrapiMedia(heroData.backgroundImage.url) : undefined}
      backgroundColor={heroData.backgroundColor}
      hasOverlay={heroData.overlay}
      overlayOpacity={heroData.overlayOpacity}
    >
      <HeroContent theme={theme}>
        <HeroTitle>{heroData.title}</HeroTitle>
        {heroData.subtitle && <HeroSubtitle>{heroData.subtitle}</HeroSubtitle>}
        
        {heroData.ctaButtons && heroData.ctaButtons.length > 0 && (
          <ButtonGroup>
            {heroData.ctaButtons.map((button, index) => (
              <CTAButton
                key={index}
                variant={button.variant}
                onClick={() => handleCTAClick(button.url)}
                theme={theme}
              >
                {button.label}
              </CTAButton>
            ))}
          </ButtonGroup>
        )}
      </HeroContent>
    </HeroContainer>
  );
};

StoreFrontHero.DataBridgeVersion = 1;

export default StoreFrontHero;