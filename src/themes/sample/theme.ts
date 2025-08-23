const pxToRem = (px: number) => `${px / 16}rem`;

export const theme = {
  colors: {
    white: '#fff',
    black: '#000',
    gray: {
      100: '#e5e5ea',
      900: '#1c1c1e',
    },
    blue: {
      500: '#5ac8fa',
    },
  },
  spacing: {
    4: pxToRem(4),
    8: pxToRem(8),
    12: pxToRem(12),
    16: pxToRem(16),
    24: pxToRem(24),
    32: pxToRem(32),
    48: pxToRem(48),
  },
  fontSizes: {
    12: pxToRem(12),
    14: pxToRem(14),
    16: pxToRem(16),
    18: pxToRem(18),
    20: pxToRem(20),
    24: pxToRem(24),
  },
  breakpoints: {
    smd: `@media (max-width: ${pxToRem(639)})`,
    sm: `@media (min-width: ${pxToRem(640)})`,
    mdd: `@media (max-width: ${pxToRem(767)})`,
    md: `@media (min-width: ${pxToRem(768)})`,
    lgd: `@media (max-width: ${pxToRem(1023)})`,
    lg: `@media (min-width: ${pxToRem(1024)})`,
    xld: `@media (max-width: ${pxToRem(1279)})`,
    xl: `@media (min-width: ${pxToRem(1280)})`,
  },
  zIndices: {
    1: 1,
    100: 100,
  },
};
