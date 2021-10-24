import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findIndex, isEqual, isEmpty, trim, filter } from 'lodash';
import { produce } from 'immer';
import dayjs from 'dayjs';
import MoimCreateSummary from './MoimCreateSummary';
import MoimCreateBase from './MoimCreateBase';
import MoimCreateAdditional from './MoimCreateAdditional';
import MoimCreateContent from './MoimCreateContent';
import MoimCreateSchedule from './MoimCreateSchedule';
import MoimCreateMap from './MoimCreateMap';
import MoimCreateMember from './MoimCreateMember';
import {
  postCommunityAction,
  postMeetingAction,
} from '../../store/module/detail';
import {
  moimCommonData,
  moimCommunityData,
  moimMeetingData,
  communityType,
  meetingType,
  communityStatus,
  meetingStatus,
} from '../../lib/const';
import { DESCRIPTION_MAX_LENGTH } from '../../lib/const';
import { MoimCreateWrap, MoimCreateInfo } from './style';

const isEdit = true;

const MoimCreate = memo(({ category }) => {
  const dispatch = useDispatch();

  const userInfo = useSelector(({ auth }) => auth.userInfo);

  const [commonDetail, setCommonDetail] = useState(moimCommonData);
  const [mainImage, setMainImage] = useState('');
  const [mainImageFile, setMainImageFile] = useState(null);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [passNumber, setPassNumber] = useState(new Array(6).fill(''));
  const [status, setStatus] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});
  const [location, setLocation] = useState({});
  const [memberSetting, setMemberSetting] = useState({});
  const [memberList, setMemberList] = useState([]);
  const [waiter, setWaiter] = useState([]);

  const [addDetail, setAddDetail] = useState(
    category === 'community' ? moimCommunityData : moimMeetingData,
  );
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const costInputRef = useRef();
  const accountInputRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();

  const { userId, userImage, userAvatar, userName } = userInfo;

  const moimType = useMemo(
    () => (category === 'community' ? communityType : meetingType),
    [category],
  );

  const moimStatus = useMemo(
    () => (category === 'community' ? communityStatus : meetingStatus),
    [category],
  );

  const onMainImageChange = useCallback(
    (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setCommonDetail(
          produce((draft) => {
            draft.mainImage = reader.result;
            draft.mainImageFile = file;
          }),
        );

        setMainImage(reader.result);
        setMainImageFile(file);
      };

      reader.readAsDataURL(file);
    },
    [dispatch],
  );

  const onSave = useCallback(() => {
    if (category === 'community') {
      dispatch(
        postCommunityAction.REQUEST({
          formData: {
            ...commonDetail,
            ...addDetail,
            userId,
            userImage,
            userAvatar,
            userName,
          },
        }),
      );
    } else if (category === 'meeting') {
      dispatch(
        postMeetingAction.REQUEST({
          formData: {
            ...commonDetail,
            ...addDetail,
            userId,
            userImage,
            userAvatar,
            userName,
          },
        }),
      );
    }
  }, [dispatch, commonDetail, addDetail]);

  const onTypeChange = useCallback(
    (index) => {
      setType(moimType[index].name);
    },
    [moimType],
  );

  const onTitleChange = useCallback((e) => {
    const { value } = e.target;

    setCommonDetail(
      produce((draft) => {
        draft.title = value;
      }),
    );
  }, []);

  const onLockChange = useCallback(() => {
    setCommonDetail(
      produce((draft) => {
        draft.isLock = !draft.isLock;
        if (draft.isLock) {
          draft.passNumber = new Array(6).fill('');
        }
      }),
    );
  }, [dispatch]);

  const onPassNumberChange = useCallback((e, i) => {
    const { value } = e.target;

    if (value <= 9) {
      setCommonDetail(
        produce((draft) => {
          draft.passNumber[i] = value;
        }),
      );
    }
  }, []);

  const onStatusChange = useCallback(
    (index) => {
      setAddDetail(
        produce((draft) => {
          draft.status = moimStatus[index].name;
        }),
      );
    },
    [moimStatus],
  );

  const onCostInputChange = useCallback((e) => {
    const value = parseInt(!isEmpty(e.target.value) ? e.target.value : 0);

    if (value >= 0 && value <= 99999999) {
      setAddDetail(
        produce((draft) => {
          draft.payInfo.cost = value ? value : 0;
        }),
      );
    }
  }, []);

  const onCostInputReset = useCallback(() => {
    setAddDetail(
      produce((draft) => {
        draft.payInfo.cost = 0;
      }),
    );

    costInputRef.current.focus();
  }, []);

  const onBankChange = useCallback((bank) => {
    setAddDetail(
      produce((draft) => {
        draft.payInfo.bank = bank;
      }),
    );
  }, []);

  const onAccountInputChange = useCallback((e) => {
    const { value } = e.target;

    setAddDetail(
      produce((draft) => {
        draft.payInfo.account = value ? value : '';
      }),
    );
  }, []);

  const onAccountInputReset = useCallback(() => {
    setAddDetail(
      produce((draft) => {
        draft.payInfo.account = '';
      }),
    );

    accountInputRef.current.focus();
  }, []);

  const onUrlCopy = useCallback(() => {
    const { url } = addDetail;

    navigator.clipboard.writeText(url);
  }, [addDetail]);

  const onUrlInputChange = useCallback((e) => {
    const value = e.target.value;

    setAddDetail(
      produce((draft) => {
        draft.url = value;
      }),
    );
  }, []);

  const onUrlInputReset = useCallback(() => {
    setAddDetail(
      produce((draft) => {
        draft.url = '';
      }),
    );

    urlInputRef.current.focus();
  }, []);

  const onTagInputChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const onTagAdd = useCallback(() => {
    const trimValue = trim(tagInput);

    if (
      findIndex(commonDetail.tags, (item) => item === trimValue) === -1 &&
      trimValue !== ''
    ) {
      setCommonDetail(
        produce((draft) => {
          draft.tags.push(trimValue);
        }),
      );
    }

    setTagInput('');
    tagInputRef.current.focus();
  }, [commonDetail, tagInput]);

  const onTagRemove = useCallback(
    (tag) => {
      const tags = filter(commonDetail.tags, (item) => item !== tag);

      setCommonDetail(
        produce((draft) => {
          draft.tags = tags;
        }),
      );
    },
    [commonDetail],
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
      setCommonDetail(
        produce((draft) => {
          draft.description = value;
        }),
      );
    }
  }, []);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  const onScheduleChange = useCallback((name, date) => {
    setAddDetail(
      produce((draft) => {
        draft[name]._seconds = dayjs(date).unix();
      }),
    );
  }, []);

  const onHandleLocation = useCallback((name, coord) => {
    setAddDetail(
      produce((draft) => {
        draft.location = {
          name,
          coordinate: {
            _latitude: coord[0],
            _longitude: coord[1],
          },
        };
      }),
    );
  }, []);

  const onIsSelfCheck = useCallback(() => {
    setAddDetail(
      produce((draft) => {
        draft.memberSetting.isSelf = !draft.memberSetting.isSelf;
      }),
    );
  }, []);

  const onJoinFormCheck = useCallback((name) => {
    setAddDetail(
      produce((draft) => {
        draft.memberSetting.formData[name] = !draft.memberSetting.formData[
          name
        ];
      }),
    );
  }, []);

  const onChangeMemberCount = useCallback(
    (e) => {
      const {
        memberSetting: { count },
      } = addDetail;

      switch (e) {
        case 'increment':
          if (count !== 999) {
            setAddDetail(
              produce((draft) => {
                draft.memberSetting.count = count + 1;
              }),
            );
          }

          return false;

        case 'decrement':
          if (count !== 0) {
            setAddDetail(
              produce((draft) => {
                draft.memberSetting.count = count - 1;
              }),
            );
          }

          return false;
        default:
          const value = parseInt(!isEmpty(e.target.value) ? e.target.value : 0);

          if (value > -1) {
            setAddDetail(
              produce((draft) => {
                draft.memberSetting.count = value;
              }),
            );
          }

          return false;
      }
    },
    [addDetail],
  );

  const detailComminityTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimCreateContent />;
      default:
        return false;
    }
  }, [commonDetail, isEdit, tabIndex]);

  const detailMeetingTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimCreateContent />;
      case 1:
        const { startDate, endDate } = addDetail;

        return (
          <MoimCreateSchedule
            isEdit={isEdit}
            startDate={startDate}
            endDate={endDate}
            onScheduleChange={onScheduleChange}
          />
        );
      case 2:
        const { location } = addDetail;

        return (
          <MoimCreateMap
            isEdit={isEdit}
            location={location}
            onHandleLocation={onHandleLocation}
          />
        );
      case 3:
        const { memberSetting, memberList } = addDetail;

        return (
          <MoimCreateMember
            isEdit={isEdit}
            userId={userId}
            userImage={userImage}
            userName={userName}
            userAvatar={userAvatar}
            memberSetting={memberSetting}
            memberList={memberList}
            onIsSelfCheck={onIsSelfCheck}
            onJoinFormCheck={onJoinFormCheck}
            onChangeMemberCount={onChangeMemberCount}
          />
        );
      default:
        return false;
    }
  }, [isEdit, commonDetail, addDetail, tabIndex]);

  useEffect(() => {
    if (category === 'community') {
      setAddDetail(moimCommunityData);
      setType(moimCommunityData.type);
    } else if (category === 'meeting') {
      setAddDetail(moimMeetingData);
      setType(moimMeetingData.type);
    }
    setTabIndex(0);
  }, [category]);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, (item) => item.name === type));
  }, [moimType, type]);

  const {
    likeCount,
    title,
    isLock,
    passNumber,
    tags,
    description,
  } = commonDetail;
  const { status, payInfo, url } = addDetail;

  return (
    <MoimCreateWrap>
      <MoimCreateSummary
        mainImage={mainImage}
        userImage={userImage}
        userAvatar={userAvatar}
        userName={userName}
        likeCount={likeCount}
        isSave={
          !isEqual(
            category === 'community' ? moimCommunityData : moimMeetingData,
            commonDetail,
          )
        }
        onMainImageChange={onMainImageChange}
        onSave={onSave}
      />
      <MoimCreateInfo>
        <MoimCreateBase
          isEdit={isEdit}
          typeIndex={typeIndex}
          moimType={moimType}
          category={category}
          title={title}
          isLock={isLock}
          passNumber={passNumber}
          moimStatus={moimStatus}
          status={status}
          payInfo={payInfo}
          url={url}
          tags={tags}
          tagInput={tagInput}
          description={description}
          costInputRef={costInputRef}
          accountInputRef={accountInputRef}
          urlInputRef={urlInputRef}
          tagInputRef={tagInputRef}
          onTypeChange={onTypeChange}
          onTitleChange={onTitleChange}
          onLockChange={onLockChange}
          onPassNumberChange={onPassNumberChange}
          onStatusChange={onStatusChange}
          onCostInputChange={onCostInputChange}
          onCostInputReset={onCostInputReset}
          onBankChange={onBankChange}
          onAccountInputChange={onAccountInputChange}
          onAccountInputReset={onAccountInputReset}
          onUrlCopy={onUrlCopy}
          onUrlInputChange={onUrlInputChange}
          onUrlInputReset={onUrlInputReset}
          onTagInputChange={onTagInputChange}
          onKeyTagEnter={onKeyTagEnter}
          onTagAdd={onTagAdd}
          onTagRemove={onTagRemove}
          onDescriptionChange={onDescriptionChange}
        />
        <MoimCreateAdditional
          tabIndex={tabIndex}
          category={category}
          detailComminityTabBoxSwitch={detailComminityTabBoxSwitch}
          detailMeetingTabBoxSwitch={detailMeetingTabBoxSwitch}
          onTabClick={onTabClick}
        />
      </MoimCreateInfo>
    </MoimCreateWrap>
  );
});

export default MoimCreate;
