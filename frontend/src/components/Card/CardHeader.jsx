import React, { memo, useMemo } from 'react';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faWonSign } from '@fortawesome/free-solid-svg-icons';
import { getCommunityIcon, getMeetingIcon } from '../../utils/commonUtil';
import { CardHeaderWrap } from './style';

const CardHeader = memo(({ item, category, onHandleDetail }) => {
  const nowDate = dayjs().unix();
  const { userId, type, title, isLock, payInfo } = item;
  const id = item[`${category}Id`];

  const status = useMemo(() => {
    if (category === 'meeting' && !item.isLock) {
      const { startDate, endDate, memberNowCount, memberMaxCount } = item;

      if (nowDate < startDate._seconds) {
        if (memberNowCount < memberMaxCount) {
          return 'empty';
        } else {
          return 'full';
        }
      } else if (nowDate >= startDate._seconds && nowDate <= endDate._seconds) {
        return 'proceeding';
      } else {
        return 'complete';
      }
    } else {
      return item.status;
    }
  }, [item, category, nowDate]);

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
          onClick={() => onHandleDetail(id, userId, isLock)}
        >
          {title}
        </button>
        <div className="subInfo">
          {isLock && (
            <span className="lock">
              <FontAwesomeIcon icon={faLock} />
            </span>
          )}
          {!isLock && category === 'meeting' && (
            <span className="pay">
              <FontAwesomeIcon icon={faWonSign} />
            </span>
          )}
          {!isLock && <span className="status">{status}</span>}
        </div>
      </div>
    </CardHeaderWrap>
  );
});

export default CardHeader;
