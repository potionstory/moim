import React from 'react';
import { findIndex } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import StatusList from '../../Components/StatusList';
import { MoimDetailStatusWrap } from './style';

const MoimDetailStatus = ({ list, status, isEdit, onStatusChange }) => {
  return (
    <MoimDetailStatusWrap status={status} isEdit={isEdit}>
      <span className="icon">
        <FontAwesomeIcon icon={faSpinner} />
      </span>
      <span className="statusContent">
        <StatusList
          isEdit={isEdit}
          list={list}
          checkIndex={findIndex(list, (item) => item.name === status)}
          onStatusChange={onStatusChange}
        />
      </span>
    </MoimDetailStatusWrap>
  );
};

export default MoimDetailStatus;
