import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonWrap } from './style';

const TextButton = memo(({ isFull = false, onClickEvent, icon, text }) => {
  return (
    <ButtonWrap isFull={isFull}>
      <button type="button" onClick={onClickEvent}>
        <FontAwesomeIcon icon={icon} />
        <span className="text">{text}</span>
      </button>
    </ButtonWrap>
  );
});

export default TextButton;
