import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiLink } from '../data/strapi-types';
import { useStrapiHeader } from '../hooks/useStrapiContent';
import { getStrapiMedia } from '../config/strapi.config';

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: all 0.3s ease;

  ${(props) =>
    props.scrolled
      ? `
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  `
      : `
    background: rgba(26, 26, 26, 0.95);
    backdrop-filter: blur(10px);
  `}
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  .logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #fff;

    span {
      color: #4ade80;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: #4ade80;
    transition: width 0.3s ease;
  }

  &:hover {
    color: #fff;

    &::after {
      width: 100%;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled.button`
  position: relative;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s;

  svg {
    width: 22px;
    height: 22px;
  }

  &:hover {
    color: #4ade80;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background: #4ade80;
    color: #000;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const OrderButton = styled.button`
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: #000;
  border: none;
  padding: 0.75rem 1.75rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(74, 222, 128, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

const StoreFrontHeader: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const [scrolled, setScrolled] = useState(false);
  
  // Runtime CMS fetching - updates immediately!
  const { data: strapiData, loading, error } = useStrapiHeader();
  const headerData = strapiData || mockStrapiContent.header;
  
  console.log('Header - Strapi data:', strapiData);
  console.log('Header - Loading:', loading);
  console.log('Header - Error:', error);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (url: string) => {
    if (url === '/shop' || url === '/order-online') {
      actions.goToProductList({});
    } else if (url === '/about' || url === '/about-us') {
      actions.goToInfoPage();
    } else if (url === '/locations') {
      actions.goToStoreLocator();
    } else if (url === '/contact' || url === '/contact-us') {
      actions.goToStoreLocator();
    }
  };

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo onClick={() => actions.goToStoreFront()}>
          {headerData?.logo?.url ? (
            <img
              src={getStrapiMedia(headerData.logo.url) || undefined}
              alt={headerData.logo.alternativeText || 'Logo'}
              style={{ height: '40px', width: 'auto' }}
            />
          ) : (
            <>
              <div className='logo-icon'>🌿</div>
              <div className='logo-text'>
                HARVEST<span>.</span>
              </div>
            </>
          )}
        </Logo>

        <Navigation>
          {headerData?.navigation?.map((link: StrapiLink) => (
            <NavLink key={link.id} onClick={() => handleNavClick(link.url)}>
              {link.label}
            </NavLink>
          )) || (
            // Fallback navigation if no data
            <>
              <NavLink onClick={() => actions.goToProductList({})}>Shop</NavLink>
              <NavLink onClick={() => actions.goToInfoPage()}>About</NavLink>
            </>
          )}
        </Navigation>

        <Actions>
          <IconButton onClick={() => actions.goToSearch()}>
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </IconButton>

          <IconButton 
            onClick={() => actions.goToLogin()} 
            title="Login with Dutchie"
          >
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              />
            </svg>
          </IconButton>

          <IconButton onClick={() => actions.showCart()}>
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
            <span className='badge'>3</span>
          </IconButton>

          <OrderButton onClick={() => actions.goToProductList({})}>Order Online</OrderButton>

          <MobileMenuButton>
            <svg fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </MobileMenuButton>
        </Actions>
      </HeaderContent>
    </HeaderContainer>
  );
};

StoreFrontHeader.DataBridgeVersion = '1';

export default StoreFrontHeader;
