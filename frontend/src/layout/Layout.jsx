import React from 'react';
import GlobalStyle from '../lib/styles/global';
import Header from './Header';
import Footer from './Footer';
import { Container } from './style';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};

export default Layout;
