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
import MoimDetailCost from './MoimDetailCost';
import MoimDetailStatus from './MoimDetailStatus';
import MoimDetailTag from './MoimDetailTag';
import UserInfo from '../../components/UserInfo';
import IconList from '../../components/IconList';
import IconButton from '../../components/Button/IconButton';
import { MoimDetailWrap, MoimDetailBase, MoimDetailTitle } from './style';

const MoimDetail = ({ category, id }) => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');

  const costInputRef = useRef();
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
    cost,
    status,
    description,
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
              {/* IconList 와 이름을 포함한 MoimDetailType 만들기(아이콘과 이름은 가로정렬 flex) */}
              {/* 타입 Container 를 제외한 다른 Container 의 앞에 있는 아이콘은 좀 더 특별한 색상으로 디자인 하기 */}
              {typeIndex !== -1 && (
                <>
                  <IconList
                    list={moimType}
                    checkIndex={typeIndex}
                    isEdit={isEdit}
                    isIcon={category === 'community' ? false : true}
                    onCheckChange={onTypeChange}
                  />
                  {/* <span>{moimType[typeIndex].name}</span> */}
                </>
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
              <div className="description">{description}</div>
            </div>
          </MoimDetailBase>
        </MoimDetailWrap>
      )}
      <IconButton onClickEvent={onEditToggle} icon={faEdit} />
    </>
  );
};

export default MoimDetail;
