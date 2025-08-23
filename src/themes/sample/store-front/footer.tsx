import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../components/theme-wrapper';
import { VisuallyHidden } from '../components/visually-hidden';

import { Facebook } from '../assets/facebook';
import { Instagram } from '../assets/instagram';
import { Twitter } from '../assets/twitter';

const Footer: RemoteBoundaryComponent = () => {
  const { location } = useDataBridge();

  if (!location) {
    return null;
  }

  return (
    <ThemeWrapper>
      <Wrapper>
        <Container>
          <Primary>
            {location?.address && (
              <div data-testid='address-section'>
                <Heading>Visit us at:</Heading>
                <a
                  data-testid='address-link'
                  href={`https://maps.google.com/?q=${[
                    location.address.street1,
                    location.address.street2,
                    location.address.city,
                    location.address.state,
                    location.address.zip,
                  ].join(', ')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {[location.address.street1, location.address.street2].join(', ')}
                  <br />
                  {[location.address.city, location.address.state, location.address.zip].join(', ')}
                </a>
              </div>
            )}

            {(location.phone || location.email) && (
              <dl data-testid='contact-section'>
                <Heading as='dt'>24/7 Support:</Heading>

                {location.phone && (
                  <dd>
                    <a data-testid='phone-link' href={`tel:${location.phone}`}>
                      {location.phone}
                    </a>
                  </dd>
                )}
                {location.email && (
                  <dd>
                    <a data-testid='email-link' href={`mailto:${location.email}`}>
                      {location.email}
                    </a>
                  </dd>
                )}
              </dl>
            )}
          </Primary>

          <Social>
            <SocialHeading as='dt'>Connect with us:</SocialHeading>
            <dd>
              <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
                <VisuallyHidden>Facebook</VisuallyHidden>
                <Facebook height={36} width={36} />
              </a>
            </dd>
            <dd>
              <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
                <VisuallyHidden>Instagram</VisuallyHidden>
                <Instagram height={36} width={36} />
              </a>
            </dd>
            <dd>
              <a href='https://x.com/' target='_blank' rel='noopener noreferrer'>
                <VisuallyHidden>Twitter</VisuallyHidden>
                <Twitter height={36} width={36} />
              </a>
            </dd>
          </Social>
        </Container>
      </Wrapper>
    </ThemeWrapper>
  );
};

Footer.DataBridgeVersion = DataBridgeVersion;

export default Footer;

const Wrapper = styled.footer`
  background: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.gray[100]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[24]};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1248px;
  padding: ${({ theme }) => theme.spacing[24]};

  ${({ theme }) => theme.breakpoints.mdd} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[48]};
  }
`;

const Primary = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[48]};
`;

const Heading = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[20]};
  font-weight: bold;
  margin: 0 0 ${({ theme }) => theme.spacing[8]};
  white-space: nowrap;
`;

const Social = styled.div`
  column-gap: ${({ theme }) => theme.spacing[16]};
  display: flex;
  flex-wrap: wrap;

  ${({ theme }) => theme.breakpoints.md} {
    justify-content: flex-end;
  }

  a {
    display: block;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.blue[500]};
    }
  }
`;

const SocialHeading = styled(Heading)`
  width: 100%;

  ${({ theme }) => theme.breakpoints.md} {
    text-align: right;
  }
`;
