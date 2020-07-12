import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonWrap } from './style';

const IconButton = ({ onClickEvent, icon }) => {
  return (
    <ButtonWrap>
      <button type="button" onClick={onClickEvent}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </ButtonWrap>
  );
};

export default IconButton;
