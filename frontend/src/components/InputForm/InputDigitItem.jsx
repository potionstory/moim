import React from 'react';
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

  console.log('form: ', form);
  return (
    <InputWrap
      isActive={isActive}
      isValue={form.value}
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
          )
        })}
      </ul>

    </InputWrap>
  );
};

export default InputDigitItem;
