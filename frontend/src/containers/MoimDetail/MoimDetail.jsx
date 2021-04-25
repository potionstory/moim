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
import { faEdit } from '@fortawesome/free-solid-svg-icons';
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
import MoimDetailType from './MoimDetailType';
import MoimDetailCost from './MoimDetailCost';
import MoimDetailStatus from './MoimDetailStatus';
import MoimDetailUrl from './MoimDetailUrl';
import MoimDetailTag from './MoimDetailTag';
import MoimDetailDescription from './MoimDetailDescription';
import MoimDetailContent from './MoimDetailContent';
import UserInfo from '../../components/UserInfo';
import IconButton from '../../components/Button/IconButton';
import { MoimDetailWrap, MoimDetailBase, MoimDetailTitle } from './style';

const DESCRIPTION_MAX_LENGTH = 150;

const MoimDetail = ({ category, id }) => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');

  const costInputRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();

  const moimType = useMemo(
    () => (category === 'community' ? communityType : meetingType),
    [category],
  );
  const moimStatus = useMemo(
    () => (category === 'community' ? communityStatus : meetingStatus),
    [category],
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

  const onStatusChange = useCallback(
    (index) => {
      setDetail((detail) => {
        return {
          ...detail,
          status: moimStatus[index].name,
        };
      });
    },
    [moimStatus],
  );

  const onCostInputChange = useCallback((e) => {
    const value = Number(e.target.value);

    setDetail((detail) => {
      return {
        ...detail,
        cost: value,
      };
    });
  }, []);

  const onCostInputReset = useCallback(() => {
    setDetail((detail) => {
      return {
        ...detail,
        cost: 0,
      };
    });

    costInputRef.current.focus();
  }, []);

  const onUrlInputChange = useCallback((e) => {
    const value = e.target.value;

    setDetail((detail) => {
      return {
        ...detail,
        url: value,
      };
    });
  }, []);

  const onUrlInputReset = useCallback(() => {
    setDetail((detail) => {
      return {
        ...detail,
        url: '',
      };
    });

    urlInputRef.current.focus();
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

  const onDescriptionChange = useCallback((e) => {
    const value = e.target.value;

    if (value.length <= DESCRIPTION_MAX_LENGTH) {
      setDetail((detail) => {
        return {
          ...detail,
          description: value,
        };
      });
    }
  }, []);

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
    cost,
    status,
    description,
    url,
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
                <MoimDetailType
                  list={moimType}
                  checkIndex={typeIndex}
                  isEdit={isEdit}
                  isIcon={category === 'community' ? false : true}
                  name={moimType[typeIndex].name}
                  onCheckChange={onTypeChange}
                />
              )}
              <MoimDetailTitle isEdit={isEdit}>
                {!isEdit ? (
                  <h3>{title}</h3>
                ) : (
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={onTitleChange}
                  />
                )}
              </MoimDetailTitle>
              {cost !== undefined && (
                <MoimDetailCost
                  cost={cost}
                  isEdit={isEdit}
                  costInputRef={costInputRef}
                  onCostInputChange={onCostInputChange}
                  onCostInputReset={onCostInputReset}
                />
              )}
              <MoimDetailStatus
                category={category}
                list={moimStatus}
                status={status}
                isEdit={isEdit}
                onStatusChange={onStatusChange}
              />
              {url !== undefined && (
                <MoimDetailUrl
                  url={url}
                  isEdit={isEdit}
                  urlInputRef={urlInputRef}
                  onUrlInputChange={onUrlInputChange}
                  onUrlInputReset={onUrlInputReset}
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
              <MoimDetailContent />
            </div>
          </MoimDetailBase>
        </MoimDetailWrap>
      )}
      <IconButton onClickEvent={onEditToggle} icon={faEdit} />
    </>
  );
};

export default MoimDetail;
