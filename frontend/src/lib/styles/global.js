import { createGlobalStyle } from 'styled-components';
import palette from './palette';

const global = createGlobalStyle`
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
    color: ${palette.light.title};
    line-height: 1.5;
  }

  a {
    color: ${palette.light.title};
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

export default global;
