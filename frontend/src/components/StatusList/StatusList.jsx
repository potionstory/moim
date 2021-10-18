import React, { memo } from 'react';
import { map } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { StatusListWrap, StatusItem, StatusItemButton } from './style';

const StatusList = memo(({ isEdit, list, checkIndex, onStatusChange }) => {
  return (
    <StatusListWrap>
      {!isEdit ? (
        <StatusItem status={list[checkIndex].name}>
          {list[checkIndex].name}
        </StatusItem>
      ) : (
        <ul>
          {map(list, (item, index) => {
            const isChecked = checkIndex === index;

            return (
              <li key={item.name}>
                <StatusItemButton
                  status={item.name}
                  isChecked={isChecked}
                  onClick={() => onStatusChange(index)}
                >
                  <span>
                    {checkIndex === index && <FontAwesomeIcon icon={faCheck} />}
                  </span>
                  {item.name}
                </StatusItemButton>
              </li>
            );
          })}
        </ul>
      )}
    </StatusListWrap>
  );
});

export default StatusList;
