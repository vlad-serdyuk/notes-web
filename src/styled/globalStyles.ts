import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body,
  html {
    height: 100%;
    margin: 0;
  }

  a,
  a:link,
  a:visited,
  a:focus {
    text-decoration: none;
  }
`;