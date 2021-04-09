import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faUserPlus,
  faGhost,
  faUserEdit,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import TextButton from '../../components/Button/TextButton';
import IconButton from '../../components/Button/IconButton';
import { AvatarToastWrap, AvatarMenu, Member, NonMember, Menus } from './style';

const AvatarToast = ({
  isAuth,
  userInfo,
  isUserActive,
  onUserMenuToggle,
  onSignOut,
  onSignInModalOpen,
  onSignUpModalOpen,
}) => {
  const isImageNone = isAuth && userInfo.userImage === null;
  return (
    <AvatarToastWrap>
      <AvatarMenu
        onClick={onUserMenuToggle}
        isActive={isUserActive}
        isImageNone={isImageNone}
      >
        {isAuth && !isImageNone ? (
          <img src={userInfo.userImage} />
        ) : (
          <FontAwesomeIcon icon={faGhost} />
        )}
      </AvatarMenu>
      <motion.div
        className="menuBox"
        animate={{ x: isUserActive ? -288 : 48 }}
        transition={{
          ease: 'backInOut',
        }}
      >
        {isAuth ? (
          <Member isImageNone={isImageNone}>
            <div className="profile">
              <span className="user">
                <span className="avatar">
                  {isAuth && !isImageNone ? (
                    <img src={userInfo.userImage} />
                  ) : (
                    <FontAwesomeIcon icon={faGhost} />
                  )}
                </span>
                <span className="name">{userInfo.userName}</span>
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
      </motion.div>
    </AvatarToastWrap>
  );
};

export default AvatarToast;
