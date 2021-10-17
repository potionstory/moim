import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';
import { CheckBoxWrap } from './style';

const CheckBox = memo(({ name, isChecked, isRequire, isInverse, onCheck }) => {
  return (
    <CheckBoxWrap isChecked={isRequire || isChecked} isInverse={isInverse}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onCheck} />
        {name}
        {isRequire && (
          <span className="required">
            <FontAwesomeIcon icon={faAsterisk} />
          </span>
        )}
      </label>
    </CheckBoxWrap>
  );
});

export default CheckBox;
