import { ReactNode, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../global-styles';
import { theme } from '../theme';

type ThemeWrapperProps = {
  children: ReactNode;
};

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  return (
    <ThemeProvider theme={theme}>
      <FontLoader />
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://use.typekit.net/rbx6ccb.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
};
