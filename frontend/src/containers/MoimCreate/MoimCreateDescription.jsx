import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';
import { MoimCreateDescriptionWrap } from './style';

const MoimCreateDescription = ({
  description,
  isEdit,
  max,
  onDescriptionChange,
}) => {
  return (
    <MoimCreateDescriptionWrap isEdit={isEdit}>
      <span className="icon">
        <FontAwesomeIcon icon={faAlignLeft} />
      </span>
      <div className="desciptionBox">
        {!isEdit ? (
          <p className="description">
            {description !== ''
              ? description
              : `이 모임을 간단히 설명해 주세요 (최대 ${max}자)`}
          </p>
        ) : (
          <TextareaAutosize
            className="description"
            value={description}
            onChange={onDescriptionChange}
          />
        )}
        {isEdit && (
          <span className="limit">
            <span className="now">{description.length}</span>
            {` / `}
            <span className="max">{max}</span>
          </span>
        )}
      </div>
    </MoimCreateDescriptionWrap>
  );
};

export default MoimCreateDescription;
