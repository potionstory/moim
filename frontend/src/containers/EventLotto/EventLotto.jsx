import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceSix } from '@fortawesome/free-solid-svg-icons';
import { EventLottoWarp } from './style';

const EventLotto = () => {
  return (
    <EventLottoWarp>
      <div className="lottoBtn">
        <button type="button">
          <FontAwesomeIcon icon={faDiceSix} />
          fsdf
        </button>
      </div>
    </EventLottoWarp>
  );
};

export default EventLotto;
