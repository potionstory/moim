import React from 'react';
import { isNull } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faImage, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import UserInfo from '../../Components/UserInfo';
import { MoimCreateSummaryWrap } from './style';

const MoimCreateSummary = ({
  mainImage,
  userImage,
  userAvatar,
  userName,
  likeCount,
  isSave,
  onMainImageChange,
  onSave,
}) => {
  return (
    <MoimCreateSummaryWrap isMainActive={isSave}>
      <div className="summaryInner">
        <div className="thumb">
          <label className="btnUpload">
            <FontAwesomeIcon icon={faCog} />
            <input
              type="file"
              accept="image/jpg,image/png,image/jpeg"
              onChange={onMainImageChange}
            />
          </label>
          {isNull(mainImage) ? (
            <span className="imageNone">
              <FontAwesomeIcon icon={faImage} />
            </span>
          ) : (
            <img src={mainImage} />
          )}
        </div>
        <UserInfo
          image={userImage}
          avatar={userAvatar}
          name={userName}
          count={likeCount}
        />
        <div className="btnWrap">
          <button
            type="button"
            className="btnMain"
            onClick={() => isSave && onSave()}
          >
            save
          </button>
          <button type="button" className="btnSub">
            <FontAwesomeIcon icon={faRedoAlt} />
          </button>
        </div>
      </div>
    </MoimCreateSummaryWrap>
  );
};

export default MoimCreateSummary;
