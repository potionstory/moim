import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
