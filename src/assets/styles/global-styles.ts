import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";
import { reset } from 'styled-reset';
import NotoSansFont from '@/assets/font/NotoSans/font.css';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${normalize}
  ${NotoSansFont}

  html,
  body {
    height:100%;
    overflow: hidden;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, menu, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video{
    font-family: 'NotoSans';
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent !important;
  }

  a{
    text-decoration: none;
    color:inherit;
    cursor:pointer;
  }

  button{
    border:0;
    cursor:pointer;
  }

  a, button {
    -webkit-tap-highlight-color: transparent !important;
  }
`;

export default GlobalStyle;