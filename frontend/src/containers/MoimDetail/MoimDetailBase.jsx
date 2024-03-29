import React, { memo } from 'react';
import MoimDetailType from './MoimDetailType';
import MoimDetailTitle from './MoimDetailTitle';
import MoimDetailLock from './MoimDetailLock';
import MoimDetailPayInfo from './MoimDetailPayInfo';
import MoimDetailStatus from './MoimDetailStatus';
import MoimDetailUrl from './MoimDetailUrl';
import MoimDetailTag from './MoimDetailTag';
import MoimDetailDescription from './MoimDetailDescription';
import { DESCRIPTION_MAX_LENGTH } from '../../lib/const';
import { MoimDetailBaseWrap } from './style';

const MoimDetailBase = memo(
  ({
    typeIndex,
    moimType,
    category,
    isEdit,
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
      <MoimDetailBaseWrap>
        {typeIndex !== -1 && (
          <MoimDetailType
            list={moimType}
            checkIndex={typeIndex}
            isEdit={isEdit}
            isIcon={category === 'community' ? false : true}
            name={moimType[typeIndex].name}
            onCheckChange={onTypeChange}
          />
        )}
        <MoimDetailTitle
          isEdit={isEdit}
          title={title}
          onTitleChange={onTitleChange}
        />
        <MoimDetailLock
          isEdit={isEdit}
          isLock={isLock}
          passNumber={passNumber}
          onLockChange={onLockChange}
          onPassNumberChange={onPassNumberChange}
        />
        <MoimDetailStatus
          list={moimStatus}
          status={status}
          isEdit={isEdit}
          onStatusChange={onStatusChange}
        />
        {category === 'community' ? (
          <MoimDetailUrl
            url={url}
            isEdit={isEdit}
            urlInputRef={urlInputRef}
            onUrlCopy={onUrlCopy}
            onUrlInputChange={onUrlInputChange}
            onUrlInputReset={onUrlInputReset}
          />
        ) : (
          <MoimDetailPayInfo
            payInfo={payInfo}
            isEdit={isEdit}
            costInputRef={costInputRef}
            accountInputRef={accountInputRef}
            onCostInputChange={onCostInputChange}
            onCostInputReset={onCostInputReset}
            onBankChange={onBankChange}
            onAccountInputChange={onAccountInputChange}
            onAccountInputReset={onAccountInputReset}
          />
        )}
        <MoimDetailTag
          tags={tags}
          isEdit={isEdit}
          tagInput={tagInput}
          tagInputRef={tagInputRef}
          onTagInputChange={onTagInputChange}
          onKeyTagEnter={onKeyTagEnter}
          onTagAdd={onTagAdd}
          onTagRemove={onTagRemove}
        />
        <MoimDetailDescription
          description={description}
          isEdit={isEdit}
          max={DESCRIPTION_MAX_LENGTH}
          onDescriptionChange={onDescriptionChange}
        />
      </MoimDetailBaseWrap>
    );
  },
);

export default MoimDetailBase;
