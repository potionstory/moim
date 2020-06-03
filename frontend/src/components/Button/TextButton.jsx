import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap, ButtonIconWrap, ButtonIcon, ButtonText } from './style';

const TextButton = ({ onClickEvent, icon, text }) => {
  return (
    <ButtonWrap>
      <button onClick={onClickEvent}>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={icon} />
          </ButtonIcon>
        </ButtonIconWrap>
        <ButtonText className="text">{text}</ButtonText>
      </button>
    </ButtonWrap>
  );
};

export default TextButton;
