import styled from 'styled-components';
import { availableRoutes } from './router';
import { usePreview } from './context';

export const Switcher = () => {
  const { page, setPage, theme, setTheme, routeablePages } = usePreview();

  return (
    <Container>
      <Heading>Dutchie Theme Preview</Heading>

      {AVAILABLE_THEMES.length > 1 && (
        <Field>
          <Label htmlFor='theme'>Theme:</Label>
          <Select id='theme' value={theme} onChange={(e) => setTheme(e.target.value)}>
            {AVAILABLE_THEMES.map((theme) => (
              <option key={theme} value={theme}>
                {theme}
              </option>
            ))}
          </Select>
        </Field>
      )}

      <Field>
        <Label htmlFor='page'>Page:</Label>
        <Select id='page' value={page} onChange={(e) => setPage(e.target.value)}>
          <optgroup label='Default Pages'>
            {availableRoutes.map((route) => (
              <option key={route} value={route}>
                {route}
              </option>
            ))}
          </optgroup>
          <optgroup label='Custom Pages'>
            {routeablePages?.map((route) => (
              <option key={route.path} value={route.path}>
                {route.path}
              </option>
            ))}
          </optgroup>
        </Select>
      </Field>
    </Container>
  );
};

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 5px 10px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const Field = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

const Label = styled.label`
  cursor: pointer;
  font-weight: bold;
  display: block;
`;

const Select = styled.select`
  padding: 2px;
`;
