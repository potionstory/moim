import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun,
  faMoon,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faPlus,
  faGhost,
} from '@fortawesome/free-solid-svg-icons';
import api from '../../store/api';
import {
  toggleModeAction,
  signInModalOpenAction,
  signUpModalOpenAction,
} from '../../store/module/global';
import { getUserAction, signOutAction } from '../../store/module/auth';
import { auth } from '../../server/firebase.util';
import TextButton from '../../components/Button/TextButton';
import IconButton from '../../components/Button/IconButton';
import AvatarToast from '../../components/AvatarToast';
import {
  HeaderWrap,
  HeaderInnder,
  LeftHead,
  Logo,
  ModeToggle,
  RightHead,
  Menu,
  MenuList,
  MenuItem,
  Avatar,
} from './style';

const token = localStorage.FBIdToken;
api.defaults.headers.common['Authorization'] = token;

const Header = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isAuth, userInfo } = useSelector(({ auth }) => auth);
  const { mode } = useSelector(({ global }) => global);

  const onLinkToHome = useCallback(() => {
    history.push('/');
  }, []);

  const onLinkToCreate = useCallback(() => {
    history.push('/create');
  }, []);

  const onToggleMode = useCallback(() => dispatch(toggleModeAction.REQUEST()), [
    dispatch,
  ]);

  const onGetUser = useCallback(() => dispatch(getUserAction.REQUEST()), [
    dispatch,
  ]);

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

  const isImageNone = useMemo(() => isAuth && userInfo.userImage === null, [
    userInfo,
  ]);

  useEffect(() => {
    if (token) {
      onGetUser();
    }
  }, [onGetUser]);

  useEffect(() => {
    if (!isAuth) {
      setIsUserActive(isAuth);
    }
  }, [isAuth]);

  return (
    <HeaderWrap>
      <HeaderInnder>
        <LeftHead isLight={mode}>
          <Logo>
            <ModeToggle onClick={onLinkToHome}>M</ModeToggle>
          </Logo>
          <div className="modeToggle">
            <label>
              <input type="checkbox" checked={mode} onChange={onToggleMode} />
              <motion.div
                className="activeBar"
                initial={{ x: (mode === false ? 1 : 0) * 40 }}
                animate={{ x: (mode === false ? 1 : 0) * 40 }}
                transition={{
                  ease: 'backInOut',
                }}
              >
                <FontAwesomeIcon icon={mode ? faSun : faMoon} />
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
              <MenuItem>
                <IconButton onClickEvent={onLinkToCreate} icon={faPlus} />
              </MenuItem>
            </MenuList>
            <Avatar
              onClick={onUserMenuToggle}
              isActive={isUserActive}
              isImageNone={isImageNone}
            >
              {isAuth && !isImageNone ? (
                <img src={userInfo.userImage} />
              ) : (
                <FontAwesomeIcon icon={faGhost} />
              )}
            </Avatar>
          </Menu>
        </RightHead>
      </HeaderInnder>
      <motion.div
        className="avatarToast"
        animate={{ x: isUserActive ? -384 : -48 }}
        transition={{
          ease: 'backInOut',
        }}
      >
        <AvatarToast
          isAuth={isAuth}
          isImageNone={isImageNone}
          userInfo={userInfo}
          onSignOut={onSignOut}
          onSignInModalOpen={onSignInModalOpen}
          onSignUpModalOpen={onSignUpModalOpen}
        />
      </motion.div>
    </HeaderWrap>
  );
};

export default Header;
