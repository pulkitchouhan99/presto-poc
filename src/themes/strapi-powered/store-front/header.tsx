import React from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent } from '../data/strapi-types';
import { getStrapiMedia } from '../config/strapi.config';
import ThemeWrapper from '../components/theme-wrapper';

import { strapiContent } from '../data/strapi-content';

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;

  &:hover {
    color: #007bff;
  }
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.variant === 'primary'
      ? `
    background-color: #007bff;
    color: white;
    &:hover {
      background-color: #0056b3;
    }
  `
      : `
    background-color: transparent;
    color: #007bff;
    border: 2px solid #007bff;
    &:hover {
      background-color: #007bff;
      color: white;
    }
  `}
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StoreFrontHeader: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();

  // Use Strapi content if available, fallback to mock data
  const headerData = strapiContent?.header || mockStrapiContent.header;

  const handleNavClick = (url: string) => {
    if (url === '/shop') {
      actions.goToProductList({});
    } else if (url === '/about') {
      actions.goToInfoPage();
    } else if (url === '/locations') {
      actions.goToStoreLocator();
    }
  };

  return (
    <ThemeWrapper>
      <HeaderContainer>
        <HeaderContent>
          <Logo onClick={() => actions.goToStoreFront()}>
            {headerData.logo.url ? (
              <img
                src={getStrapiMedia(headerData.logo.url) || ''}
                alt={headerData.logo.alternativeText || 'Logo'}
                style={{ height: '40px' }}
              />
            ) : (
              headerData.logo.alternativeText || 'Logo'
            )}
          </Logo>

          <Navigation>
            {headerData?.navigation?.links?.map((link) => (
              <NavLink key={link.id} onClick={() => handleNavClick(link.url)}>
                {link.label}
              </NavLink>
            ))}

            {headerData.ctaButton &&
              (Array.isArray(headerData.ctaButton) ? (
                headerData.ctaButton[0] && (
                  <CTAButton
                    variant={headerData.ctaButton[0].variant}
                    onClick={() => handleNavClick(headerData.ctaButton[0].url)}
                  >
                    {headerData.ctaButton[0].label}
                  </CTAButton>
                )
              ) : (
                <CTAButton
                  variant={headerData.ctaButton.variant}
                  onClick={() => handleNavClick(headerData.ctaButton.url)}
                >
                  {headerData.ctaButton.label}
                </CTAButton>
              ))}
          </Navigation>

          <MobileMenuButton>☰</MobileMenuButton>
        </HeaderContent>
      </HeaderContainer>
    </ThemeWrapper>
  );
};

StoreFrontHeader.DataBridgeVersion = 1;

export default StoreFrontHeader;
