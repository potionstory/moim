import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonWrap, ButtonIcon, ButtonText } from './style';

const TextButton = ({ type, onClickEvent, icon, text }) => {
  return (
    <ButtonWrap type={type}>
      <button onClick={onClickEvent}>
        <ButtonIcon className="icon">
          <FontAwesomeIcon icon={icon} />
        </ButtonIcon>
        <ButtonText className="text">{text}</ButtonText>
      </button>
    </ButtonWrap>
  );
};

export default TextButton;
