import React, { useState } from 'react';
import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge } from '@dutchiesdk/ecommerce-extensions-sdk';
import { useStrapiProducts } from '../hooks/useStrapiContent';
import { StrapiProduct } from '../data/strapi-types';
import { getStrapiMedia } from '../config/strapi.config';

const CarouselSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const CarouselContainer = styled.div`
  position: relative;
  padding: 0 60px;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const CarouselTrack = styled.div<{ translateX: number }>`
  display: flex;
  gap: 1.5rem;
  transition: transform 0.4s ease;
  transform: translateX(${props => props.translateX}px);
`;

const ProductCard = styled.div`
  flex: 0 0 300px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  @media (max-width: 768px) {
    flex: 0 0 260px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  background: #f5f5f5;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const Badge = styled.div<{ variant?: string }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  background: ${props => {
    switch(props.variant) {
      case 'sale': return '#ef4444';
      case 'new': return '#4ade80';
      case 'limited': return '#f59e0b';
      case 'bestseller': return '#8b5cf6';
      default: return '#4ade80';
    }
  }};
  color: ${props => props.variant === 'new' ? '#000' : '#fff'};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 6px;
`;

const Discount = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const Brand = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  height: 2.8em;
  overflow: hidden;
`;

const PotencyInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Potency = styled.div`
  font-size: 0.875rem;
  color: #666;
  
  span {
    font-weight: 700;
    color: #4ade80;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
`;

const OldPrice = styled.div`
  font-size: 1.125rem;
  color: #999;
  text-decoration: line-through;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: #000;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(74, 222, 128, 0.3);
  }
`;

const CarouselButton = styled.button<{ direction: 'prev' | 'next'; disabled?: boolean }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'prev' ? 'left: 0;' : 'right: 0;'}
  background: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Mock product data for fallback
const mockProducts: StrapiProduct[] = [
  {
    id: 1,
    name: "Blue Dream Premium Flower",
    brand: "HARVEST SELECT",
    category: "flower",
    price: 45.00,
    thc: "24.5%",
    cbd: "0.8%",
    featured: true,
    badge: "bestseller",
    images: [{
      id: 1,
      url: "/images/product-1.jpg",
      alternativeText: "Blue Dream Flower"
    }],
    slug: "blue-dream-premium",
    order: 1
  },
  {
    id: 2,
    name: "Strawberry Gummies 100mg",
    brand: "SWEET LEAF",
    category: "edibles",
    price: 25.00,
    thc: "100mg",
    cbd: "0mg",
    featured: true,
    badge: "new",
    discount: 20,
    images: [{
      id: 2,
      url: "/images/product-2.jpg",
      alternativeText: "Strawberry Gummies"
    }],
    slug: "strawberry-gummies",
    order: 2
  },
  {
    id: 3,
    name: "OG Kush Live Resin",
    brand: "PURE EXTRACTS",
    category: "concentrates",
    price: 65.00,
    thc: "82.3%",
    cbd: "1.2%",
    featured: true,
    badge: "limited",
    images: [{
      id: 3,
      url: "/images/product-3.jpg",
      alternativeText: "OG Kush Live Resin"
    }],
    slug: "og-kush-live-resin",
    order: 3
  },
  {
    id: 4,
    name: "Hybrid Pre-Roll Pack",
    brand: "HARVEST ROLLS",
    category: "pre-rolls",
    price: 35.00,
    thc: "22.0%",
    cbd: "1.5%",
    featured: true,
    badge: "sale",
    discount: 15,
    images: [{
      id: 4,
      url: "/images/product-4.jpg",
      alternativeText: "Pre-Roll Pack"
    }],
    slug: "hybrid-pre-roll-pack",
    order: 4
  },
  {
    id: 5,
    name: "CBD Vape Cartridge",
    brand: "WELLNESS CO",
    category: "vapes",
    price: 40.00,
    thc: "5.0%",
    cbd: "85.0%",
    featured: true,
    images: [{
      id: 5,
      url: "/images/product-5.jpg",
      alternativeText: "CBD Vape"
    }],
    slug: "cbd-vape-cartridge",
    order: 5
  }
];

