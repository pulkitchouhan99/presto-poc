import styled from 'styled-components';
import { RemoteBoundaryComponent, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../../components/theme-wrapper';
import { CreditCard } from '../../assets/credit-card';

const CreditCards: RemoteBoundaryComponent = () => {
  return (
    <ThemeWrapper>
      <Container>
        <CreditCard width={48} height={48} />
        Now accepting credit cards!
      </Container>
    </ThemeWrapper>
  );
};

CreditCards.DataBridgeVersion = DataBridgeVersion;

export default CreditCards;

const Container = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.blue[500]};
  display: flex;
  font-size: ${({ theme }) => theme.fontSizes[20]};
  gap: ${({ theme }) => theme.spacing[24]};
  justify-content: center;
  margin: ${({ theme }) => theme.spacing[32]} auto 0;
  max-width: 1248px;
  padding: ${({ theme }) => theme.spacing[24]};
`;
