import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';
import { CardHeader } from './style';
import { getCommunityIcon, getMeetingIcon } from '../../utils/commonUtil';

const CardHeaderComp = ({ item, category }) => {
  const { type, title, cost, status } = item;
  const id = item[`${category}Id`];

  return (
    <CardHeader status={status} isFree={!cost}>
      <span className="icon" type={type}>
        {category === 'community' ? (
          <img src={getCommunityIcon(type)} />
        ) : (
          <FontAwesomeIcon icon={getMeetingIcon(type)} />
        )}
      </span>
      <div className="info">
        <Link to={`/detail/${category}/${id}`} className="title">
          {title}
        </Link>
        <div className="subInfo">
          {category === 'meeting' && (
            <span className="cost">
              <FontAwesomeIcon icon={faWonSign} />
            </span>
          )}
          <span className="status">{status}</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderComp;
