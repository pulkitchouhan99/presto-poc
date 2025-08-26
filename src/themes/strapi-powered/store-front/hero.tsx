import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiHero } from '../data/strapi-types';
import { useStrapiHero } from '../hooks/useStrapiContent';
import { getStrapiMedia } from '../config/strapi.config';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HeroContainer = styled.section`
  position: relative;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const BackgroundImage = styled.div<{ imageUrl?: string }>`
  position: absolute;
  top: 0;
  right: -10%;
  width: 70%;
  height: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, #1a1a1a 0%, rgba(26, 26, 26, 0.4) 50%, transparent 100%);
    z-index: 1;
  }

  ${(props) =>
    props.imageUrl &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url(${props.imageUrl});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: contrast(1.1) brightness(0.9);
    }
  `}
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const HeroContent = styled.div`
  max-width: 700px;
  animation: ${fadeIn} 1s ease-out;
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #4ade80;
  margin-bottom: 1.5rem;

  &::before {
    content: '';
    width: 40px;
    height: 2px;
    background-color: #4ade80;
  }
`;

const MainTitle = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin: 0 0 2rem 0;

  span {
    display: block;

    &:nth-child(2) {
      color: #4ade80;
      font-size: 0.9em;
    }
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 3rem;
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 4rem;
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  position: relative;
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
    color: #000;
    box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(74, 222, 128, 0.4);
    }
  `
      : `
    background: transparent;
    color: #fff;
    border: 2px solid rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    
    &:hover {
      border-color: #4ade80;
      color: #4ade80;
    }
  `}
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 500px;
`;

const StatItem = styled.div`
  text-align: left;

  .number {
    font-size: 2.5rem;
    font-weight: 900;
    color: #4ade80;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 222, 128, 0.1) 0%, transparent 70%);
  filter: blur(40px);
  animation: float 20s ease-in-out infinite;

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(50px, -50px) scale(1.1);
    }
    50% {
      transform: translate(-50px, 50px) scale(0.9);
    }
    75% {
      transform: translate(30px, 30px) scale(1.05);
    }
  }
`;

const StoreFrontHero: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();

  // Runtime CMS fetching - updates immediately!
  const { data: strapiData, loading } = useStrapiHero();
  const heroData: StrapiHero = strapiData || mockStrapiContent.hero || {
    title: 'WELCOME TO\nPREMIUM\nCANNABIS',
    subtitle: '',
    eyebrow: '',
    ctaButtons: []
  };

  const handleCTAClick = (url: string) => {
    if (url === '/shop' || url.includes('shop')) {
      actions.goToProductList({});
    } else if (url === '/about') {
      actions.goToInfoPage();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <HeroContainer>
        <ContentWrapper>
          <HeroContent></HeroContent>
        </ContentWrapper>
      </HeroContainer>
    );
  }

  return (
    <HeroContainer>
      <BackgroundPattern />
      <FloatingElement style={{ top: '10%', right: '10%' }} />
      <FloatingElement style={{ bottom: '10%', left: '5%', animationDelay: '10s' }} />

      <BackgroundImage
        imageUrl={
          heroData?.backgroundImage?.url ? getStrapiMedia(heroData.backgroundImage.url) || undefined : undefined
        }
      />

      <ContentWrapper>
        <HeroContent>
          {heroData.eyebrow && <Eyebrow>{heroData.eyebrow}</Eyebrow>}

          <MainTitle>
            {heroData.title ? (
              heroData.title.split('\n').map((line: string, index: number) => <span key={index}>{line}</span>)
            ) : (
              <>
                <span>WELCOME TO</span>
                <span>PREMIUM</span>
                <span>CANNABIS</span>
              </>
            )}
          </MainTitle>

          {heroData?.subtitle && <Subtitle>{heroData.subtitle}</Subtitle>}

          <ButtonGroup>
            {heroData.ctaButtons?.map((button, index) => (
              <CTAButton
                key={index}
                variant={button.variant as 'primary' | 'secondary'}
                onClick={() => handleCTAClick(button.url)}
              >
                {button.label} →
              </CTAButton>
            ))}
          </ButtonGroup>

          <Stats>
            <StatItem>
              <div className='number'>500+</div>
              <div className='label'>Products</div>
            </StatItem>
            <StatItem>
              <div className='number'>4.9★</div>
              <div className='label'>Rating</div>
            </StatItem>
            <StatItem>
              <div className='number'>24/7</div>
              <div className='label'>Support</div>
            </StatItem>
          </Stats>
        </HeroContent>
      </ContentWrapper>
    </HeroContainer>
  );
};

StoreFrontHero.DataBridgeVersion = '1';

export default StoreFrontHero;
