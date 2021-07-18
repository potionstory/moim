import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { getCommunityIcon, getMeetingIcon } from '../../utils/commonUtil';
import { CardHeaderWrap } from './style';

const CardHeader = ({ item, category, onHandleDetail }) => {
  const { type, title, isLock, payInfo, status } = item;
  const id = item[`${category}Id`];

  return (
    <CardHeaderWrap
      status={status}
      isFree={category === 'meeting' && !payInfo.cost}
    >
      <span className="icon" type={type}>
        {category === 'community' ? (
          <img src={getCommunityIcon(type)} />
        ) : (
          <FontAwesomeIcon icon={getMeetingIcon(type)} />
        )}
      </span>
      <div className="info">
        <button
          type="button"
          className="title"
          onClick={() => onHandleDetail(id, isLock)}
        >
          {title}
        </button>
        <div className="subInfo">
          {isLock && (
            <span className="lock">
              <FontAwesomeIcon icon={faLock} />
            </span>
          )}
          {category === 'meeting' && (
            <span className="pay">
              <FontAwesomeIcon icon={faWonSign} />
            </span>
          )}
          <span className="status">{status}</span>
        </div>
      </div>
    </CardHeaderWrap>
  );
};

export default CardHeader;
