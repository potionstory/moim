import React from 'react';
import IconList from '../../components/IconList';
import { MoimDetailTypeWrap } from './style';

const MoimDetailType = ({
  list,
  checkIndex,
  isEdit,
  isIcon,
  name,
  onCheckChange,
}) => {
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
};

export default MoimDetailType;
