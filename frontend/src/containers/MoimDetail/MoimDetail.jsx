import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  merge,
  findIndex,
  trim,
  filter,
  parseInt,
  isNull,
  isUndefined,
  isEmpty,
  isEqual,
} from 'lodash';
import { produce } from 'immer';
import dayjs from 'dayjs';
import {
  getCommunityAction,
  getMeetingAction,
  putCommunityAction,
  putMeetingAction,
  moimThumbImageAction,
  putPaymentCheckAction,
  putStaffCheckAction,
  setIsEditAction,
  resetDetailAction,
} from '../../store/module/detail';
import {
  joinModalOpenAction,
  exitModalOpenAction,
} from '../../store/module/global';
import {
  communityType,
  meetingType,
  communityStatus,
  meetingStatus,
} from '../../lib/const';
import MoimDetailSummary from './MoimDetailSummary';
import MoimDetailBase from './MoimDetailBase';
import MoimDetailAdditional from './MoimDetailAdditional';
import MoimDetailContent from './MoimDetailContent';
import MoimDetailSchedule from './MoimDetailSchedule';
import MoimDetailMap from './MoimDetailMap';
import MoimDetailMemeber from './MoimDetailMemeber';
import { DESCRIPTION_MAX_LENGTH } from '../../lib/const';
import { MoimDetailWrap, MoimDetailInfo } from './style';

