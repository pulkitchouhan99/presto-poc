import styled from 'styled-components';
import { RemoteBoundaryComponent, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';
import { ThemeWrapper } from '../components/theme-wrapper';
import { Links } from './links';

const Footer: RemoteBoundaryComponent = () => {
  return (
    <ThemeWrapper>
      <FooterWrapper>
        <FooterContainer>
          <FooterLinks>
            <FooterLink href={Links.main.contact} rel='noreferrer'>
              Contact Us
            </FooterLink>
            <FooterLink href={Links.main.careers}>Careers</FooterLink>
            <FooterLink href={Links.main.faqs} rel='noreferrer'>
              FAQs
            </FooterLink>
            <FooterLink href={Links.main.blog} rel='noreferrer'>
              Blog
            </FooterLink>
            <FooterLink href={Links.legal.privacy} rel='noreferrer'>
              Privacy Policy
            </FooterLink>
            <FooterLink href={Links.legal.terms} rel='noreferrer'>
              Terms and Conditions
            </FooterLink>
            <span>&copy; {new Date().getFullYear()}</span>
            <FooterLink href={Links.main.home} rel='noreferrer'>
              Good Day Farm Dispensary
            </FooterLink>
          </FooterLinks>
        </FooterContainer>
      </FooterWrapper>
    </ThemeWrapper>
  );
};

Footer.DataBridgeVersion = DataBridgeVersion;

export default Footer;

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
`;

const FooterContainer = styled.div`
  padding: 30px;
  text-align: center;
`;

const FooterLinks = styled.div`
  display: block;

  > span {
    display: inline-block;
    font-size: 19px;
    font-weight: bold;
    line-height: 30px;
    margin-right: 6px;
  }
`;

const FooterLink = styled.a`
  display: inline-block;
  font-size: 19px;
  font-weight: bold;
  line-height: 30px;
  text-decoration: none;
  transition: 0.3s ease-in-out;
  margin-right: 32px;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  &::after {
    content: '|';
    position: absolute;
    right: -16px;
    color: ${({ theme }) => theme.colors.white};
    top: 0;
    bottom: 0;
    margin: auto;
  }

  &:last-child,
  &:nth-child(6) {
    margin-right: 6px;

    &::after {
      content: '';
    }
  }
`;
