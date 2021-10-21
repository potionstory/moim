import React, { memo, useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faBars,
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
  MenuBar,
  Menu,
  MenuList,
  MenuListMobile,
  MenuItem,
  AvatarBox,
} from './style';

const token = localStorage.FBIdToken;
api.defaults.headers.common['Authorization'] = token;

const avatarToastVariants = {
  open: { opacity: 1, x: -320 },
  closed: { opacity: 0, x: 0 },
};

const Header = memo(() => {
  const dispatch = useDispatch();
  const { toggleTheme } = useTheme();

  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const userInfo = useSelector(({ auth }) => auth.userInfo);
  const theme = useSelector(({ global }) => global.theme);

  const [isMenuBarActive, setIsMenuBarActive] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);

  const onThemeToggle = useCallback(() => {
    toggleTheme();
  }, [dispatch]);

  const onMenuToggle = useCallback(() => {
    setIsMenuBarActive((prev) => !prev);
  }, []);

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

  console.log("isMenuBarActive: ", isMenuBarActive);

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
          <MenuBar active={isMenuBarActive} onClick={onMenuToggle}>
            <FontAwesomeIcon icon={faBars} />
          </MenuBar>
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
            <MenuListMobile
              as={motion.ul}
              initial={{ x: 0 }}
              animate={{ x: isMenuBarActive ? 0 : '100%', opacity: isMenuBarActive ? 1 : 0 }}
              transition={{
                ease: 'backInOut',
              }}
            >
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
            </MenuListMobile>
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
        {isAuth && (
          <motion.div
            className="avatarToast"
            animate={isUserActive ? 'open' : 'closed'}
            variants={avatarToastVariants}
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
      </HeaderInnder>
    </HeaderWrap>
  );
});

export default Header;
