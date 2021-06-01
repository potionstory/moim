import React from 'react';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { InputWrap } from './style';

const InputDigitItem = ({
  index,
  isActive,
  form,
  onInputFocus,
  onInputPassNumberChange,
  onInputBlur,
}) => {
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
                value={value}
                disabled={form.isDisable}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                onChange={(e) => onInputPassNumberChange(e, index, i)}
              />
            </li>
          );
        })}
      </ul>
    </InputWrap>
  );
};

export default InputDigitItem;
