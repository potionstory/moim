import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap } from './style';

const LinkIconButton = ({ path, icon }) => {
  return (
    <ButtonWrap>
      <Link to={path}>
        <Spinner />
        <FontAwesomeIcon className="icon" icon={icon} />
      </Link>
    </ButtonWrap>
  );
};

export default LinkIconButton;
