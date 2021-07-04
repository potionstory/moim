import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  findIndex,
  trim,
  filter,
  parseInt,
  isNull,
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

const MoimDetail = ({ category, id }) => {
  const { moim, isEdit } = useSelector(({ detail }) => detail);
  const { isAuth, userInfo } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const costInputRef = useRef();
  const accountInputRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();

  const isMoimClient = useMemo(
    () => isAuth && !isNull(userInfo) && userInfo.userId === moim.userId,
    [isAuth, userInfo, moim],
  );

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
        putCommunityAction.REQUEST({ communityId: id, formData: detail }),
      );
    } else {
      dispatch(putMeetingAction.REQUEST({ meetingId: id, formData: detail }));
    }
  }, [dispatch, detail]);

  const onEditToggle = useCallback(() => {
    dispatch(setIsEditAction(!isEdit));
    setDetail(moim);
  }, [dispatch, moim, isEdit]);

  const onTypeChange = useCallback(
    (index) => {
      setDetail(
        produce((draft) => {
          draft.type = moimType[index].name;
        }),
      );
    },
    [moimType],
  );

  const onTitleChange = useCallback((e) => {
    const { value } = e.target;

    setDetail(
      produce((draft) => {
        draft.title = value;
      }),
    );
  }, []);

  const onStatusChange = useCallback(
    (index) => {
      setDetail(
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
      setDetail(
        produce((draft) => {
          draft.payInfo.cost = value ? value : 0;
        }),
      );
    }
  }, []);

  const onCostInputReset = useCallback(() => {
    setDetail(
      produce((draft) => {
        draft.payInfo.cost = 0;
      }),
    );

    costInputRef.current.focus();
  }, []);

  const onBankChange = useCallback((bank) => {
    setDetail(
      produce((draft) => {
        draft.payInfo.bank = bank;
      }),
    );
  }, []);

  const onAccountInputChange = useCallback((e) => {
    const { value } = e.target;

    setDetail(
      produce((draft) => {
        draft.payInfo.account = value ? value : '';
      }),
    );
  }, []);

  const onAccountInputReset = useCallback(() => {
    setDetail(
      produce((draft) => {
        draft.payInfo.account = '';
      }),
    );

    accountInputRef.current.focus();
  }, []);

  const onUrlCopy = useCallback(() => {
    const { url } = detail;

    navigator.clipboard.writeText(url);
  }, [detail]);

  const onUrlInputChange = useCallback((e) => {
    const value = e.target.value;

    setDetail(
      produce((draft) => {
        draft.url = value;
      }),
    );
  }, []);

  const onUrlInputReset = useCallback(() => {
    setDetail(
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
      findIndex(detail.tags, (item) => item === trimValue) === -1 &&
      trimValue !== ''
    ) {
      setDetail(
        produce((draft) => {
          draft.tags.push(trimValue);
        }),
      );
    }

    setTagInput('');
    tagInputRef.current.focus();
  }, [detail, tagInput]);

  const onTagRemove = useCallback(
    (tag) => {
      const tags = filter(detail.tags, (item) => item !== tag);

      setDetail(
        produce((draft) => {
          draft.tags = tags;
        }),
      );
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
      setDetail(
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
    setDetail(
      produce((draft) => {
        draft[name]._seconds = dayjs(date).unix();
      }),
    );
  }, []);

  const onHandleLocation = useCallback((name, coord) => {
    setDetail(
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
    setDetail(
      produce((draft) => {
        draft.memberSetting.isSelf = !draft.memberSetting.isSelf;
      }),
    );
  }, []);

  const onJoinFormCheck = useCallback((name) => {
    setDetail(
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
      } = detail;

      switch (e) {
        case 'increment':
          if (count !== 999) {
            setDetail(
              produce((draft) => {
                draft.memberSetting.count = count + 1;
              }),
            );
          }

          return false;

        case 'decrement':
          if (count !== 0) {
            setDetail(
              produce((draft) => {
                draft.memberSetting.count = count - 1;
              }),
            );
          }

          return false;
        default:
          const value = parseInt(!isEmpty(e.target.value) ? e.target.value : 0);

          if (value > -1) {
            setDetail(
              produce((draft) => {
                draft.memberSetting.count = value;
              }),
            );
          }

          return false;
      }
    },
    [detail],
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
      const index = findIndex(detail.memberList, { userId });

      setDetail(
        produce((draft) => {
          draft.memberList.splice(index, 1);
        }),
      );
    },
    [detail],
  );

  const detailComminityTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimDetailContent />;
      default:
        return false;
    }
  }, [detail, isEdit, tabIndex]);

  const detailMeetingTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimDetailContent />;
      case 1:
        const { startDate, endDate } = detail;

        return (
          <MoimDetailSchedule
            isEdit={isEdit}
            startDate={startDate}
            endDate={endDate}
            onScheduleChange={onScheduleChange}
          />
        );
      case 2:
        const { location } = detail;

        return (
          <MoimDetailMap
            isEdit={isEdit}
            location={location}
            onHandleLocation={onHandleLocation}
          />
        );
      case 3:
        const {
          userId,
          userImage,
          userName,
          userAvatar,
          memberSetting,
          memberList,
        } = detail;

        return (
          <MoimDetailMemeber
            isEdit={isEdit}
            userId={userId}
            userImage={userImage}
            userName={userName}
            userAvatar={userAvatar}
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
  }, [moim, detail, isEdit, tabIndex, isMoimClient]);

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
    userAvatar,
    userName,
    likeCount,
    title,
    payInfo,
    status,
    description,
    url,
    tags,
  } = detail;

  return (
    <>
      {!isEmpty(detail) && (
        <MoimDetailWrap>
          <MoimDetailSummary
            category={category}
            mainImage={mainImage}
            userImage={userImage}
            userAvatar={userAvatar}
            userName={userName}
            likeCount={likeCount}
            isMoimClient={isMoimClient}
            isEdit={isEdit}
            isSave={!isEqual(moim, detail)}
            onJoinModalOpen={onJoinModalOpen}
            onExitModalOpen={onExitModalOpen}
            onJoinModalOpen={onJoinModalOpen}
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
};

export default MoimDetail;
