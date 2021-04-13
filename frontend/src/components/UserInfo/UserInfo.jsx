import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { UserInfoWrap } from './style';

const UserInfo = ({ image, name, count }) => {
  return (
    <UserInfoWrap>
      <a href="/" className="user">
        <img src={image} />
        <span>
          by <b>{name}</b>
        </span>
      </a>
      <span className="like">
        <FontAwesomeIcon icon={faHeart} />
        <span>{count}</span>
      </span>
    </UserInfoWrap>
  );
};

export default UserInfo;
