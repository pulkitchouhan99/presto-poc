import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../global-styles';
import { theme } from '../theme';

type ThemeWrapperProps = {
  children: ReactNode;
};

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {children}
    </ThemeProvider>
  );
};
