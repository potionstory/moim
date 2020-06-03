import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';
import { ButtonWrap, ButtonIconWrap, ButtonIcon } from './style';

const IconButton = ({ onClickEvent, icon }) => {
  return (
    <ButtonWrap>
      <button onClick={onClickEvent}>
        <ButtonIconWrap>
          <Spinner />
          <ButtonIcon>
            <FontAwesomeIcon className="icon" icon={icon} />
          </ButtonIcon>
        </ButtonIconWrap>
      </button>
    </ButtonWrap>
  );
};

export default IconButton;
