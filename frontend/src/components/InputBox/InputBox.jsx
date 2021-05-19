import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputBoxWrap } from './style';

const InputBox = ({
  placeholder,
  isNumber,
  value,
  max,
  color,
  inputRef,
  icon,
  onInputChange,
  onInputKeyPress,
  onButtonClick,
}) => {
  return (
    <InputBoxWrap isNumber={isNumber} color={color}>
      <input
        type={!isNumber ? 'text' : 'number'}
        placeholder={placeholder}
        inputMode={!isNumber ? 'text' : 'numeric'}
        value={value !== 0 ? value : ''}
        maxLength={max}
        ref={inputRef}
        onChange={onInputChange}
        onKeyPress={onInputKeyPress}
      />
      <button type="button" onClick={onButtonClick}>
        <FontAwesomeIcon icon={icon} />
      </button>
    </InputBoxWrap>
  );
};

export default InputBox;
