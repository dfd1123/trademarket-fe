import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { reset } from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}

  html,
  body {
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;