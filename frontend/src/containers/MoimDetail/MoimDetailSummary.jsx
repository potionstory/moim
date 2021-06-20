import React from 'react';
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
  isMoimClient,
  isEdit,
  isSave,
  onJoinModalOpen,
  onExitModalOpen,
  onSave,
  onEditToggle,
}) => {
  return (
    <MoimDetailSummaryWrap isMainActive={!isMoimClient || isSave}>
      <div className="summaryInner">
        <div className="thumb">
          <img src={mainImage} />
        </div>
        <UserInfo image={userImage} name={userName} count={likeCount} />
        <div className="btnWrap">
          {category === 'meeting' && !isMoimClient && (
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
          {isMoimClient && (
            <>
              {isEdit && (
                <button
                  type="button"
                  className="btnMain"
                  onClick={() => isSave && onSave()}
                >
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
