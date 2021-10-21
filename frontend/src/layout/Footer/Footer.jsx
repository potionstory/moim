import React from 'react';
import { Link } from 'react-router-dom';
import { FooterWrap } from './style';

const Footer = () => {
  return (
    <FooterWrap>
      <p>Copyright © 2021 <b>MOIM</b>. All rights reserved.</p>
      <p>Designed by <Link to="/">potionstory</Link></p>
    </FooterWrap>
  );
}

export default Footer;