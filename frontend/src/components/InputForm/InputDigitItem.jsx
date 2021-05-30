import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { InputWrap } from './style';

const InputDigitItem = ({
  index,
  isActive,
  form,
  onInputFocus,
  onInputChange,
  onInputBlur,
}) => {
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
      <input
        type={form.type}
        name={form.name}
        placeholder={form.placeholder}
        value={form.value}
        disabled={form.isDisable}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={(e) => onInputChange(e, index)}
      />
    </InputWrap>
  );
};

export default InputDigitItem;
