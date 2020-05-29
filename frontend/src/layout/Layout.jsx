import React from 'react';
import GlobalStyle from '../styles/GlobalStyle';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