const MoimDetail = memo(({ category, id }) => {
  const nowDate = dayjs().unix();

  const dispatch = useDispatch();

  const moim = useSelector(({ detail }) => detail.moim);
  const thumbImage = useSelector(({ detail }) => detail.thumbImage);
  const thumbImageFile = useSelector(({ detail }) => detail.thumbImageFile);
  const isEdit = useSelector(({ detail }) => detail.isEdit);
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const userInfo = useSelector(({ auth }) => auth.userInfo);

  const [mainImage, setMainImage] = useState('');
  const [userId, setUserId] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [userAvatar, setUserAvatar] = useState({});
  const [userName, setUserName] = useState('');
  const [likeCount, setLikeCount] = useState(0);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [isLock, setIsLock] = useState(false);
  const [passNumber, setPassNumber] = useState([]);
  const [payInfo, setPayInfo] = useState({});
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

  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const costInputRef = useRef();
  const accountInputRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();

  const isSave = useMemo(() => {
    const common = {
      mainImage,
      type,
      title,
      isLock,
      passNumber,
      status,
      tags,
      description,
    };
    const community = {
      url,
    };
    const meeting = {
      payInfo,
      startDate,
      endDate,
      location,
      memberSetting,
      memberList,
    };
    const detail = merge(
      {},
      moim,
      common,
      category === 'community' ? community : meeting,
    );

    return !(isEqual(moim, detail) && isNull(thumbImage));
  }, [
    category,
    moim,
    mainImage,
    type,
    title,
    isLock,
    passNumber,
    payInfo,
    status,
    url,
    tags,
    description,
    startDate,
    endDate,
    location,
    memberSetting,
    memberList,
    thumbImage,
  ]);

  const isMoimClient = useMemo(
    () => isAuth && !isNull(userInfo) && userInfo.userId === moim.userId,
    [isAuth, userInfo, moim],
  );

  const isMoimMember = useMemo(
    () =>
      !isNull(userInfo) &&
      findIndex(
        moim.memberList,
        (member) => member.userId === userInfo.userId,
      ) !== -1,
    [userInfo, moim],
  );

  const moimType = useMemo(
    () => (category === 'community' ? communityType : meetingType),
    [category],
  );
  const moimStatus = useMemo(
    () =>
      category === 'community'
        ? communityStatus
        : [
            meetingStatus[
              findIndex(meetingStatus, (item) => item.name === status)
            ],
          ],
    [category, status],
  );

  const onGetCommunity = useCallback(
    () => dispatch(getCommunityAction.REQUEST(id)),
    [dispatch],
  );

  const onGetMeeting = useCallback(
    () => dispatch(getMeetingAction.REQUEST(id)),
    [dispatch],
  );

  const onThumbImageChange = useCallback(
    (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        dispatch(moimThumbImageAction({ image: reader.result, file }));
      };

      reader.readAsDataURL(file);
    },
    [dispatch],
  );

  const onJoinModalOpen = useCallback(() => {
    dispatch(joinModalOpenAction());
  }, []);

  const onExitModalOpen = useCallback(() => {
    dispatch(exitModalOpenAction());
  }, []);

  const onResetDetail = useCallback(() => dispatch(resetDetailAction()), [
    dispatch,
  ]);

  const onSave = useCallback(() => {
    if (category === 'community') {
      dispatch(
        putCommunityAction.REQUEST({
          communityId: id,
          formData: {
            type,
            title,
            isLock,
            passNumber,
            status,
            url,
            tags,
            description,
            userName,
            mainImage,
          },
          thumbImageFile,
        }),
      );
    } else {
      dispatch(
        putMeetingAction.REQUEST({
          meetingId: id,
          formData: {
            type,
            title,
            isLock,
            passNumber,
            payInfo,
            tags,
            description,
            startDate,
            endDate,
            location,
            memberSetting,
            memberList,
            waiter,
            userName,
            mainImage,
          },
          thumbImageFile,
        }),
      );
    }
  }, [
    dispatch,
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
    waiter,
    userName,
    mainImage,
    thumbImageFile,
  ]);

  const onEditToggle = useCallback(() => {
    dispatch(setIsEditAction(!isEdit));
    dispatch(moimThumbImageAction({ image: null, file: null }));
  }, [dispatch, isEdit]);

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

  const onMemberPaymentChange = useCallback((userId) => {
    dispatch(
      putPaymentCheckAction.REQUEST({
        meetingId: id,
        userId,
      }),
    );
  }, []);

  const onMemberStaffChange = useCallback((userId) => {
    dispatch(putStaffCheckAction.REQUEST({ meetingId: id, userId }));
  }, []);

  const onMemberRemove = useCallback(
    (userId) => {
      setMemberList(memberList.filter((member) => member.userId !== userId));
    },
    [memberList],
  );

  const detailComminityTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimDetailContent />;
      default:
        return false;
    }
  }, [tabIndex]);

  const detailMeetingTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimDetailContent />;
      case 1:
        return (
          <MoimDetailSchedule
            isEdit={isEdit}
            startDate={startDate}
            endDate={endDate}
            onScheduleChange={onScheduleChange}
          />
        );
      case 2:
        return (
          <MoimDetailMap
            isEdit={isEdit}
            location={location}
            onHandleLocation={onHandleLocation}
          />
        );
      case 3:
        return (
          <MoimDetailMemeber
            isEdit={isEdit}
            userId={userId}
            userImage={userImage}
            userAvatar={userAvatar}
            userName={userName}
            isMoimClient={isMoimClient}
            memberSetting={memberSetting}
            memberList={memberList}
            onIsSelfCheck={onIsSelfCheck}
            onJoinFormCheck={onJoinFormCheck}
            onChangeMemberCount={onChangeMemberCount}
            onMemberPaymentChange={onMemberPaymentChange}
            onMemberStaffChange={onMemberStaffChange}
            onMemberRemove={onMemberRemove}
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
    isMoimClient,
  ]);

  useEffect(() => {
    if (category === 'community') {
      onGetCommunity(id);
    } else if (category === 'meeting') {
      onGetMeeting(id);
    }
    return () => {
      onResetDetail();
    };
  }, []);

  useEffect(() => {
    const {
      mainImage,
      userId,
      userImage,
      userAvatar,
      userName,
      likeCount,
      type,
      title,
      isLock,
      passNumber,
      payInfo,
      status,
      url,
      tags,
      description,
      startDate,
      endDate,
      location,
      memberSetting,
      memberList,
      waiter,
    } = moim;

    setMainImage(mainImage);
    setUserId(userId);
    setUserImage(userImage);
    setUserAvatar(userAvatar);
    setUserName(userName);
    setLikeCount(likeCount);
    setTitle(title);
    setType(type);
    setIsLock(isLock);
    setPassNumber(passNumber);
    setPayInfo(payInfo);
    setUrl(url);
    setTags(tags);
    setDescription(description);
    setStartDate(startDate);
    setEndDate(endDate);
    setLocation(location);
    setMemberSetting(memberSetting);
    setMemberList(memberList);
    setWaiter(waiter);

    if (
      category === 'meeting' &&
      !isUndefined(startDate) &&
      !isUndefined(endDate)
    ) {
      if (nowDate < startDate._seconds) {
        if (
          memberList.length + (memberSetting.isSelf ? 1 : 0) <
          memberSetting.count
        ) {
          setStatus('empty');
        } else {
          setStatus('full');
        }
      } else if (nowDate >= startDate._seconds && nowDate <= endDate._seconds) {
        setStatus('proceeding');
      } else {
        setStatus('complete');
      }
    } else {
      setStatus(status);
    }
  }, [moim, category]);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, (item) => item.name === type));
  }, [moimType, type]);

  return (
    <>
      {!isEmpty(userId) && (
        <MoimDetailWrap>
          <MoimDetailSummary
            category={category}
            thumbImage={thumbImage}
            mainImage={mainImage}
            userImage={userImage}
            userAvatar={userAvatar}
            userName={userName}
            likeCount={likeCount}
            isAuth={isAuth}
            isMoimClient={isMoimClient}
            isMoimMember={isMoimMember}
            isEdit={isEdit}
            isSave={isSave}
            onThumbImageChange={onThumbImageChange}
            onJoinModalOpen={onJoinModalOpen}
            onExitModalOpen={onExitModalOpen}
            onSave={onSave}
            onEditToggle={onEditToggle}
          />
          <MoimDetailInfo>
            <MoimDetailBase
              typeIndex={typeIndex}
              moimType={moimType}
              category={category}
              isEdit={isEdit}
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
            <MoimDetailAdditional
              tabIndex={tabIndex}
              category={category}
              detailComminityTabBoxSwitch={detailComminityTabBoxSwitch}
              detailMeetingTabBoxSwitch={detailMeetingTabBoxSwitch}
              onTabClick={onTabClick}
            />
          </MoimDetailInfo>
        </MoimDetailWrap>
      )}
    </>
  );
});

export default MoimDetail;
