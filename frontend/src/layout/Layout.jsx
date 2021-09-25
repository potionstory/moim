import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import GlobalStyle from '../lib/styles/global';
import Header from './Header';
import Modal from './Modal';
import { LayoutWrap, Container } from './style';

const Layout = ({ children }) => {
  useEffect(() => {
    injectStyle();
  }, []);

  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
      <Modal />
      <ToastContainer autoClose={5000} />
    </LayoutWrap>
  );
};

export default Layout;
