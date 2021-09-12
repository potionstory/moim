import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import Avatar from 'boring-avatars';
import api from '../../store/api';
import {
  signInModalOpenAction,
  signUpModalOpenAction,
} from '../../store/module/global';
import { getUserAction, signOutAction } from '../../store/module/auth';
import useTheme from '../../store/hook/useTheme';
import { auth } from '../../server/firebase.util';
import TextButton from '../../Components/Button/TextButton';
import AvatarToast from '../../Components/AvatarToast';
import {
  HeaderWrap,
  HeaderInnder,
  LeftHead,
  RightHead,
  Menu,
  MenuList,
  MenuItem,
  AvatarBox,
} from './style';

const token = localStorage.FBIdToken;
api.defaults.headers.common['Authorization'] = token;

const Header = () => {
  const dispatch = useDispatch();
  const { toggleTheme } = useTheme();

  const { isAuth, userInfo } = useSelector(({ auth }) => auth);
  const { theme } = useSelector(({ global }) => global);

  const onThemeToggle = useCallback(() => {
    toggleTheme();
  }, [dispatch]);

  const onSignOut = useCallback(() => {
    auth.signOut();
    dispatch(signOutAction.REQUEST());
  }, [dispatch]);

  const onSignInModalOpen = useCallback(() => {
    setIsUserActive(false);
    dispatch(signInModalOpenAction());
  }, [dispatch]);

  const onSignUpModalOpen = useCallback(() => {
    setIsUserActive(false);
    dispatch(signUpModalOpenAction());
  }, [dispatch]);

  const [isUserActive, setIsUserActive] = useState(false);

  const onUserMenuToggle = useCallback(() => {
    setIsUserActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getUserAction.REQUEST());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isAuth) {
      setIsUserActive(isAuth);
    }
  }, [isAuth]);

  return (
    <HeaderWrap>
      <HeaderInnder>
        <LeftHead isLight={theme}>
          <h1>
            <Link to="/">M</Link>
          </h1>
          <div className="themeToggle">
            <label>
              <input type="checkbox" checked={theme} onChange={onThemeToggle} />
              <motion.div
                className="activeBar"
                initial={{ x: (theme === false ? 1 : 0) * 32 }}
                animate={{ x: (theme === false ? 1 : 0) * 32 }}
                transition={{
                  ease: 'backInOut',
                }}
              />
              <motion.div
                className="activeIcon"
                initial={{ x: (theme === false ? 0 : 1) * 32 }}
                animate={{ x: (theme === false ? 0 : 1) * 32 }}
                transition={{
                  ease: 'backInOut',
                }}
              >
                <FontAwesomeIcon icon={theme ? faSun : faMoon} />
              </motion.div>
            </label>
          </div>
        </LeftHead>
        <RightHead>
          <Menu>
            <MenuList>
              <MenuItem>
                <TextButton
                  onClickEvent={onSignInModalOpen}
                  icon={faSignInAlt}
                  text="sign in"
                />
              </MenuItem>
              <MenuItem>
                <TextButton
                  onClickEvent={onSignUpModalOpen}
                  icon={faUserPlus}
                  text="sign up"
                />
              </MenuItem>
              <MenuItem>
                <TextButton
                  onClickEvent={onSignOut}
                  icon={faSignOutAlt}
                  text="sign out"
                />
              </MenuItem>
            </MenuList>
            {isAuth && (
              <AvatarBox
                onClick={onUserMenuToggle}
                isActive={isUserActive}
                isImage={userInfo.userImage !== null}
              >
                {userInfo.userImage === null ? (
                  <Avatar
                    size={40}
                    name={userInfo.userAvatar.name}
                    variant="beam"
                    colors={userInfo.userAvatar.colors}
                  />
                ) : (
                  <img src={userInfo.userImage} />
                )}
              </AvatarBox>
            )}
          </Menu>
        </RightHead>
      </HeaderInnder>
      {isAuth && (
        <motion.div
          className="avatarToast"
          animate={{ x: isUserActive ? -360 : -40 }}
          transition={{
            ease: 'backInOut',
          }}
        >
          <AvatarToast
            isAuth={isAuth}
            userInfo={userInfo}
            onSignOut={onSignOut}
            onSignInModalOpen={onSignInModalOpen}
            onSignUpModalOpen={onSignUpModalOpen}
          />
        </motion.div>
      )}
    </HeaderWrap>
  );
};

export default Header;
