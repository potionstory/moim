import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import UserInfo from '../../components/UserInfo';
import { MoimDetailSummaryWrap } from './style';

const MoimDetailSummary = ({
  mainImage,
  userImage,
  userName,
  likeCount,
  isClient,
  isEdit,
  onJoinModalOpen,
  onExitModalOpen,
  onEditCancel,
}) => {
  return (
    <MoimDetailSummaryWrap>
      <div className="summaryInner">
        <div className="thumb">
          <img src={mainImage} />
        </div>
        <UserInfo image={userImage} name={userName} count={likeCount} />
        <div className="btnWrap">
          {!isClient ? (
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
          ) : (
            <>
              {isEdit && (
                <button
                  type="button"
                  className="btnMain"
                  onClick={onJoinModalOpen}
                >
                  save
                </button>
              )}
              <button type="button" className="btnSub" onClick={onEditCancel}>
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
