import React from 'react';
import styled from 'styled-components';
import { useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { getStrapiMedia } from '../../config/strapi.config';
import { StrapiImage } from '../../data/strapi-types';

interface StrapiRichTextChild {
  type: 'text';
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface StrapiRichTextBlock {
  type: 'paragraph' | 'heading' | 'list';
  children: StrapiRichTextChild[];
}

interface IntroSectionData {
  type?: 'intro';
  title: string;
  content: string | StrapiRichTextBlock[];
  images: StrapiImage[];
  ctaButton?:
    | {
        label: string;
        url: string;
        variant?: 'primary' | 'secondary' | 'outline';
      }
    | Array<{
        label: string;
        url: string;
        variant?: 'primary' | 'secondary' | 'outline';
      }>;
  layout?: 'images-bottom' | 'images-side' | 'images-grid';
  titleStyle?: 'large' | 'medium' | 'small';
  contentAlignment?: 'left' | 'center' | 'right';
  backgroundColor?: string;
  padding?: 'small' | 'medium' | 'large' | null;
}

const SectionContainer = styled.section<{ backgroundColor?: string; padding?: string }>`
  background: ${(props) => props.backgroundColor || '#ffffff'};
  padding: ${(props) => {
    switch (props.padding) {
      case 'small':
        return '3rem 0';
      case 'large':
        return '6rem 0';
      default:
        return '4rem 0';
    }
  }};
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ContentGrid = styled.div<{ layout?: string }>`
  display: grid;
  gap: 3rem;

  ${(props) => {
    switch (props.layout) {
      case 'images-side':
        return `
          grid-template-columns: 2fr 1fr;
          align-items: start;
          
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
          }
        `;
      default:
        return `
          grid-template-columns: 1fr;
        `;
    }
  }}
`;

const TextContent = styled.div<{ alignment?: string }>`
  text-align: ${(props) => props.alignment || 'left'};
  max-width: ${(props) => (props.alignment === 'center' ? '900px' : 'none')};
  margin: ${(props) => (props.alignment === 'center' ? '0 auto' : '0')};
`;

const Title = styled.h2<{ titleStyle?: string }>`
  font-size: ${(props) => {
    switch (props.titleStyle) {
      case 'large':
        return 'clamp(3rem, 6vw, 5rem)';
      case 'small':
        return 'clamp(1.5rem, 3vw, 2.5rem)';
      default:
        return 'clamp(2rem, 4vw, 3.5rem)';
    }
  }};
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  line-height: 1.2;
  text-transform: uppercase;

  .highlight {
    color: #4ade80;
  }
`;

const Content = styled.div`
  font-size: 1.125rem;
  line-height: 1.7;
  color: #4a5568;
  margin-bottom: 2.5rem;

  p {
    margin-bottom: 1.5rem;
  }

  strong {
    color: #1a1a1a;
    font-weight: 700;
  }
`;

const CTAButton = styled.button<{ variant?: 'primary' | 'secondary' | 'outline' }>`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin-bottom: 2rem;

  ${(props) => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
          color: #000;
          box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(74, 222, 128, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #e2e8f0;
          
          &:hover {
            border-color: #4ade80;
            color: #4ade80;
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #4ade80;
          border: 2px solid #4ade80;
          
          &:hover {
            background: #4ade80;
            color: #fff;
          }
        `;
      default:
        return `
          background: transparent;
          color: #4ade80;
          border: 2px solid #4ade80;
          text-decoration: underline;
          padding: 0.5rem 0;
          
          &:hover {
            color: #22c55e;
          }
        `;
    }
  }}
`;

const ImagesContainer = styled.div<{ layout?: string }>`
  display: grid;
  gap: 1.5rem;

  ${(props) => {
    switch (props.layout) {
      case 'images-side':
        return `
          grid-template-columns: 1fr;
        `;
      case 'images-grid':
        return `
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        `;
      default:
        return `
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          max-width: 100%;
          margin: 0 auto;
        `;
    }
  }}
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  /* aspect-ratio: 4/3; */
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

interface IntroSectionProps {
  data: IntroSectionData;
}

const IntroSection: React.FC<IntroSectionProps> = ({ data }) => {
  const { actions } = useDataBridge();

  const handleCTAClick = (url: string) => {
    if (url === '/shop' || url.includes('shop')) {
      actions.goToProductList({});
    } else if (url === '/about') {
      actions.goToInfoPage();
    }
  };

  // Function to highlight specific words in title
  const renderTitle = (title: string) => {
    // Convert words like "CANNABIS DISPENSARY" and "PREMIUM CANNABIS PRODUCTS" to highlighted
    const highlighted = title.replace(
      /(CANNABIS DISPENSARY|CANNABIS|PREMIUM CANNABIS PRODUCTS)/g,
      '<span class="highlight">$1</span>'
    );

    return <Title titleStyle={data.titleStyle} dangerouslySetInnerHTML={{ __html: highlighted }} />;
  };

  // Function to convert Strapi rich text to string
  const renderContent = (content: string | StrapiRichTextBlock[]) => {
    if (typeof content === 'string') {
      return content;
    }

    // Handle Strapi rich text format
    if (Array.isArray(content)) {
      return content
        .map((block) => {
          if (block.type === 'paragraph') {
            return block.children.map((child) => child.text).join('');
          }
          return '';
        })
        .join('\n\n');
    }

    return '';
  };

  // Handle single button or array of buttons
  const getCtaButton = () => {
    if (!data.ctaButton) return null;

    if (Array.isArray(data.ctaButton)) {
      return data.ctaButton[0]; // Take first button
    }

    return data.ctaButton;
  };

  const ctaButton = getCtaButton();

  return (
    <SectionContainer backgroundColor={data.backgroundColor} padding={data.padding || 'large'}>
      <ContentWrapper>
        <ContentGrid layout={data.layout}>
          <TextContent alignment={data.contentAlignment}>
            {renderTitle(data.title)}

            <Content>{renderContent(data.content)}</Content>

            {ctaButton && (
              <CTAButton variant={ctaButton.variant} onClick={() => handleCTAClick(ctaButton.url)}>
                {ctaButton.label}
              </CTAButton>
            )}
          </TextContent>

          {data.images && data.images.length > 0 && (
            <ImagesContainer layout={data.layout}>
              {data.images.map((image, index) => (
                <ImageContainer key={index}>
                  <Image
                    src={getStrapiMedia(image.url) || image.url}
                    alt={image.alternativeText || `Image ${index + 1}`}
                  />
                </ImageContainer>
              ))}
            </ImagesContainer>
          )}
        </ContentGrid>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default IntroSection;
