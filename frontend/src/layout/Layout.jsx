import React from 'react';
import { useSelector } from 'react-redux';
import GlobalStyle from '../lib/styles/global';
import Header from './Header';
import Footer from './Footer';
import Modal from './Modal';
import { LayoutWrap, Container } from './style';

const Layout = ({ children }) => {
  const isModalVisible = useSelector(({ global }) => global.modal.isVisible);
  const modalMode = useSelector((state) => state.global.mode);
  const modalType = useSelector(({ global }) => global.modal.type);

  return (
    <LayoutWrap>
      <GlobalStyle />
      <Header />
      <Container>{children}</Container>
      <Footer />
      <Modal isVisible={isModalVisible} mode={modalMode} type={modalType} />
    </LayoutWrap>
  );
};

export default Layout;
