import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import { CardMainImageBoxWrap } from './style';

const CardMainImageBox = ({
  id,
  userId,
  isLock,
  mainImage,
  onHandleDetail,
}) => {
  return (
    <CardMainImageBoxWrap>
      <button
        type="button"
        className="thumb"
        onClick={() => onHandleDetail(id, userId, isLock)}
      >
        <img src={mainImage} />
      </button>
      <button
        type="button"
        className="cover"
        onClick={() => onHandleDetail(id, userId, isLock)}
      >
        <FontAwesomeIcon className="icon" icon={faDiceD6} />
      </button>
    </CardMainImageBoxWrap>
  );
};

export default CardMainImageBox;
