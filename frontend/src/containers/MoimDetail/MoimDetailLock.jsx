import React, { useState, useRef, useCallback } from 'react';
import { isEmpty, map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../../Components/Toggle';
import { MoimDetailLockWrap } from './style';

const MoimDetailLock = ({
  isEdit,
  isLock,
  passNumber,
  onLockChange,
  onPassNumberChange,
}) => {
  const [isBackSpace, setIsBackSpace] = useState(false);
  const passNumberRef = useRef([]);

  const onChange = useCallback(
    (e, i) => {
      onPassNumberChange(e, i);

      // focus 이동
      if (
        !isBackSpace
          ? i + 1 < passNumber.length && isEmpty(passNumber[i + 1])
          : i !== 0 && isEmpty(passNumber[i + 1])
      ) {
        passNumberRef.current[!isBackSpace ? i + 1 : i - 1].focus();
      }
    },
    [passNumber, isBackSpace],
  );

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Backspace') {
      setIsBackSpace(true);
    } else if (e.keyCode >= 48 && e.keyCode <= 57) {
      setIsBackSpace(false);
    }
  }, []);

  return (
    <MoimDetailLockWrap>
      <span className="icon">
        <FontAwesomeIcon icon={faLock} />
      </span>
      <span className="lockContent">
        <Toggle
          isTheme={true}
          name={!isLock ? 'unlocked' : 'locked'}
          isChecked={isLock}
          onCheck={isEdit ? onLockChange : () => {}}
        />
        {isEdit && isLock && (
          <ul className="passNumber">
            {map(passNumber, (value, i) => {
              return (
                <li key={i}>
                  <input
                    type="number"
                    ref={(ref) => passNumberRef.current.push(ref)}
                    value={value}
                    onChange={(e) => onChange(e, i)}
                    onKeyDown={onKeyDown}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </span>
    </MoimDetailLockWrap>
  );
};

export default MoimDetailLock;
