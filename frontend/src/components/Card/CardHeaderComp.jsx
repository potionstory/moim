import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardHeader } from './style';
import { getCommunityIcon, getMeetingIcon } from '../../utils/commonUtil';

const CardHeaderComp = ({ service, type, title, status, category }) => {
  return (
    <CardHeader status={status}>
      <span className="icon" type={type}>
        {category === 'community' ? (
          <img src={getCommunityIcon(service)} />
        ) : (
          <FontAwesomeIcon icon={getMeetingIcon(type)} />
        )}
      </span>
      <div className="info">
        <h3>{title}</h3>
        <div className="status">
          <span>{status}</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderComp;
