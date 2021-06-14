import React from 'react';
import { isEqual } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import UserInfo from '../../components/UserInfo';
import { MoimDetailSummaryWrap } from './style';

const MoimDetailSummary = ({
  category,
  mainImage,
  userImage,
  userName,
  likeCount,
  isClient,
  isEdit,
  isSave,
  onJoinModalOpen,
  onExitModalOpen,
  onSave,
  onEditToggle,
}) => {
  return (
    <MoimDetailSummaryWrap isSave={isSave}>
      <div className="summaryInner">
        <div className="thumb">
          <img src={mainImage} />
        </div>
        <UserInfo image={userImage} name={userName} count={likeCount} />
        <div className="btnWrap">
          {category === 'meeting' && !isClient && (
            <>
              <button
                type="button"
                className="btnMain"
                onClick={onJoinModalOpen}
              >
                join
              </button>
              <button
                type="button"
                className="btnSub"
                onClick={onExitModalOpen}
              >
                <FontAwesomeIcon icon={faDoorOpen} />
              </button>
            </>
          )}
          {isClient && (
            <>
              {isEdit && (
                <button type="button" className="btnMain" onClick={() => isSave && onSave()}>
                  save
                </button>
              )}
              <button type="button" className="btnSub" onClick={onEditToggle}>
                {!isEdit ? (
                  <FontAwesomeIcon icon={faCog} />
                ) : (
                  <FontAwesomeIcon icon={faDoorOpen} />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </MoimDetailSummaryWrap>
  );
};

export default MoimDetailSummary;
