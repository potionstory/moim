import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { CardMapBoxWrap } from './style';

const CardMapBox = memo(({ name, address, type, mapRef, onAddressCopy }) => {
  return (
    <CardMapBoxWrap>
      {type === 'offline' ? (
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
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span>online meeting</span>
        </div>
      )}
    </CardMapBoxWrap>
  );
});

export default CardMapBox;
