import React, { memo, useCallback } from 'react';
import { find } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faWonSign, faEraser } from '@fortawesome/free-solid-svg-icons';
import InputBox from '../../Components/InputBox';
import SelectBox from '../../Components/SelectBox';
import { color } from '../../lib/styles/palette';
import { bankList } from '../../lib/const.js';
import { MoimDetailPayInfoWrap } from './style';

const MoimDetailPayInfo = memo(
  ({
    payInfo,
    isEdit,
    costInputRef,
    accountInputRef,
    onCostInputChange,
    onCostInputReset,
    onBankChange,
    onAccountInputChange,
    onAccountInputReset,
  }) => {
    const { cost, bank, account } = payInfo;
    const isFree = cost === 0;

    const onPayInfoCopy = useCallback(() => {
      navigator.clipboard.writeText(
        `${cost}원 ${find(bankList, { id: bank }).name} ${account}`,
      );
    }, [payInfo]);

    return (
      <MoimDetailPayInfoWrap isFree={isFree}>
        <span className="icon">
          <FontAwesomeIcon icon={faWonSign} />
        </span>
        <div className="payContent">
          {!isEdit ? (
            <>
              <span className={`payInfo ${!isFree && 'cost'}`}>
                {isFree ? 'free' : cost}
              </span>
              {!isFree && (
                <>
                  <span className="payInfo">
                    {find(bankList, { id: bank }).name}
                  </span>
                  <span className="payInfo">{account}</span>
                  <button
                    type="button"
                    className="btnCopy"
                    onClick={onPayInfoCopy}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              <div className="payInput">
                <InputBox
                  placeholder="금액을 입력해주세요"
                  isNumber={true}
                  value={cost}
                  max={99999999}
                  color={color.orange}
                  inputRef={costInputRef}
                  icon={faEraser}
                  onInputChange={onCostInputChange}
                  onButtonClick={onCostInputReset}
                />
              </div>
              {!isFree && (
                <>
                  <div className="payInput">
                    <SelectBox
                      defaultValue="은행 선택"
                      value={bank !== '' && find(bankList, { id: bank }).name}
                      list={bankList}
                      onSelectChange={onBankChange}
                    />
                  </div>
                  {bank !== '' && (
                    <div className="payInput flex">
                      <InputBox
                        placeholder="계좌번호를 입력해주세요"
                        isNumber={true}
                        value={account}
                        max={20}
                        inputRef={accountInputRef}
                        icon={faEraser}
                        onInputChange={onAccountInputChange}
                        onButtonClick={onAccountInputReset}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </MoimDetailPayInfoWrap>
    );
  },
);

export default MoimDetailPayInfo;
