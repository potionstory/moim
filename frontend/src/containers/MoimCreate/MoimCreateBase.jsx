import React, { memo } from 'react';
import MoimCreateType from './MoimCreateType';
import MoimCreateTitle from './MoimCreateTitle';
import MoimCreateLock from './MoimCreateLock';
import MoimCreateStatus from './MoimCreateStatus';
import MoimCreatePayInfo from './MoimCreatePayInfo';
import MoimCreateUrl from './MoimCreateUrl';
import MoimCreateTag from './MoimCreateTag';
import MoimCreateDescription from './MoimCreateDescription';
import { DESCRIPTION_MAX_LENGTH } from '../../lib/const';
import { MoimCreateBaseWrap } from './style';

const MoimCreateBase = memo(({
  isEdit,
  typeIndex,
  moimType,
  category,
  title,
  isLock,
  passNumber,
  moimStatus,
  status,
  payInfo,
  url,
  tags,
  tagInput,
  description,
  costInputRef,
  accountInputRef,
  urlInputRef,
  tagInputRef,
  onTypeChange,
  onTitleChange,
  onLockChange,
  onPassNumberChange,
  onStatusChange,
  onCostInputChange,
  onCostInputReset,
  onBankChange,
  onAccountInputChange,
  onAccountInputReset,
  onUrlCopy,
  onUrlInputChange,
  onUrlInputReset,
  onTagInputChange,
  onKeyTagEnter,
  onTagAdd,
  onTagRemove,
  onDescriptionChange,
}) => {

  return (
    <MoimCreateBaseWrap>
      {typeIndex !== -1 && moimType[typeIndex] !== undefined && (
        <MoimCreateType
          isEdit={isEdit}
          list={moimType}
          checkIndex={typeIndex}
          isIcon={category === 'community' ? false : true}
          name={moimType[typeIndex].name}
          onCheckChange={onTypeChange}
        />
      )}
      <MoimCreateTitle
        isEdit={isEdit}
        title={title}
        onTitleChange={onTitleChange}
      />
      <MoimCreateLock
        isEdit={isEdit}
        isLock={isLock}
        passNumber={passNumber}
        onLockChange={onLockChange}
        onPassNumberChange={onPassNumberChange}
      />
      <MoimCreateStatus
        isEdit={isEdit}
        list={moimStatus}
        status={status}
        onStatusChange={onStatusChange}
      />
      {category === 'community' ? (
        <MoimCreateUrl
          isEdit={isEdit}
          url={url}
          urlInputRef={urlInputRef}
          onUrlCopy={onUrlCopy}
          onUrlInputChange={onUrlInputChange}
          onUrlInputReset={onUrlInputReset}
        />
      ) : (
        <MoimCreatePayInfo
          isEdit={isEdit}
          payInfo={payInfo}
          costInputRef={costInputRef}
          accountInputRef={accountInputRef}
          onCostInputChange={onCostInputChange}
          onCostInputReset={onCostInputReset}
          onBankChange={onBankChange}
          onAccountInputChange={onAccountInputChange}
          onAccountInputReset={onAccountInputReset}
        />
      )}
      <MoimCreateTag
        isEdit={isEdit}
        tags={tags}
        tagInput={tagInput}
        tagInputRef={tagInputRef}
        onTagInputChange={onTagInputChange}
        onKeyTagEnter={onKeyTagEnter}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
      />
      <MoimCreateDescription
        isEdit={isEdit}
        description={description}
        max={DESCRIPTION_MAX_LENGTH}
        onDescriptionChange={onDescriptionChange}
      />
    </MoimCreateBaseWrap>
  );
});

export default MoimCreateBase;
