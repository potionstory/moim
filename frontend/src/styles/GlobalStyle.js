import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

  body {
    color: #333;
    font-size: 40px;
    font-family: 'Spoqa Han Sans', sans-serif;
    line-height: 1.5;
    word-break: keep-all;

    background-color: white;
  }

  a {
    color: #333;
    text-decoration: none;
  }
`;

export default GlobalStyle;
