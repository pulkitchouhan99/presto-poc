import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';
import { ThemeWrapper } from '../components/theme-wrapper';
import { Links } from './links';
import { Logo } from './assets/logo';
import { FacebookIcon } from './assets/facebook-icon';
import { InstagramIcon } from './assets/instagram-icon';
import WaveLarge from './assets/wave-large.webp';
import WaveMobile from './assets/wave-mobile.webp';

const Footer: RemoteBoundaryComponent = () => {
  const currentYear = new Date().getFullYear();

  const { location, menuContext } = useDataBridge();

  return (
    <ThemeWrapper>
      <div>
        <FooterMain>
          <FooterContainer>
            <FooterLogo>
              <a href={menuContext === 'kiosk' ? '#' : Links.main.home} rel='noreferrer'>
                <Logo />
              </a>
              {menuContext !== 'kiosk' && (
                <div>
                  <a href={Links.social.instagram}>
                    <InstagramIcon />
                  </a>
                  <a href={Links.social.facebook}>
                    <FacebookIcon />
                  </a>
                </div>
              )}
            </FooterLogo>
            {menuContext !== 'kiosk' && (
              <>
                <FooterLinks>
                  <a href={Links.main.home} rel='noreferrer'>
                    Home
                  </a>
                  <a href={Links.main.delivery} rel='noreferrer'>
                    Delivery
                  </a>
                  <a href={Links.main.rewards}>NOLA Buds</a>
                  <a href={Links.main.contact} rel='noreferrer'>
                    Contact
                  </a>
                </FooterLinks>
                <FooterLinks>
                  <a href={location?.links.storeFrontRoot} rel='noreferrer'>
                    Shop
                  </a>
                  <a href={Links.main.goodCannaNow}>GoodCannaNow</a>
                  <a href={Links.main.dispensaries} rel='noreferrer'>
                    Our Dispensaries
                  </a>
                </FooterLinks>
              </>
            )}
          </FooterContainer>
        </FooterMain>
        <FooterBottom>
          <FooterBottomContainer>
            {menuContext !== 'kiosk' && (
              <div>
                <a href={Links.legal.privacy} rel='noreferrer'>
                  Privacy Policy
                </a>
                <a href={Links.legal.terms} rel='noreferrer'>
                  Terms of Service
                </a>
              </div>
            )}
            <p>&copy; {currentYear} NOLA Cannabis Company. All rights reserved.</p>
          </FooterBottomContainer>
        </FooterBottom>
      </div>
    </ThemeWrapper>
  );
};

Footer.DataBridgeVersion = DataBridgeVersion;

export default Footer;

const FooterMain = styled.div`
  background-color: ${({ theme }) => theme.colors.cream};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 41px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${WaveMobile});

    @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      height: 21px;
      background-image: url(${WaveLarge});
    }
  }
`;

const FooterContainer = styled.div`
  padding: 70px 30px 40px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 80px 60px;
    gap: 20px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}px) {
    gap: 60px;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding-bottom: 30px;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md - 1}px) {
    border-bottom: 2px solid ${({ theme }) => theme.colors.red};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-grow: 1;
  }

  > a > svg {
    width: 100%;
    max-width: 460px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    > a {
      background-color: ${({ theme }) => theme.colors.red};
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100px;

      @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
        width: 46px;
        height: 46px;
      }

      &:first-child {
        > svg {
          width: 35px;

          @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
            width: 22px;
          }

          path {
            fill: ${({ theme }) => theme.colors.white};
          }
        }
      }

      &:last-child {
        > svg {
          fill: ${({ theme }) => theme.colors.white};
          width: 22px;

          @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
            width: 14px;
          }
        }
      }
    }
  }
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    align-items: flex-start;

    &:last-child {
      flex-grow: 1;
    }
  }

  > a {
    font-family: 'tt-travels-next', sans-serif;
    color: ${({ theme }) => theme.colors.red};
    font-size: 26px;
    font-weight: 600;
    text-decoration: none;
    line-height: 49px;
    display: inline-block;

    @media (max-width: ${({ theme }) => theme.breakpoints.md - 1}px) {
      border-bottom: 2px solid ${({ theme }) => theme.colors.red};
    }
  }
`;

const FooterBottom = styled.div`
  background-color: ${({ theme }) => theme.colors.red};
`;

const FooterBottomContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 20px 10px;
  gap: 20px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 11px;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      gap: 20px;
    }

    > a {
      color: ${({ theme }) => theme.colors.white};
      font-size: 12px;
      font-weight: 600;
      text-decoration: none;

      @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
        font-size: 16px;
      }
    }
  }

  > p {
    color: ${({ theme }) => theme.colors.white};
    font-size: 12px;
    font-weight: 600;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}px) {
      font-size: 16px;
      display: inline-block;
    }
  }
`;
