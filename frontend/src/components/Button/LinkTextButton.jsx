import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap } from './style';

const LinkTextButton = ({ path, icon, text }) => {
  return (
    <ButtonWrap>
      <Link to={path}>
        <Spinner />
        <FontAwesomeIcon className="icon" icon={icon} />
        <span className="text">{text}</span>
      </Link>
    </ButtonWrap>
  );
};

export default LinkTextButton;
