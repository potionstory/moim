import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../store/api/api';
import {
  toggleModeAction,
  signInModalOpenAction,
  signUpModalOpenAction,
} from '../../store/module/global';
import { getUserAction, signOutAction } from '../../store/module/auth';
import TextButton from '../../components/Button/TextButton';
import UserMenu from '../../components/UserMenu';
import {
  HeaderWrap,
  LeftHead,
  Logo,
  ModeToggle,
  RightHead,
  Menu,
  MenuList,
  MenuItem,
} from './style';

const token = localStorage.FBIdToken;
api.defaults.headers.common['Authorization'] = token;

const Header = () => {
  const dispatch = useDispatch();

  const onToggleMode = useCallback(() => dispatch(toggleModeAction.REQUEST()), [
    dispatch,
  ]);

  const { isAuth, userInfo } = useSelector(({ auth }) => auth);

  const onGetUser = useCallback(() => dispatch(getUserAction.REQUEST()), [
    dispatch,
  ]);

  const onSignOut = useCallback(() => dispatch(signOutAction.REQUEST()), [
    dispatch,
  ]);

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
      <LeftHead>
        <Logo>
          <ModeToggle onClick={onToggleMode}>M</ModeToggle>
        </Logo>
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
          </MenuList>
          <UserMenu
            isAuth={isAuth}
            userInfo={userInfo}
            isUserActive={isUserActive}
            onUserMenuToggle={onUserMenuToggle}
            onSignOut={onSignOut}
            onSignInModalOpen={onSignInModalOpen}
            onSignUpModalOpen={onSignUpModalOpen}
          />
        </Menu>
      </RightHead>
    </HeaderWrap>
  );
};

export default Header;
