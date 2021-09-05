import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import Toggle from '../../Components/Toggle';
import { MoimCreateLockWrap } from './style';

const MoimCreateLock = ({ isEdit, isLock, onLockChange }) => {
  return (
    <MoimCreateLockWrap>
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
        {isEdit && isLock && (
          <button type="button" className="btnPassWord">
            <FontAwesomeIcon icon={faKey} />
          </button>
        )}
      </span>
    </MoimCreateLockWrap>
  );
};

export default MoimCreateLock;
