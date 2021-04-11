import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { light, dark } from '../src/lib/styles/palette';
import App from './App';

const Root = () => {
  const { mode } = useSelector(({ global }) => global);

  return (
    <BrowserRouter>
      <ThemeProvider theme={mode ? light : dark}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default Root;
