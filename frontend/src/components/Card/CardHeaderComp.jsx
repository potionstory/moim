import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardHeader } from './style';
import { getCommunityIcon, getMeetingIcon } from '../../utils/commonUtil';

const CardHeaderComp = ({ id, type, title, status, category }) => {
  return (
    <CardHeader status={status}>
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
        <div className="status">
          <span>{status}</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderComp;
