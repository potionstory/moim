import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { CardLockBoxWrap } from './style';

const CardLockBox = () => {
  return (
    <CardLockBoxWrap>
      <FontAwesomeIcon icon={faLock} />
      <span>locked</span>
    </CardLockBoxWrap>
  );
};

export default CardLockBox;
