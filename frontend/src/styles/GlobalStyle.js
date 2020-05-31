import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css);

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Spoqa Han Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'Noto', 'Apple Gothic', 'MalgunGothic', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #212121;
    line-height: 1.5;
  }

  a {
    color: #212121;
    text-decoration: none;
  }

  ul, ol, dl {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  input, button, textarea {
    font-family: inherit;
  }
`;

export default GlobalStyle;
