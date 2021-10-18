import React, { memo } from 'react';
import { CardDescriptionBoxWrap } from './style';

const CardDescriptionBox = memo(({ id, userId, isLock, description, onHandleDetail }) => {
  return (
    <CardDescriptionBoxWrap>
      <button type="button" onClick={() => onHandleDetail(id, userId, isLock)}>
        {description}
      </button>
    </CardDescriptionBoxWrap>
  );
});

export default CardDescriptionBox;
