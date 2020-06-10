import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleRight,
  faCalendar,
  faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../Spinner';
import { CardAddInfo } from './style';

const CardAddInfoComp = ({ date, place }) => {
  return (
    <CardAddInfo>
      <button type="button" className="infoItem">
        <span className="info">
          <span className="iconWrap">
            <Spinner />
            <span className="icon">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </span>
          <b>{date}</b>
        </span>
        <span className="arrow">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </button>
      <button type="button" className="infoItem">
        <span className="info">
          <span className="iconWrap">
            <Spinner />
            <span className="icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
          </span>
          <b>{place}</b>
        </span>
        <span className="arrow">
          <FontAwesomeIcon icon={faAngleRight} />
        </span>
      </button>
    </CardAddInfo>
  );
};

export default CardAddInfoComp;
