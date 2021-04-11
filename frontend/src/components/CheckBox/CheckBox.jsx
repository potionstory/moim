import React from 'react';
import { CheckBoxWrap } from './style';

const CheckBox = ({ name, isChecked, onCheck }) => {
  return (
    <CheckBoxWrap isChecked={isChecked}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onCheck} />
        {name}
      </label>
    </CheckBoxWrap>
  );
};

export default CheckBox;
