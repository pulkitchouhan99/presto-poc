import { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  RemoteBoundaryComponent,
  useDataBridge,
  useAsyncLoader,
  Category,
  DataBridgeVersion,
} from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../components/theme-wrapper';

const orderTypeMap = {
  inStorePickup: 'In-Store Pickup',
  curbsidePickup: 'Curbside Pickup',
  driveThruPickup: 'Drive-Thru Pickup',
  delivery: 'Delivery',
};

const Navigation: RemoteBoundaryComponent = () => {
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  const { dataLoaders, actions, location } = useDataBridge();
  const { data: categories, isLoading: isCategoriesLoading } = useAsyncLoader(dataLoaders.categories);

  const { data: integrationValueData, isLoading: isIntegrationValueLoading } = useAsyncLoader(
    dataLoaders.integrationValue,
    'customKey'
  );

  if (isCategoriesLoading || isIntegrationValueLoading || !location) {
    return null;
  }

  console.log({ integrationValueData });

  const typedCategories = categories as Category[];

  const { orderTypes = {} } = location;
  const availableOrderTypes = Object.entries(orderTypes)
    .filter(([, isAvailable]) => isAvailable)
    .map(([orderType]) => orderTypeMap?.[orderType as keyof typeof orderTypeMap])
    .filter(Boolean);

  return (
    <ThemeWrapper>
      <Wrapper>
        <Container>
          <nav data-testid='navigation'>
            <Nav>
              <li>
                <NavButton data-testid='home-button' onClick={() => actions.goToStoreFront()}>
                  {location.name} Home
                </NavButton>
              </li>

              {typedCategories?.length > 0 && (
                <li>
                  <DropdownNavButton
                    data-testid='categories-dropdown-button'
                    onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                    isOpen={isCategoriesDropdownOpen}
                  >
                    Categories
                  </DropdownNavButton>

                  <CategoriesDropdown isOpen={isCategoriesDropdownOpen}>
                    {typedCategories?.map((category) => (
                      <li key={category.id}>
                        <button
                          data-testid={`category-button-${category.id}`}
                          onClick={() => actions.goToCategory({ id: category.id })}
                        >
                          {category.name}
                        </button>
                      </li>
                    ))}
                  </CategoriesDropdown>
                </li>
              )}

              <li>
                <NavButton data-testid='info-button' onClick={() => actions.goToInfoPage()}>
                  Info
                </NavButton>
              </li>
            </Nav>
          </nav>

          {availableOrderTypes.length > 0 && (
            <OrderTypes data-testid='order-types'>
              Available for{' '}
              {availableOrderTypes.length > 1
                ? `${availableOrderTypes.slice(0, -1).join(', ')} & ${availableOrderTypes[availableOrderTypes.length - 1]}`
                : availableOrderTypes[0]}
            </OrderTypes>
          )}
        </Container>
      </Wrapper>
    </ThemeWrapper>
  );
};

Navigation.DataBridgeVersion = DataBridgeVersion;

export default Navigation;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.gray[900]};
`;

const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[24]};
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1248px;
  padding: ${({ theme }) => theme.spacing[12]} ${({ theme }) => theme.spacing[24]};

  ${({ theme }) => theme.breakpoints.mdd} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[12]};
  }

  ${({ theme }) => theme.breakpoints.md} {
    align-items: center;
  }
`;

const Nav = styled.ul`
  display: flex;
  gap: ${({ theme }) => theme.spacing[12]};

  > li {
    position: relative;
  }
`;

const NavButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.colors.gray[900]};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[8]};
  line-height: 1;
  padding: ${({ theme }) => theme.spacing[8]};
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const DropdownNavButton = styled(NavButton)<{ isOpen: boolean }>`
  ${({ isOpen }) =>
    isOpen &&
    css`
      background: ${({ theme }) => theme.colors.gray[100]};
      border-radius: 8px 8px 0 0;
      color: ${({ theme }) => theme.colors.gray[900]};
    `}

  &::after {
    border-left: 2px solid currentColor;
    border-top: 2px solid currentColor;
    content: '';
    height: 8px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg)' : 'rotate(225deg)')};
    width: 8px;
  }
`;

const CategoriesDropdown = styled.ul<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 0 8px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[12]};
  left: 0;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  padding: ${({ theme }) => theme.spacing[12]};
  position: absolute;
  top: 100%;
  transition: all 0.2s ease-in-out;
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  width: 168px;
  z-index: ${({ theme }) => theme.zIndices[100]};

  button {
    display: block;
    text-align: left;
    transition: all 0.2s ease-in-out;
    width: 100%;

    &:hover {
      color: ${({ theme }) => theme.colors.blue[500]};
    }
  }
`;

const OrderTypes = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[12]};
`;
