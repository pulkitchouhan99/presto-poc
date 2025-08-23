import styled, { css } from 'styled-components';
import { RemoteBoundaryComponent, useDataBridge, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../components/theme-wrapper';

const Hero: RemoteBoundaryComponent = () => {
  const { user, actions } = useDataBridge();

  return (
    <ThemeWrapper>
      <Wrapper>
        <Item>
          {user?.firstName ? (
            <div data-testid='welcome-message'>Welcome back, {user?.firstName}!</div>
          ) : (
            <div data-testid='new-customer-message'>
              New Customers Receive 10% Off
              <Button data-testid='join-button' onClick={() => actions.goToLogin()}>
                Join Now
              </Button>
            </div>
          )}
        </Item>
        <Item>Same-Day Delivery & Pickup Available</Item>
        <Item>Lab-Tested Premium Products</Item>
        <Item highlight>Licensed & Compliant Dispensary</Item>
      </Wrapper>
    </ThemeWrapper>
  );
};

Hero.DataBridgeVersion = DataBridgeVersion;

export default Hero;

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[16]};
  margin: ${({ theme }) => theme.spacing[48]} 0;
  padding: 0 ${({ theme }) => theme.spacing[24]};

  ${({ theme }) => theme.breakpoints.lgd} {
    flex-wrap: wrap;
  }
`;

const Item = styled.div<{ highlight?: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.gray[900]};
  color: ${({ theme }) => theme.colors.gray[100]};
  display: flex;
  flex-basis: 100%;
  font-size: ${({ theme }) => theme.fontSizes[24]};
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[24]};
  text-align: center;

  ${({ highlight }) =>
    highlight &&
    css`
      background: ${({ theme }) => theme.colors.blue[500]};
      color: ${({ theme }) => theme.colors.gray[900]};
    `}

  ${({ theme }) => theme.breakpoints.sm} {
    flex-basis: calc(50% - ${({ theme }) => theme.spacing[16]} / 2);
  }

  ${({ theme }) => theme.breakpoints.lg} {
    flex-basis: calc(25% - ${({ theme }) => theme.spacing[16]} / 4);
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.gray[900]};
  display: block;
  margin-top: ${({ theme }) => theme.spacing[16]};
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[16]};
  transition: all 0.2s ease-in-out;
  width: 100%;

  &:hover {
    background: ${({ theme }) => theme.colors.gray[100]};
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.blue[500]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;
