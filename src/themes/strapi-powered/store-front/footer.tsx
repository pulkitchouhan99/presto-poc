import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { mockStrapiContent } from '../data/strapi-types';
import { strapiContent } from '../data/strapi-content';

const FooterContainer = styled.footer`
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div``;

const FooterDescription = styled.div`
  margin-bottom: 1rem;
  color: #b0b0b0;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
`;

const LinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 0.5rem;
`;

const FooterLink = styled.a`
  color: #b0b0b0;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #ffffff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: #333;
  border-radius: 50%;
  color: #ffffff;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #007bff;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 1rem;
  text-align: center;
  color: #b0b0b0;
  font-size: 0.875rem;
`;

const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, string> = {
    facebook: 'f',
    twitter: 'X',
    instagram: 'i',
    linkedin: 'in',
  };
  return <span>{icons[platform] || platform[0].toUpperCase()}</span>;
};

const StoreFrontFooter: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const footerData = strapiContent?.footer || mockStrapiContent.footer;

  const handleLinkClick = (url: string) => {
    if (url === '/shop' || url.startsWith('/shop/')) {
      const category = url.split('/')[2];
      if (category) {
        actions.goToCategory({ cname: category });
      } else {
        actions.goToProductList({});
      }
    } else if (url === '/about' || url === '/careers' || url === '/terms' || url === '/faq') {
      actions.goToInfoPage();
    } else if (url === '/contact') {
      actions.goToStoreLocator();
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterTop>
          <FooterSection>
            {footerData.description && <FooterDescription>{footerData.description}</FooterDescription>}
            {footerData.socialLinks && (
              <SocialLinks>
                {footerData.socialLinks.map((social, index) => (
                  <SocialLink key={index} href={social.url} target='_blank' rel='noopener noreferrer'>
                    <SocialIcon platform={social.platform} />
                  </SocialLink>
                ))}
              </SocialLinks>
            )}
          </FooterSection>

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

        {footerData.copyright && <FooterBottom>{footerData.copyright}</FooterBottom>}
      </FooterContent>
    </FooterContainer>
  );
};

StoreFrontFooter.DataBridgeVersion = 1;

export default StoreFrontFooter;
