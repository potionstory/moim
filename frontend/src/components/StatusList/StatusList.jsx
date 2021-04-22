import React from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { StatusListWrap, StatusItem } from './style';

const StatusList = ({ isEdit, list, checkIndex, onStatusChange }) => {
  return (
    <StatusListWrap>
      {!isEdit ? (
        <StatusItem status={list[checkIndex].name} isChecked={true}>
          {list[checkIndex].name}
        </StatusItem>
      ) : (
        <ul>
          {map(list, (item, index) => {
            const isChecked = checkIndex === index;

            return (
              <li key={item.name}>
                <StatusItem isEdit={isEdit} status={item.name} isChecked={isChecked} onClick={() => onStatusChange(index)}>
                  <span>
                    {checkIndex === index && <FontAwesomeIcon icon={faCheck} />}
                  </span>
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
