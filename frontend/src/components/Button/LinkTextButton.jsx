import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap, ButtonIconWrap, ButtonIcon, ButtonText } from './style';

const LinkTextButton = ({ path, icon, text }) => {
  return (
    <ButtonWrap>
      <Link to={path}>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={icon} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText className="text">{text}</ButtonText>
      </Link>
    </ButtonWrap>
  );
};

export default LinkTextButton;
