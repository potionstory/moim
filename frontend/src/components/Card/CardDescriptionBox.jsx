import React from 'react';
import { CardDescriptionBoxWrap } from './style';

const CardDescriptionBox = ({ id, userId, isLock, description, onHandleDetail }) => {
  return (
    <CardDescriptionBoxWrap>
      <button type="button" onClick={() => onHandleDetail(id, userId, isLock)}>
        {description}
      </button>
    </CardDescriptionBoxWrap>
  );
};

export default CardDescriptionBox;
