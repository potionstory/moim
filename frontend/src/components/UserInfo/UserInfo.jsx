import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'boring-avatars';
import { UserInfoWrap } from './style';

const UserInfo = ({ image, avatar, name, count }) => {
  return (
    <UserInfoWrap>
      <a href="/" className="user">
        {image === null ? (
          <Avatar
            size={40}
            name={avatar.name}
            variant="beam"
            colors={avatar.colors}
          />
        ) : (
          <img src={image} />
        )}
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
