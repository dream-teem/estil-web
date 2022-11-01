import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "GT America Extended";
    src: url("/assets/fonts/GTAmerica-ExtendedRegular.woff2");
    font-style: normal;
    font-weight: 400;
    font-display: swap;  
  }

  @font-face {
    font-family: "GT America Extended";
    src: url("/assets/fonts/GTAmericaExtendedRegular.woff2");
    font-style: normal;
    font-weight: 600;
    font-display: swap;  
  }

  @font-face {
    font-family: "GT America Extended";
    src: url("/assets/fonts/GT-America-Extended-Bold.woff2");
    font-style: normal;
    font-weight: bold;
    font-display: swap;  
  }

  body {
    margin: 0;
    padding: 0;

    -webkit-tap-highlight-color: transparent;
    text-align: left;
    font-family: "GT America Extended", apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    background-color: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.primary};
  }

  html {
    font-size: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    img {
      user-drag: none;
      use-select: none;
    }
  }

  *,
  *::after,
  *::before {
    box-sizing: border-box;
    
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  time,
  input,
  button,
  p {
    font-family: "GT America Extended", apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  }

  button {
    appearance: auto;
    writing-mode: horizontal-tb !important;
    font-style: ;
    font-variant-ligatures: ;
    font-variant-caps: ;
    font-variant-numeric: ;
    font-variant-east-asian: ;
    font-weight: ;
    font-stretch: ;
    font-size: ;
    font-family: ;
    text-rendering: auto;
    color: ${({ theme }) => theme.palette.text.primary};
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: center;
    align-items: flex-start;
    cursor: default;
    box-sizing: border-box;
    margin: 0em;
    padding: 1px 6px;
    border-width: 2px;
    border-style: outset;
    border-image: initial;
  }
`

export * from './utils'
