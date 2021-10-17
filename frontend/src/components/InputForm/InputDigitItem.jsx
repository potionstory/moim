import React, { memo, useState, useRef, useCallback } from 'react';
import { isEmpty, map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { InputWrap } from './style';

const InputDigitItem = memo(
  ({
    index,
    isActive,
    form,
    onInputFocus,
    onInputPassDigitChange,
    onInputBlur,
  }) => {
    const [isBackSpace, setIsBackSpace] = useState(false);
    const digitRef = useRef([]);

    const onDigitChange = useCallback(
      (e, index, i) => {
        onInputPassDigitChange(e, index, i);

        // focus 이동
        if (
          !isBackSpace
            ? i + 1 < form.value.length && isEmpty(form.value[i + 1])
            : i !== 0 && isEmpty(form.value[i + 1])
        ) {
          digitRef.current[!isBackSpace ? i + 1 : i - 1].focus();
        }
      },
      [form, isBackSpace],
    );

    const onDigitKeyDown = useCallback((e) => {
      if (e.key === 'Backspace') {
        setIsBackSpace(true);
      } else if (e.keyCode >= 48 && e.keyCode <= 57) {
        setIsBackSpace(false);
      }
    }, []);

    return (
      <InputWrap
        isActive={isActive}
        isValue={map(form.value, (v) => !isEmpty(v)).some((v) => v === true)}
        isCheck={form.isCheck}
        isDisable={form.isDisable}
      >
        <span className="inputCheck">
          {form.isCheck ? (
            <FontAwesomeIcon icon={faCheck} />
          ) : (
            <FontAwesomeIcon icon={form.icon} />
          )}
        </span>
        <ul className="numberList">
          {map(form.value, (value, i) => {
            return (
              <li key={i}>
                <input
                  type={form.type}
                  name={form.name}
                  placeholder={form.placeholder}
                  ref={(ref) => digitRef.current.push(ref)}
                  value={value}
                  disabled={form.isDisable}
                  onFocus={onInputFocus}
                  onBlur={onInputBlur}
                  onChange={(e) => onDigitChange(e, index, i)}
                  onKeyDown={onDigitKeyDown}
                />
              </li>
            );
          })}
        </ul>
      </InputWrap>
    );
  },
);

export default InputDigitItem;
