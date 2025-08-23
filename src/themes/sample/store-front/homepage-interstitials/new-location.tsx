import styled from 'styled-components';
import { RemoteBoundaryComponent, DataBridgeVersion } from '@dutchiesdk/ecommerce-extensions-sdk';

import { ThemeWrapper } from '../../components/theme-wrapper';
import { Bullhorn } from '../../assets/bullhorn';

const NewLocation: RemoteBoundaryComponent = () => {
  return (
    <ThemeWrapper>
      <Container>
        <Bullhorn width={48} height={48} />
        New Location coming soon!
      </Container>
    </ThemeWrapper>
  );
};

NewLocation.DataBridgeVersion = DataBridgeVersion;

export default NewLocation;

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
