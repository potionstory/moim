import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { InputWrap } from './style';

const InputItem = memo(
  ({
    index,
    isActive,
    isLast,
    form,
    confirmRef,
    onInputFocus,
    onInputChange,
    onInputBlur,
  }) => {
    const onKeyDown = useCallback(() => {
      if (isLast) confirmRef.current.click();
    }, [isLast]);

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
          onBlur={(e) => onInputBlur(e, index)}
          onChange={(e) => onInputChange(e, index)}
          onKeyDown={onKeyDown}
        />
      </InputWrap>
    );
  },
);

export default InputItem;
