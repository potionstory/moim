import React from 'react';
import find from 'lodash/find';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign, faEraser } from '@fortawesome/free-solid-svg-icons';
import SelectBox from '../../components/SelectBox';
import { bankList } from '../../lib/const.js';
import { MoimDetailPayInfoWrap } from './style';

const MoimDetailPayInfo = ({
  payInfo,
  isEdit,
  costInputRef,
  onCostInputChange,
  onCostInputReset,
  onBankChange,
}) => {
  const { cost, bank, account } = payInfo;
  const isFree = cost === 0;

  return (
    <MoimDetailPayInfoWrap isFree={isFree}>
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
      <SelectBox value={find(bankList, { 'id': bank }).name} list={bankList} onSelectChange={onBankChange} />
      <input type="text" value={account} />
    </MoimDetailPayInfoWrap>
  );
};

export default MoimDetailPayInfo;
