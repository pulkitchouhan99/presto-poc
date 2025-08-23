import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  ::before,
  ::after {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }

  ol,
  ul,
  dl,
  dd {
    margin: 0;
    padding: 0;
  }

  ol,
  ul,
  dl {
    list-style: none;
  }

  img,
  svg,
  video,
  canvas,
  audio,
  iframe,
  embed,
  object {
    display: block;
  }

  img,
  video {
    max-width: 100%;
    height: auto;
  }

  button {
    appearance: none;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
    padding: 0;
  }

  input,
  textarea,
  select {
    font-family: inherit;
  }
`;
