import React from 'react';
import map from 'lodash/map';
import { StatusListWrap, StatusItem } from './style';

const StatusList = ({ isEdit, list, checkIndex }) => {
  return (
    <StatusListWrap>
      {!isEdit ? (
        <StatusItem status={list[checkIndex].name} isCheck={true}>
          {list[checkIndex].name}
        </StatusItem>
      ) : (
        <ul>
          {map(list, (item, index) => {
            return (
              <li key={item.name}>
                <StatusItem status={item.name} isCheck={checkIndex === index}>
                  {item.name}
                </StatusItem>
              </li>
            );
          })}
        </ul>
      )}
    </StatusListWrap>
  );
};

export default StatusList;
