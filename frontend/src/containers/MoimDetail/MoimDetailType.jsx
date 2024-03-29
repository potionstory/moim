import React, { memo } from 'react';
import IconList from '../../Components/IconList';
import { MoimDetailTypeWrap } from './style';

const MoimDetailType = memo(
  ({ list, checkIndex, isEdit, isIcon, name, onCheckChange }) => {
    return (
      <MoimDetailTypeWrap>
        <IconList
          list={list}
          checkIndex={checkIndex}
          isEdit={isEdit}
          isIcon={isIcon}
          onCheckChange={onCheckChange}
        />
        <span className="name">{name}</span>
      </MoimDetailTypeWrap>
    );
  },
);

export default MoimDetailType;
