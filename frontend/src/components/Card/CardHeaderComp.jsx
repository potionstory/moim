import React from 'react';
import { CardHeader } from './style';

const CardHeaderComp = ({ icon, title, status }) => {
  return (
    <CardHeader>
      <span className="icon">
        <img src={icon} />
      </span>
      <div className="info">
        <h3 className="title">{title}</h3>
        <div className="status">
          <span>{status}</span>
        </div>
      </div>
    </CardHeader>
  );
};

export default CardHeaderComp;
