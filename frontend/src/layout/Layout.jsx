import React from 'react';
import GlobalStyle from '../lib/styles/global';
import Header from './Header';
import Modal from './Modal';
import { LayoutWrap, Container } from './style';

const Layout = ({ children }) => {
  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
      <Modal />
    </LayoutWrap>
  );
};

export default Layout;
