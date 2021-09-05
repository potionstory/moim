import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCopy, faEraser } from '@fortawesome/free-solid-svg-icons';
import { MoimCreateUrlWrap } from './style';

const MoimCreateUrl = ({
  url,
  isEdit,
  urlInputRef,
  onUrlCopy,
  onUrlInputChange,
  onUrlInputReset,
}) => {
  return (
    <MoimCreateUrlWrap>
      <span className="icon">
        <FontAwesomeIcon icon={faLink} />
      </span>
      <div className="urlContent">
        {!isEdit ? (
          <a href={url} target="_black">
            {url}
          </a>
        ) : (
          <input
            type="text"
            placeholder="URL을 입력해주세요"
            value={url}
            ref={urlInputRef}
            onChange={onUrlInputChange}
          />
        )}
        <button type="button" onClick={!isEdit ? onUrlCopy : onUrlInputReset}>
          <FontAwesomeIcon icon={!isEdit ? faCopy : faEraser} />
        </button>
      </div>
    </MoimCreateUrlWrap>
  );
};

export default MoimCreateUrl;
