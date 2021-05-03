import { createGlobalStyle } from 'styled-components';
import editor from './editor';
import dateTimePicker from './dateTimePicker';

const global = createGlobalStyle`
  html {
    background-color: ${({ theme }) => theme.sub};
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${({ theme }) => theme.sub};
    font-family: 'Spoqa Han Sans', 'Helvetica Neue', 'Helvetica', 'Arial', 'Noto', 'Apple Gothic', 'MalgunGothic', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.title};
    line-height: 1.5;
  }

  * {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.title};
    text-decoration: none;
  }

  ul, ol, dl {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  p {
    margin: 0;
  }
  
  input, button, textarea {
    border: none;
    background-color: transparent;
    font-family: inherit;
    padding: 0;
    cursor: pointer;
    &:focus {
      outline-style: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea {
    resize: none;
  }

  img {
    width: 100%;
  }

  img, button {
    vertical-align: top;
  }

  ${editor}
  ${dateTimePicker}
`;

export default global;
