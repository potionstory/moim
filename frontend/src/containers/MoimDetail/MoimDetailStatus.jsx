import React from 'react';
import findIndex from 'lodash/findIndex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faLockOpen,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import StatusList from '../../components/StatusList';
import { MoimDetailStatusWrap } from './style';

const MoimDetailStatus = ({
  category,
  list,
  status,
  isEdit,
  onIsOpenChange,
}) => {
  return (
    <MoimDetailStatusWrap status={status} isEdit={isEdit}>
      {category === 'community' && isEdit ? (
        <button type="button" className="icon" onClick={onIsOpenChange}>
          <FontAwesomeIcon icon={status === 'open' ? faLockOpen : faLock} />
        </button>
      ) : (
        <span className="icon">
          {category === 'community' ? (
            <FontAwesomeIcon icon={status === 'open' ? faLockOpen : faLock} />
          ) : (
            <FontAwesomeIcon icon={faSpinner} />
          )}
        </span>
      )}
      <StatusList
        isEdit={isEdit}
        list={list}
        checkIndex={findIndex(list, (item) => item.name === status)}
      />
    </MoimDetailStatusWrap>
  );
};

export default MoimDetailStatus;
