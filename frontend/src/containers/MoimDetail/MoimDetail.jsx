import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import trim from 'lodash/trim';
import filter from 'lodash/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  getCommunityAction,
  getMeetingAction,
  resetDetailAction,
} from '../../store/module/detail';
import {
  communityType,
  meetingType,
  communityStatus,
  meetingStatus,
} from '../../lib/const';
import MoimDetailStatus from './MoimDetailStatus';
import UserInfo from '../../components/UserInfo';
import IconList from '../../components/IconList';
import TagList from '../../components/TagList';
import IconButton from '../../components/Button/IconButton';
import {
  MoimDetailWrap,
  MoimDetailBase,
  MoimDetailTitle,
  MoimDetailTags,
} from './style';

const MoimDetail = ({ category, id }) => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');

  const tagInputRef = useRef();

  const moimType = useMemo(
    () => (category === 'community' ? communityType : meetingType),
    [category],
  );
  const moimStatus = useMemo(
    () => (category === 'community' ? communityStatus : meetingStatus),
    [category],
  );

  const onEditToggle = useCallback(() => {
    setIsEdit((isEdit) => !isEdit);
  }, []);

  const onTypeChange = useCallback(
    (index) => {
      setDetail((detail) => {
        return {
          ...detail,
          type: moimType[index].name,
        };
      });
    },
    [moimType],
  );

  const onTitleChange = useCallback((e) => {
    const { value } = e.target;

    setDetail((detail) => {
      return {
        ...detail,
        title: value,
      };
    });
  }, []);

  const onIsOpenChange = useCallback(() => {
    setDetail((detail) => {
      return {
        ...detail,
        status: detail.status === 'open' ? 'close' : 'open',
      };
    });
  }, []);

  const onTagInputChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const onTagAdd = useCallback(() => {
    const trimValue = trim(tagInput);

    if (
      findIndex(detail.tags, (item) => item === trimValue) === -1 &&
      trimValue !== ''
    ) {
      setDetail((detail) => {
        return {
          ...detail,
          tags: [...detail.tags, trimValue],
        };
      });
    }

    setTagInput('');
    tagInputRef.current.focus();
  }, [detail, tagInput]);

  const onTagRemove = useCallback(
    (tag) => {
      const tags = filter(detail.tags, (item) => item !== tag);

      setDetail({ ...detail, tags });
    },
    [detail],
  );

  const onKeyTagEnter = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onTagAdd();
      }
    },
    [tagInput],
  );

  const onGetCommunity = useCallback(
    () => dispatch(getCommunityAction.REQUEST(id)),
    [dispatch],
  );

  const onGetMeeting = useCallback(
    () => dispatch(getMeetingAction.REQUEST(id)),
    [dispatch],
  );

  const onResetDetail = useCallback(() => dispatch(resetDetailAction()), [
    dispatch,
  ]);

  useEffect(() => {
    if (category === 'community') {
      onGetCommunity(id);
    } else {
      onGetMeeting(id);
    }
    return () => {
      onResetDetail();
    };
  }, []);

  useEffect(() => {
    setDetail(moim);
  }, [moim]);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, (item) => item.name === detail.type));
  }, [moimType, detail]);

  const {
    mainImage,
    userImage,
    userName,
    likeCount,
    title,
    status,
    text,
    tags,
  } = detail;

  return (
    <>
      {!isEmpty(detail) && (
        <MoimDetailWrap>
          <MoimDetailBase>
            <div className="info">
              <div className="thumb">
                <img src={mainImage} />
              </div>
              <UserInfo image={userImage} name={userName} count={likeCount} />
            </div>
            <div className="summary">
              {typeIndex !== -1 && (
                <IconList
                  list={moimType}
                  checkIndex={typeIndex}
                  isEdit={isEdit}
                  isIcon={category === 'community' ? false : true}
                  onCheckChange={onTypeChange}
                />
              )}
              <MoimDetailTitle isEdit={isEdit}>
                {!isEdit ? (
                  <h3>{title}</h3>
                ) : (
                  <input type="text" placeholder="제목을 입력해주세요" value={title} onChange={onTitleChange} />
                )}
              </MoimDetailTitle>
              <MoimDetailStatus
                category={category}
                list={moimStatus}
                status={status}
                isEdit={isEdit}
                onIsOpenChange={onIsOpenChange}
              />
              <MoimDetailTags>
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
              </MoimDetailTags>
            </div>
          </MoimDetailBase>
        </MoimDetailWrap>
      )}
      <IconButton onClickEvent={onEditToggle} icon={faEdit} />
    </>
  );
};

export default MoimDetail;
