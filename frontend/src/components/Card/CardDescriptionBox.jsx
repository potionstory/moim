import React from 'react';
import { CardDescriptionBoxWrap } from './style';

const CardDescriptionBox = ({ id, isLock, description, onHandleDetail }) => {
  return (
    <CardDescriptionBoxWrap>
      <button type="button" onClick={() => onHandleDetail(id, isLock)}>
        {description}
      </button>
    </CardDescriptionBoxWrap>
  );
};

export default CardDescriptionBox;
