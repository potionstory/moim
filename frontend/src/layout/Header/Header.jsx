import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  toggleModeAction,
  signInModalOpenAction,
  signUpModalOpenAction,
} from '../../store/module/global';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import TextButton from '../../components/Button/TextButton';
import {
  HeaderWrap,
  LeftHead,
  Logo,
  ModeToggle,
  RightHead,
  Menu,
  User,
  Profile,
} from './style';

const Header = () => {
  const dispatch = useDispatch();

  const onToggleMode = useCallback(() => dispatch(toggleModeAction.REQUEST()), [
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
        <User>
          <Profile type="button">
            <img src="../../../public/favicon.png" />
          </Profile>
        </User>
      </RightHead>
    </HeaderWrap>
  );
};

export default Header;
