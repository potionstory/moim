import React from 'react';
import map from 'lodash/map';
import InputItem from './InputItem';
import { InputFormWrap, InputSubmit } from './style';

const InputForm = ({
  formData,
  focusInput,
  onInputFocus,
  onInputChange,
  onInputBlur,
  isActive,
  onConfirm,
  confirmText,
}) => {
  return (
    <InputFormWrap>
      {map(formData, (form, index) => (
        <InputItem
          key={index}
          isActive={form.name === focusInput}
          index={index}
          form={form}
          onInputFocus={onInputFocus}
          onInputChange={onInputChange}
          onInputBlur={onInputBlur}
        />
      ))}
      <InputSubmit isActive={isActive}>
        <button
          type="button"
          onClick={() => {
            isActive && onConfirm(formData);
          }}
        >
          {confirmText}
        </button>
      </InputSubmit>
      {/* <ValidationText>
        <span>이메일 형식이 올바르지 않습니다.</span>
        <span>패스워드 형식이 올바르지 않습니다.</span>
      </ValidationText> */}
    </InputFormWrap>
  );
};

export default InputForm;