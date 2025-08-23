import styled from 'styled-components';
import { usePreview } from './context';
import { Switcher } from './switcher';
import { Router } from './router';

export const Content = () => {
  const { components, previewProps } = usePreview();

  return (
    <Container>
      <Switcher />

      {components.StoreFrontHeader && <components.StoreFrontHeader {...previewProps} />}

      {components.StoreFrontNavigation && <components.StoreFrontNavigation {...previewProps} />}

      <Main>
        <Router />
      </Main>

      {components.StoreFrontFooter && <components.StoreFrontFooter {...previewProps} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
`;
