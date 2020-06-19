import React from 'react';
import { CardHeader } from './style';
import { getCategoryIcon } from '../../utils/commonUtil';

const CardHeaderComp = ({ service, title, status }) => {
  return (
    <CardHeader status={status}>
      <span className="icon">
        <img src={getCategoryIcon(service)} />
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
