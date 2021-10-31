import React, { memo, useRef } from 'react';
import { map, isArray } from 'lodash';
import InputItem from './InputItem';
import InputDigitItem from './InputDigitItem';
import { InputFormWrap, InputSubmit } from './style';

const InputForm = memo(
  ({
    formData,
    focusInput,
    onInputFocus,
    onInputChange,
    onInputPassDigitChange,
    onInputBlur,
    isActive,
    onConfirm,
    confirmText,
  }) => {
    const confirmRef = useRef();

    return (
      <InputFormWrap>
        {map(formData, (form, index) => {
          const { value } = form;

          if (!isArray(value)) {
            return (
              <InputItem
                key={index}
                index={index}
                isActive={form.name === focusInput}
                isLast={index === formData.length - 1}
                form={form}
                confirmRef={confirmRef}
                onInputFocus={onInputFocus}
                onInputChange={onInputChange}
                onInputBlur={onInputBlur}
              />
            );
          } else {
            return (
              <InputDigitItem
                key={index}
                isActive={form.name === focusInput}
                index={index}
                form={form}
                confirmRef={confirmRef}
                onInputFocus={onInputFocus}
                onInputPassDigitChange={onInputPassDigitChange}
                onInputBlur={onInputBlur}
              />
            );
          }
        })}
        <InputSubmit isActive={isActive}>
          <button
            type="button"
            ref={confirmRef}
            onClick={() => {
              isActive && onConfirm(formData);
            }}
          >
            {confirmText}
          </button>
        </InputSubmit>
      </InputFormWrap>
    );
  },
);

export default InputForm;
