import React, { memo } from 'react';
import { isNull } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import UserInfo from '../../Components/UserInfo';
import { MoimDetailSummaryWrap } from './style';

const MoimDetailSummary = memo(
  ({
    category,
    thumbImage,
    mainImage,
    userImage,
    userAvatar,
    userName,
    likeCount,
    isAuth,
    isMoimClient,
    isMoimMember,
    isEdit,
    isSave,
    onThumbImageChange,
    onJoinModalOpen,
    onExitModalOpen,
    onSave,
    onEditToggle,
  }) => {
    return (
      <MoimDetailSummaryWrap isMainActive={!isMoimClient || isSave}>
        <div className="summaryInner">
          <div className="thumb">
            {isEdit && (
              <label className="btnUpload">
                <FontAwesomeIcon icon={faCog} />
                <input
                  type="file"
                  accept="image/jpg,image/png,image/jpeg"
                  onChange={onThumbImageChange}
                />
              </label>
            )}
            <img src={isNull(thumbImage) ? mainImage : thumbImage} />
          </div>
          <UserInfo
            image={userImage}
            avatar={userAvatar}
            name={userName}
            count={likeCount}
          />
          <div className="btnWrap">
            {category === 'meeting' && !isMoimClient && (
              <>
                {(!isAuth || !isMoimMember) && (
                  <button
                    type="button"
                    className="btnMain"
                    onClick={onJoinModalOpen}
                  >
                    join
                  </button>
                )}
                {(!isAuth || isMoimMember) && (
                  <button
                    type="button"
                    className="btnSub"
                    onClick={onExitModalOpen}
                  >
                    <FontAwesomeIcon icon={faDoorOpen} />
                  </button>
                )}
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
  },
);

export default MoimDetailSummary;
