import React from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent, StrapiFooter } from '../data/strapi-types';
import { useStrapiFooter } from '../hooks/useStrapiContent';

const FooterContainer = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 4rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BrandSection = styled.div``;

const BrandName = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const BrandDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: #999;
  max-width: 300px;
`;

const FooterSection = styled.div``;

const SectionTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLink = styled.a`
  color: #999;
  text-decoration: none;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: #666;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  color: #999;
  transition: color 0.2s;

  &:hover {
    color: #fff;
  }
`;

const StoreFrontFooter: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();

  // Runtime CMS fetching - updates immediately!
  const { data: strapiData } = useStrapiFooter();
  const footerData: StrapiFooter = strapiData ||
    mockStrapiContent.footer || {
      sections: [],
      socialLinks: [],
      copyright: '© 2024 Harvest Cannabis. All rights reserved.',
    };

  const handleLinkClick = (url: string) => {
    if (url === '/shop' || url.startsWith('/shop/')) {
      const category = url.split('/')[2];
      if (category) {
        actions.goToCategory({ cname: category });
      } else {
        actions.goToProductList({});
      }
    } else if (url === '/about' || url === '/careers' || url === '/terms') {
      actions.goToInfoPage();
    } else if (url === '/contact' || url === '/faq') {
      actions.goToStoreLocator();
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <BrandSection>
            <BrandName>HARVEST</BrandName>
            {footerData.description && <BrandDescription>{footerData.description}</BrandDescription>}
          </BrandSection>

          {footerData.sections?.map((section, index) => (
            <FooterSection key={index}>
              <SectionTitle>{section?.title}</SectionTitle>
              <LinkList>
                {section?.links?.map((link) => (
                  <LinkItem key={link.id}>
                    <FooterLink onClick={() => handleLinkClick(link.url)}>{link.label}</FooterLink>
                  </LinkItem>
                ))}
              </LinkList>
            </FooterSection>
          ))}
        </FooterTop>

        <FooterBottom>
          <Copyright>{footerData.copyright || '© 2024 Harvest Cannabis. All rights reserved.'}</Copyright>

          {footerData.socialLinks && (
            <SocialLinks>
              {footerData.socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.platform}
                >
                  {social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}
                </SocialLink>
              ))}
            </SocialLinks>
          )}
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

StoreFrontFooter.DataBridgeVersion = '1';

export default StoreFrontFooter;
