import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import {
  LinkButtonWrap,
  ButtonIconWrap,
  ButtonIcon,
  ButtonText,
} from './style';

const LinkButton = ({ path, icon, text }) => {
  return (
    <LinkButtonWrap>
      <Link to={path}>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon icon={icon} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText>{text}</ButtonText>
      </Link>
    </LinkButtonWrap>
  );
};

export default LinkButton;
