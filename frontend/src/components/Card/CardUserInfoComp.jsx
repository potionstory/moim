import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { CardUserInfo } from './style';

const CardUserInfoComp = ({ image, name, count }) => {
  return (
    <CardUserInfo>
      <a href="/" className="user">
        <img src={image} />
        <span>
          registered by <b>{name}</b>
        </span>
      </a>
      <span className="like">
        <FontAwesomeIcon icon={faHeart} />
        <span>{count}</span>
      </span>
    </CardUserInfo>
  );
};

export default CardUserInfoComp;
