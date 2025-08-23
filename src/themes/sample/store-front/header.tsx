import { useState } from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../components/theme-wrapper';
import { VisuallyHidden } from '../components/visually-hidden';

import { Logo } from '../assets/logo';
import { Cart } from '../assets/cart';
import { Menu } from '../assets/menu';
import { Close } from '../assets/close';

const navLinks = [
  {
    label: 'Home',
    href: '',
  },
  {
    label: 'About',
    href: 'about',
  },
  {
    label: 'Contact',
    href: 'contact',
  },
];

const Header: RemoteBoundaryComponent = () => {
  const { location, user, actions, cart } = useDataBridge();

  if (!location) {
    return null;
  }

  const { chain, links } = location;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemeWrapper>
      <Wrapper>
        <Container>
          <Primary>
            <LogoLink href={links.website} data-testid='logo-link'>
              <Logo height={32} width={32} />
              <span>{chain}</span>
            </LogoLink>

            <PrimaryNavContainer isMenuOpen={isMenuOpen}>
              <Nav>
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={`${links.website}${link.href}`}>{link.label}</a>
                  </li>
                ))}
              </Nav>
            </PrimaryNavContainer>
          </Primary>

          <Secondary>
            <nav>
              <UtilityNav>
                <li>
                  {user ? (
                    <div data-testid='user-name'>Hi {user?.firstName}</div>
                  ) : (
                    <button onClick={() => actions.goToLogin()} data-testid='login-button'>
                      Login
                    </button>
                  )}
                </li>
                <li>
                  <CheckoutButton onClick={() => actions.goToCheckout()} data-testid='checkout-button'>
                    <Cart height={24} width={24} />
                    <VisuallyHidden>Go to checkout:</VisuallyHidden>
                    {cart?.items?.length}
                    <VisuallyHidden>Items in cart</VisuallyHidden>
                  </CheckoutButton>
                </li>
              </UtilityNav>
            </nav>
            <MenuButton onClick={toggleMenu}>
              <VisuallyHidden>Toggle Menu</VisuallyHidden>
              {isMenuOpen ? <Close height={24} width={24} /> : <Menu height={24} width={24} />}
            </MenuButton>
          </Secondary>
        </Container>
      </Wrapper>
    </ThemeWrapper>
  );
};

Header.DataBridgeVersion = DataBridgeVersion;

export default Header;

const Wrapper = styled.header`
  background: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.gray[100]};
  position: relative;

  a:hover {
    color: ${({ theme }) => theme.colors.blue[500]};
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[24]};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1248px;
  padding: ${({ theme }) => theme.spacing[24]};
`;

const Primary = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[48]};
`;

const LogoLink = styled.a`
  align-items: center;
  display: flex;
  font-weight: bold;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const PrimaryNavContainer = styled.nav<{ isMenuOpen: boolean }>`
  ${({ theme }) => theme.breakpoints.mdd} {
    background: ${({ theme }) => theme.colors.gray[900]};
    opacity: ${({ isMenuOpen }) => (isMenuOpen ? 1 : 0)};
    padding: ${({ theme }) => theme.spacing[24]};
    position: absolute;
    right: 0;
    top: 100%;
    transition: all 0.2s ease-in-out;
    visibility: ${({ isMenuOpen }) => (isMenuOpen ? 'visible' : 'hidden')};
    width: 200px;
    z-index: ${({ theme }) => theme.zIndices[100]};
  }
`;

const Nav = styled.ul`
  align-items: center;
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  gap: ${({ theme }) => theme.spacing[12]};
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.mdd} {
    flex-direction: column;
  }

  a {
    display: block;
    padding: ${({ theme }) => theme.spacing[8]} 0;
  }
`;

const Secondary = styled.div`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[24]};
`;

const UtilityNav = styled.ul`
  align-items: center;
  display: flex;
  gap: ${({ theme }) => theme.spacing[12]};
`;

const CheckoutButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.gray[900]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const MenuButton = styled.button`
  ${({ theme }) => theme.breakpoints.md} {
    display: none;
  }
`;
