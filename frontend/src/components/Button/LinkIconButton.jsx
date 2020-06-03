import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap, ButtonIconWrap, ButtonIcon } from './style';

const LinkIconButton = ({ path, icon }) => {
  return (
    <ButtonWrap>
      <Link to={path}>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={icon} />
          </ButtonIcon>
        </ButtonIconWrap>
      </Link>
    </ButtonWrap>
  );
};

export default LinkIconButton;
