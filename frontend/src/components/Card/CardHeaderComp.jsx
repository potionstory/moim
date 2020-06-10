import React from 'react';
import { CardHeader } from './style';

const CardHeaderComp = ({ icon, title, status }) => {
  return (
    <CardHeader>
      <span className="icon">
        <img src={icon} />
      </span>
      <div className="info">
        <span className="title">{title}</span>
        <div className="status">
          <span>{status}</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderComp;
