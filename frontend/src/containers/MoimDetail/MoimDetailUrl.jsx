import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faEraser } from '@fortawesome/free-solid-svg-icons';
import { MoimDetailUrlWrap } from './style';

const MoimDetailUrl = ({
  url,
  isEdit,
  urlInputRef,
  onUrlInputChange,
  onUrlInputReset,
}) => {
  return (
    <MoimDetailUrlWrap>
      <span className="icon">
        <FontAwesomeIcon icon={faLink} />
      </span>
      <div className="urlContent">
        {!isEdit ? (
          <a href={url} target="_black">
            {url}
          </a>
        ) : (
          <div className="urlInput">
            <input
              type="text"
              placeholder="URL을 입력해주세요"
              value={url}
              ref={urlInputRef}
              onChange={onUrlInputChange}
            />
            <button type="button" onClick={onUrlInputReset}>
              <FontAwesomeIcon icon={faEraser} />
            </button>
          </div>
        )}
      </div>
    </MoimDetailUrlWrap>
  );
};

export default MoimDetailUrl;
