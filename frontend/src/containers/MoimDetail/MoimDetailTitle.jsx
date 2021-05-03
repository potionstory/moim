import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { MoimDetailTitleWrap } from './style';

const MoimDetailTitle = ({ isEdit, title, onTitleChange }) => {
  return (
    <MoimDetailTitleWrap isEdit={isEdit}>
      {!isEdit ? (
        <h3>{title}</h3>
      ) : (
        <TextareaAutosize
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onTitleChange}
        />
      )}
    </MoimDetailTitleWrap>
  );
};

export default MoimDetailTitle;
