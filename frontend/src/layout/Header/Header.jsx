import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import api from '../../store/api/api';
import {
  toggleModeAction,
  signInModalOpenAction,
  signUpModalOpenAction,
} from '../../store/module/global';
import { getUserAction } from '../../store/module/auth';
import TextButton from '../../components/Button/TextButton';
import {
  HeaderWrap,
  LeftHead,
  Logo,
  ModeToggle,
  RightHead,
  Menu,
  UserMenu,
  Avatar,
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

  const onSignInModalOpen = useCallback(
    () => dispatch(signInModalOpenAction()),
    [dispatch],
  );

  const onSignUpModalOpen = useCallback(
    () => dispatch(signUpModalOpenAction()),
    [dispatch],
  );

  const [isUserActive, setIsUserActive] = useState(false);

  const onUserMenuToggle = useCallback(() => {
    setIsUserActive((prev) => !prev);
  }, []);

  useEffect(() => {
    if (token) {
      onGetUser();
    }
  }, [onGetUser]);

  return (
    <HeaderWrap>
      <LeftHead>
        <Logo>
          <ModeToggle onClick={onToggleMode}>M</ModeToggle>
        </Logo>
      </LeftHead>
      <RightHead>
        <Menu>
          <ul>
            <li>
              <TextButton
                onClickEvent={onSignInModalOpen}
                icon={faSignInAlt}
                text="sign in"
              />
            </li>
            <li>
              <TextButton
                onClickEvent={onSignUpModalOpen}
                icon={faUserPlus}
                text="sign up"
              />
            </li>
          </ul>
        </Menu>
        {isAuth && (
          <UserMenu>
            <Avatar
              type="button"
              onClick={onUserMenuToggle}
              isActive={isUserActive}
            >
              <img src={userInfo.userImageUrl} />
            </Avatar>
            <motion.div
              className="menuBox"
              animate={{ x: isUserActive ? -224 : 0 }}
              transition={{
                ease: 'backInOut',
              }}
            >
              <div>{userInfo.handle}</div>
            </motion.div>
          </UserMenu>
        )}
      </RightHead>
    </HeaderWrap>
  );
};

export default Header;
