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
    link.href =
      'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return null;
};
