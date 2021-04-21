import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faPlus } from '@fortawesome/free-solid-svg-icons';
import TagList from '../../components/TagList';
import { MoimDetailTagWrap } from './style';

const MoimDetailTag = ({ tags, isEdit, tagInput, tagInputRef, onTagInputChange, onKeyTagEnter, onTagAdd, onTagRemove }) => {

  return (
    <MoimDetailTagWrap isEdit={isEdit}>
      <span className="icon">
        <FontAwesomeIcon icon={faTag} />
      </span>
      <div className="tagContent">
        {isEdit && (
          <div className="tagInput">
            <input
              type="text"
              placeholder="태그를 입력해주세요"
              value={tagInput}
              ref={tagInputRef}
              onChange={onTagInputChange}
              onKeyPress={onKeyTagEnter}
            />
            <button type="button" onClick={onTagAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
        <TagList list={tags} isEdit={isEdit} onRemove={onTagRemove} />
      </div>
    </MoimDetailTagWrap>
  );
};

export default MoimDetailTag;