import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonWrap, ButtonIcon } from './style';

const IconButton = ({ type, onClickEvent, icon }) => {
  return (
    <ButtonWrap type={type}>
      <button onClick={onClickEvent}>
        <ButtonIcon className="icon">
          <FontAwesomeIcon icon={icon} />
        </ButtonIcon>
      </button>
    </ButtonWrap>
  );
};

export default IconButton;
