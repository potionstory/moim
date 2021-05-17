import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign, faEraser } from '@fortawesome/free-solid-svg-icons';
import { MoimDetailCostWrap } from './style';

const MoimDetailCost = ({
  cost,
  isEdit,
  costInputRef,
  onCostInputChange,
  onCostInputReset,
}) => {
  const isFree = cost === 0;

  return (
    <MoimDetailCostWrap isFree={isFree}>
      <span className="icon">
        <FontAwesomeIcon icon={faWonSign} />
      </span>
      <div className="costContent">
        {!isEdit ? (
          <span>{isFree ? 'free' : cost}</span>
        ) : (
          <div className="costInput">
            <input
              type="text"
              placeholder="금액을 입력해주세요"
              inputMode="numeric"
              value={cost !== 0 ? cost : ''}
              ref={costInputRef}
              onChange={onCostInputChange}
            />
            <button type="button" onClick={onCostInputReset}>
              <FontAwesomeIcon icon={faEraser} />
            </button>
          </div>
        )}
      </div>
    </MoimDetailCostWrap>
  );
};

export default MoimDetailCost;
