import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import TextButton from '../../components/Button/TextButton';
import { HeaderWrap, LeftHead, RightHead, Menu, User } from './style';

const Header = () => {
  return (
    <HeaderWrap>
      <LeftHead>
        <Link to="/">
          <FontAwesomeIcon icon={faCoffee} />
          home
        </Link>
        <h1>MOIM</h1>
      </LeftHead>
      <RightHead>
        <Menu>
          <ul>
            <li>
              <TextButton
                onClickEvent={console.log('1')}
                icon={faSignInAlt}
                text="sign in"
              />
            </li>
            <li>
              <TextButton
                onClickEvent={console.log('2')}
                icon={faUserPlus}
                text="sign up"
              />
            </li>
          </ul>
        </Menu>
        <User>
          <span>유저 프로필 사진</span>
        </User>
      </RightHead>
    </HeaderWrap>
  );
};

export default Header;
