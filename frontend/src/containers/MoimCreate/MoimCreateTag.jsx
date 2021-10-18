import React, { memo } from 'react';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faPlus } from '@fortawesome/free-solid-svg-icons';
import InputBox from '../../Components/InputBox';
import TagList from '../../Components/TagList';
import { MoimCreateTagWrap } from './style';

const MoimCreateTag = memo(({
  tags,
  isEdit,
  tagInput,
  tagInputRef,
  onTagInputChange,
  onKeyTagEnter,
  onTagAdd,
  onTagRemove,
}) => {
  return (
    <MoimCreateTagWrap isEdit={isEdit}>
      <span className="icon">
        <FontAwesomeIcon icon={faTag} />
      </span>
      <div className="tagContent">
        {isEdit && (
          <div className="tagInput">
            <InputBox
              placeholder="태그를 입력해주세요"
              isNumber={false}
              value={tagInput}
              max={40}
              inputRef={tagInputRef}
              icon={faPlus}
              onInputChange={onTagInputChange}
              onInputKeyPress={onKeyTagEnter}
              onButtonClick={onTagAdd}
            />
          </div>
        )}
        {!isEmpty(tags) && (
          <TagList list={tags} isEdit={isEdit} onRemove={onTagRemove} />
        )}
      </div>
    </MoimCreateTagWrap>
  );
});

export default MoimCreateTag;
