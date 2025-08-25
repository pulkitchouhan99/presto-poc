import styled from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge, useAsyncLoader } from '@dutchiesdk/ecommerce-extensions-sdk';

const NavigationContainer = styled.nav`
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  padding: 1rem 0;
`;

const NavigationContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CategoryList = styled.div`
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 0.5rem 0;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const CategoryItem = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
  border-radius: 4px;

  &:hover {
    background-color: #e9ecef;
    color: #007bff;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1rem;
  color: #666;
`;

const QuickLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e9ecef;
`;

const QuickLink = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const StoreFrontNavigation: RemoteBoundaryComponent = () => {
  const { actions, dataLoaders } = useDataBridge();
  const { data: categories, isLoading } = useAsyncLoader(dataLoaders.categories);

  const handleCategoryClick = (categoryId: string, categoryCname: string) => {
    actions.goToCategory({ id: categoryId, cname: categoryCname });
  };

  const handleQuickLinkClick = (action: string) => {
    switch (action) {
      case 'specials':
        actions.goToProductList({});
        break;
      case 'new':
        actions.goToProductList({});
        break;
      case 'brands':
        actions.goToBrandList();
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <NavigationContainer>
        <NavigationContent>
          <LoadingMessage>Loading categories...</LoadingMessage>
        </NavigationContent>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <NavigationContent>
        <CategoryList>
          <CategoryItem onClick={() => actions.goToProductList({})}>All Products</CategoryItem>
          {categories &&
            categories.map((category) => (
              <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.id, category.cname)}>
                {category.name}
              </CategoryItem>
            ))}
        </CategoryList>

        <QuickLinks>
          <QuickLink onClick={() => handleQuickLinkClick('specials')}>Specials</QuickLink>
          <QuickLink onClick={() => handleQuickLinkClick('new')}>New Arrivals</QuickLink>
          <QuickLink onClick={() => handleQuickLinkClick('brands')}>All Brands</QuickLink>
        </QuickLinks>
      </NavigationContent>
    </NavigationContainer>
  );
};

StoreFrontNavigation.DataBridgeVersion = '1';

export default StoreFrontNavigation;
