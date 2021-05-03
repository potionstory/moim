import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import { CardMainImageBoxWrap } from './style';

const CardMainImageBox = ({ detailUrl, mainImage }) => {
  return (
    <CardMainImageBoxWrap>
      <Link to={detailUrl} className="thumb">
        <img src={mainImage} />
      </Link>
      <Link to={detailUrl} className="cover">
        <FontAwesomeIcon className="icon" icon={faDiceD6} />
      </Link>
    </CardMainImageBoxWrap>
  );
};

export default CardMainImageBox;
