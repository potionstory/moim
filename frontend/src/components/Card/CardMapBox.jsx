import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faLock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CardMapBoxWrap } from './style';

const CardMapBox = ({ isLock, name, address, type, mapRef, onAddressCopy }) => {
  return (
    <CardMapBoxWrap>
      {!isLock && type === 'offline' ? (
        <>
          <div ref={mapRef} className="mapArea"></div>
          <span className="locationName">{name}</span>
          <span className="addressBox">
            <span className="address">{address}</span>
            <button type="button" className="btnCopy" onClick={onAddressCopy}>
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </span>
        </>
      ) : (
        <div className="mapNone">
          <FontAwesomeIcon icon={isLock ? faLock : faMapMarkerAlt} />
          <span>{isLock ? 'locked' : 'online meeting'}</span>
        </div>
      )}
    </CardMapBoxWrap>
  );
};

export default CardMapBox;
