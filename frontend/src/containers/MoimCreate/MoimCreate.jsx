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

  const [mainImage, setMainImage] = useState(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [passNumber, setPassNumber] = useState(new Array(6).fill(''));
  const [payInfo, setPayInfo] = useState({
    cost: 0,
    bank: '090',
    account: '',
  });
  const [status, setStatus] = useState('');
  const [url, setUrl] = useState('');
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState({
    _nanoseconds: 0,
    _seconds: dayjs().unix(),
  });
  const [endDate, setEndDate] = useState({
    _nanoseconds: 0,
    _seconds: dayjs().unix(),
  });
  const [location, setLocation] = useState({
    name: '장소 이름',
    coordinate: {
      _latitude: 37.56682420267543,
      _longitude: 126.978652258823,
    },
  });
  const [memberSetting, setMemberSetting] = useState({
    count: 0,
    isSelf: false,
    formData: {
      email: false,
      mobile: false,
      name: true,
      passNumber: true,
    },
  });
  const [memberList, setMemberList] = useState([]);

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
    () => (category === 'community' ? communityStatus : [meetingStatus[0]]),
    [category],
  );

  const onMainImageChange = useCallback(
    (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
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
            mainImage,
            mainImageFile,
            type,
            title,
            isLock,
            passNumber,
            status,
            url,
            tags,
            description,
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
            mainImage,
            mainImageFile,
            type,
            title,
            isLock,
            passNumber,
            status,
            payInfo,
            tags,
            description,
            startDate,
            endDate,
            location,
            memberSetting,
            memberList,
            userId,
            userImage,
            userAvatar,
            userName,
          },
        }),
      );
    }
  }, [
    dispatch,
    mainImage,
    mainImageFile,
    type,
    title,
    isLock,
    passNumber,
    status,
    url,
    payInfo,
    tags,
    description,
    startDate,
    endDate,
    location,
    memberSetting,
    memberList,
    userName,
  ]);

  const onTypeChange = useCallback(
    (index) => {
      setType(moimType[index].name);
    },
    [moimType],
  );

  const onTitleChange = useCallback((e) => {
    const { value } = e.target;

    setTitle(value);
  }, []);

  const onLockChange = useCallback(() => {
    setIsLock((isLock) => {
      if (isLock) {
        setPassNumber(new Array(6).fill(''));
      }
      return !isLock;
    });
  }, [isLock]);

  const onPassNumberChange = useCallback(
    (e, i) => {
      const { value } = e.target;

      if (value <= 9) {
        setPassNumber(
          produce((draft) => {
            draft[i] = value;
          }),
        );
      }
    },
    [passNumber],
  );

  const onStatusChange = useCallback(
    (index) => {
      setStatus(moimStatus[index].name);
    },
    [moimStatus],
  );

  const onCostInputChange = useCallback((e) => {
    const value = parseInt(!isEmpty(e.target.value) ? e.target.value : 0);

    if (value >= 0 && value <= 99999999) {
      setPayInfo(
        produce((draft) => {
          draft.cost = value ? value : 0;
        }),
      );
    }
  }, []);

  const onCostInputReset = useCallback(() => {
    setPayInfo(
      produce((draft) => {
        draft.cost = 0;
      }),
    );

    costInputRef.current.focus();
  }, []);

  const onBankChange = useCallback((bank) => {
    setPayInfo(
      produce((draft) => {
        draft.bank = bank;
      }),
    );
  }, []);

  const onAccountInputChange = useCallback((e) => {
    const { value } = e.target;

    setPayInfo(
      produce((draft) => {
        draft.account = value ? value : '';
      }),
    );
  }, []);

  const onAccountInputReset = useCallback(() => {
    setPayInfo(
      produce((draft) => {
        draft.account = '';
      }),
    );

    accountInputRef.current.focus();
  }, []);

  const onUrlCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
  }, [url]);

  const onUrlInputChange = useCallback((e) => {
    const value = e.target.value;

    setUrl(value);
  }, []);

  const onUrlInputReset = useCallback(() => {
    setUrl('');

    urlInputRef.current.focus();
  }, []);

  const onTagInputChange = useCallback((e) => {
    setTagInput(e.target.value);
  }, []);

  const onTagAdd = useCallback(() => {
    const trimValue = trim(tagInput);

    if (
      findIndex(tags, (item) => item === trimValue) === -1 &&
      trimValue !== ''
    ) {
      setTags(
        produce((draft) => {
          draft.push(trimValue);
        }),
      );
    }

    setTagInput('');
    tagInputRef.current.focus();
  }, [tags, tagInput]);

  const onTagRemove = useCallback(
    (tag) => {
      setTags(filter(tags, (item) => item !== tag));
    },
    [tags],
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
      setDescription(value);
    }
  }, []);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  const onScheduleChange = useCallback((name, date) => {
    if (name === 'startDate') {
      setStartDate(
        produce((draft) => {
          draft._seconds = dayjs(date).unix();
        }),
      );
    } else if (name === 'endDate') {
      setEndDate(
        produce((draft) => {
          draft._seconds = dayjs(date).unix();
        }),
      );
    }
  }, []);

  const onHandleLocation = useCallback((name, coord) => {
    setLocation({
      name,
      coordinate: {
        _latitude: coord[0],
        _longitude: coord[1],
      },
    });
  }, []);

  const onIsSelfCheck = useCallback(() => {
    setMemberSetting(
      produce((draft) => {
        draft.isSelf = !draft.isSelf;
      }),
    );
  }, []);

  const onJoinFormCheck = useCallback((name) => {
    setMemberSetting(
      produce((draft) => {
        draft.formData[name] = !draft.formData[name];
      }),
    );
  }, []);

  const onChangeMemberCount = useCallback(
    (e) => {
      const { count } = memberSetting;

      switch (e) {
        case 'increment':
          if (count !== 999) {
            setMemberSetting(
              produce((draft) => {
                draft.count = count + 1;
              }),
            );
          }

          return false;
        case 'decrement':
          if (count !== 0) {
            setMemberSetting(
              produce((draft) => {
                draft.count = count - 1;
              }),
            );
          }

          return false;
        default:
          const value = parseInt(!isEmpty(e.target.value) ? e.target.value : 0);

          if (value > -1) {
            setMemberSetting(
              produce((draft) => {
                draft.count = value;
              }),
            );
          }

          return false;
      }
    },
    [memberSetting],
  );

  const detailComminityTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimCreateContent />;
      default:
        return false;
    }
  }, [tabIndex]);

  const detailMeetingTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimCreateContent />;
      case 1:
        return (
          <MoimCreateSchedule
            isEdit={isEdit}
            startDate={startDate}
            endDate={endDate}
            onScheduleChange={onScheduleChange}
          />
        );
      case 2:
        return (
          <MoimCreateMap
            isEdit={isEdit}
            location={location}
            onHandleLocation={onHandleLocation}
          />
        );
      case 3:
        return (
          <MoimCreateMember
            isEdit={isEdit}
            userId={userId}
            userImage={userImage}
            userAvatar={userAvatar}
            userName={userName}
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
  }, [
    tabIndex,
    isEdit,
    startDate,
    endDate,
    location,
    memberSetting,
    memberList,
    userId,
    userImage,
    userAvatar,
    userName,
  ]);

  useEffect(() => {
    if (category === 'community') {
      setType(moimCommunityData.type);
      setStatus(moimCommunityData.status);
    } else if (category === 'meeting') {
      setType(moimMeetingData.type);
      setStatus(moimMeetingData.status);
    }
    setTabIndex(0);
  }, [category]);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, (item) => item.name === type));
  }, [moimType, type]);

  return (
    <MoimCreateWrap>
      <MoimCreateSummary
        mainImage={mainImage}
        userImage={userImage}
        userAvatar={userAvatar}
        userName={userName}
        likeCount={0}
        isSave={
          !isEqual(
            category === 'community' ? moimCommunityData : moimMeetingData,
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
