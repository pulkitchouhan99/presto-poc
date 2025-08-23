import styled from 'styled-components';
import { usePreview } from '../context';

export const ProductDetail = () => {
  const { components, previewProps } = usePreview();

  return (
    <Wrapper>
      <LeftColumn>
        <ImageBox>Product Image</ImageBox>
      </LeftColumn>

      <RightColumn>
        <ProductContent>Product Content</ProductContent>
        {components.ProductDetailsPrimary && <components.ProductDetailsPrimary {...previewProps} />}
      </RightColumn>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  margin: 20px auto;
  max-width: 1240px;
  padding: 0 20px;

  @media (max-width: 959px) {
    flex-direction: column;
  }
`;

const LeftColumn = styled.div`
  width: 450px;

  @media (max-width: 959px) {
    width: 100%;
  }
`;

const ImageBox = styled.div`
  align-items: center;
  aspect-ratio: 1/1;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  left: 0;
  max-width: 450px;
  position: sticky;
  top: 0;

  @media (max-width: 959px) {
    margin: 0 auto;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  flex: 1;
`;

const ProductContent = styled.div`
  align-items: center;
  background-color: #f0f0f0;
  display: flex;
  flex: 1;
  justify-content: center;
  min-height: 75vh;
`;
