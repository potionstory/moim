import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../../components/Toggle';
import { MoimDetailLockWrap } from './style';

const MoimDetailLock = ({ isEdit, isLock, onLockChange, onPassNumberModalOpen }) => {
  return (
    <MoimDetailLockWrap>
      <span className="icon">
        <FontAwesomeIcon icon={faLock} />
      </span>
      <span className="lockContent">
        <Toggle
          isTheme={true}
          name={!isLock ? 'unlocked' : 'locked'}
          isChecked={isLock}
          onCheck={isEdit ? onLockChange : () => {}}
        />
        {(isEdit && isLock) && (
          <button type="button" className="btnPassWord" onClick={onPassNumberModalOpen}>
            <FontAwesomeIcon icon={faKey} />
          </button>
        )}
      </span>
    </MoimDetailLockWrap>
  );
};

export default MoimDetailLock;
