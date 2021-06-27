import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faUserPlus,
  faGhost,
  faUserEdit,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from 'boring-avatars';
import TextButton from '../../components/Button/TextButton';
import IconButton from '../../components/Button/IconButton';
import { AvatarToastWrap, Member, NonMember, Menus } from './style';

const AvatarToast = ({
  isAuth,
  userInfo,
  onSignOut,
  onSignInModalOpen,
  onSignUpModalOpen,
}) => {
  const { userAvatar, userImage, userName } = userInfo;
  return (
    <AvatarToastWrap>
      {isAuth ? (
        <Member isImage={userImage !== null}>
          <div className="profile">
            <span className="user">
              <span className="avatar">
                {userImage === null ? (
                  <Avatar
                    size={40}
                    name={userAvatar.name}
                    variant="beam"
                    colors={userAvatar.colors}
                  />
                ) : (
                  <img src={userImage} />
                )}
              </span>
              <span className="name">{userName}</span>
            </span>
            <IconButton onClickEvent={onSignInModalOpen} icon={faUserEdit} />
          </div>
          <Menus>
            <li>
              <TextButton
                isFull
                onClickEvent={onSignOut}
                icon={faSignOutAlt}
                text="sign out"
              />
            </li>
          </Menus>
        </Member>
      ) : (
        <NonMember>
          <span className="ghost">
            <FontAwesomeIcon icon={faGhost} />
          </span>
          <span className="text">
            <b>MOIM</b>이 모이다!
            <br />더 쉽게 <b>모임</b>에 참여해보세요.
          </span>
          <Menus>
            <li>
              <TextButton
                isFull
                onClickEvent={onSignInModalOpen}
                icon={faSignInAlt}
                text="sign in"
              />
            </li>
            <li>
              <TextButton
                isFull
                onClickEvent={onSignUpModalOpen}
                icon={faUserPlus}
                text="sign up"
              />
            </li>
          </Menus>
        </NonMember>
      )}
    </AvatarToastWrap>
  );
};

export default AvatarToast;