const ProductCarousel: RemoteBoundaryComponent = () => {
  const { actions } = useDataBridge();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Fetch products from Strapi
  const { data: strapiProducts, loading, error } = useStrapiProducts();
  const products = strapiProducts || mockProducts;
  
  // Calculate carousel positioning
  const cardWidth = 324; // 300px + 24px gap
  const visibleCards = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 4;
  const maxIndex = Math.max(0, products.length - visibleCards);
  const translateX = -currentIndex * cardWidth;
  
  const handlePrevious = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex(Math.min(maxIndex, currentIndex + 1));
  };
  
  const handleProductClick = (product: StrapiProduct) => {
    // In production, this would use Dutchie's product ID
    console.log('Product clicked:', product.slug);
    // actions.goToProductDetails({ cname: product.slug });
  };
  
  const handleAddToCart = (e: React.MouseEvent, product: StrapiProduct) => {
    e.stopPropagation();
    console.log('Add to cart:', product);
    // In production, this would use Dutchie's cart system
    // actions.addToCart({ productId: product.id, quantity: 1 });
  };
  
  const calculateDiscountedPrice = (price: number, discount?: number) => {
    if (!discount) return null;
    return (price * (1 - discount / 100)).toFixed(2);
  };
  
  if (loading) {
    return (
      <CarouselSection>
        <Container>
          <Title>Loading products...</Title>
        </Container>
      </CarouselSection>
    );
  }
  
  return (
    <CarouselSection>
      <Container>
        <SectionHeader>
          <Title>Featured Products</Title>
          <Subtitle>
            Discover our hand-picked selection of premium cannabis products
          </Subtitle>
        </SectionHeader>
        
        <CarouselContainer>
          <CarouselButton direction="prev" onClick={handlePrevious} disabled={currentIndex === 0}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </CarouselButton>
          
          <CarouselTrack translateX={translateX}>
            {products.map((product) => {
              const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
              const primaryImage = product.images?.[0];
              
              return (
                <ProductCard key={product.id} onClick={() => handleProductClick(product)}>
                  <ImageContainer>
                    {primaryImage && (
                      <ProductImage 
                        src={getStrapiMedia(primaryImage.url) || '/placeholder-product.jpg'} 
                        alt={primaryImage.alternativeText || product.name}
                      />
                    )}
                    {product.badge && <Badge variant={product.badge}>{product.badge}</Badge>}
                    {product.discount && <Discount>-{product.discount}%</Discount>}
                  </ImageContainer>
                  
                  <ProductInfo>
                    <Brand>{product.brand}</Brand>
                    <ProductName>{product.name}</ProductName>
                    
                    {(product.thc || product.cbd) && (
                      <PotencyInfo>
                        {product.thc && <Potency>THC: <span>{product.thc}</span></Potency>}
                        {product.cbd && <Potency>CBD: <span>{product.cbd}</span></Potency>}
                      </PotencyInfo>
                    )}
                    
                    <PriceContainer>
                      <div>
                        <Price>${discountedPrice || product.price.toFixed(2)}</Price>
                        {discountedPrice && <OldPrice>${product.price.toFixed(2)}</OldPrice>}
                      </div>
                      <AddButton onClick={(e) => handleAddToCart(e, product)}>
                        Add to Cart
                      </AddButton>
                    </PriceContainer>
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </CarouselTrack>
          
          <CarouselButton direction="next" onClick={handleNext} disabled={currentIndex === maxIndex}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </CarouselButton>
        </CarouselContainer>
      </Container>
    </CarouselSection>
  );
};

ProductCarousel.DataBridgeVersion = '1';

export default ProductCarousel;