import React from 'react';
import { Link } from 'react-router-dom';
import { CardDescriptionBoxWrap } from './style';

const CardDescriptionBox = ({ detailUrl, description }) => {
  return (
    <CardDescriptionBoxWrap>
      <Link to={detailUrl}>{description}</Link>
    </CardDescriptionBoxWrap>
  );
};

export default CardDescriptionBox;
