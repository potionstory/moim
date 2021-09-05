import React from 'react';
import IconList from '../../Components/IconList';
import { MoimCreateTypeWrap } from './style';

const MoimCreateType = ({
  list,
  checkIndex,
  isEdit,
  isIcon,
  name,
  onCheckChange,
}) => {
  return (
    <MoimCreateTypeWrap>
      <IconList
        list={list}
        checkIndex={checkIndex}
        isEdit={isEdit}
        isIcon={isIcon}
        onCheckChange={onCheckChange}
      />
      <span className="name">{name}</span>
    </MoimCreateTypeWrap>
  );
};

export default MoimCreateType;
