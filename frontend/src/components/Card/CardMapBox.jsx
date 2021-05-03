import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CardMapBoxWrap } from './style';

const CardMapBox = ({ type, mapRef }) => {
  return (
    <CardMapBoxWrap>
      {type === 'offline' ? (
        <div ref={mapRef} className="mapArea"></div>
      ) : (
        <div className="mapNone">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>online meeting</span>
        </div>
      )}
    </CardMapBoxWrap>
  );
};

export default CardMapBox;
