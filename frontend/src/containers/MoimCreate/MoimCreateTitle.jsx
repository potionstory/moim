import React, { memo } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { MoimCreateTitleWrap } from './style';

const MoimCreateTitle = memo(({ isEdit, title, onTitleChange }) => {
  return (
    <MoimCreateTitleWrap isEdit={isEdit}>
      {!isEdit ? (
        <h3>{title}</h3>
      ) : (
        <TextareaAutosize
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onTitleChange}
        />
      )}
    </MoimCreateTitleWrap>
  );
});

export default MoimCreateTitle;
