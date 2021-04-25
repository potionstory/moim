import React from 'react';
import findIndex from 'lodash/findIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import StatusList from '../../components/StatusList';
import { MoimDetailStatusWrap } from './style';

const MoimDetailStatus = ({
  category,
  list,
  status,
  isEdit,
  onStatusChange,
}) => {
  return (
    <MoimDetailStatusWrap status={status} isEdit={isEdit}>
      <span className="icon">
        {category === 'community' ? (
          <FontAwesomeIcon icon={faLock} />
        ) : (
          <FontAwesomeIcon icon={faSpinner} />
        )}
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
