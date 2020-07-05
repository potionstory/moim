import React from 'react';
import GlobalStyle from '../lib/styles/global';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { LayoutWrap, Container } from './style';

const Layout = ({ children }) => {
  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
      <Footer />
      <Modal />
    </LayoutWrap>
  );
};

export default Layout;
