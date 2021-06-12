import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  isNull,
  findIndex,
  isEmpty,
  isUndefined,
  trim,
  filter,
  parseInt,
  map,
} from 'lodash';
import { produce } from 'immer';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import {
  getCommunityAction,
  getMeetingAction,
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
import MoimDetailType from './MoimDetailType';
import MoimDetailTitle from './MoimDetailTitle';
import MoimDetailPayInfo from './MoimDetailPayInfo';
import MoimDetailStatus from './MoimDetailStatus';
import MoimDetailUrl from './MoimDetailUrl';
import MoimDetailTag from './MoimDetailTag';
import MoimDetailDescription from './MoimDetailDescription';
import MoimDetailContent from './MoimDetailContent';
import MoimDetailSchedule from './MoimDetailSchedule';
import MoimDetailMap from './MoimDetailMap';
import MoimDetailMemeber from './MoimDetailMemeber';
import UserInfo from '../../components/UserInfo';
import { detailTabMenu } from '../../lib/const';
import {
  MoimDetailWrap,
  MoimDetailSummary,
  MoimDetailInfo,
  MoimDetailBase,
  MoimDetailAdditional,
  MoimDetailTabItem,
} from './style';

const DESCRIPTION_MAX_LENGTH = 150;

const MoimDetail = ({ category, id }) => {
  const { moim } = useSelector(({ detail }) => detail);
  const { userInfo } = useSelector(({ auth }) => auth);

  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [typeIndex, setTypeIndex] = useState(-1);
  const [tagInput, setTagInput] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  const costInputRef = useRef();
  const accountInputRef = useRef();
  const urlInputRef = useRef();
  const tagInputRef = useRef();

  const isClient = useMemo(
    () => !isNull(userInfo) && userInfo.userId === moim.userId,
    [moim, userInfo],
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

  const onEditCancel = useCallback(() => {
    setIsEdit((isEdit) => !isEdit);
    setDetail(moim);
  }, [moim]);

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

  const onMemberDepositChange = useCallback(
    (userId) => {
      const index = findIndex(detail.memberList, { userId });

      setDetail(
        produce((draft) => {
          draft.memberList[index].isDeposit = !draft.memberList[index]
            .isDeposit;
        }),
      );
    },
    [detail],
  );

  const onMemberStaffChange = useCallback(
    (userId) => {
      const index = findIndex(detail.memberList, { userId });

      setDetail(
        produce((draft) => {
          draft.memberList[index].isStaff = !draft.memberList[index].isStaff;
        }),
      );
    },
    [detail],
  );

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

  const DetailComminityTabBoxSwitch = useMemo(() => {
    switch (tabIndex) {
      case 0:
        return <MoimDetailContent />;
      default:
        return false;
    }
  }, [detail, isEdit, tabIndex]);

  const DetailMeetingTabBoxSwitch = useMemo(() => {
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
        const { userImage, userName, memberSetting, memberList } = detail;

        return (
          <MoimDetailMemeber
            isEdit={isEdit}
            userImage={userImage}
            userName={userName}
            memberSetting={memberSetting}
            memberList={memberList}
            onIsSelfCheck={onIsSelfCheck}
            onJoinFormCheck={onJoinFormCheck}
            onChangeMemberCount={onChangeMemberCount}
            onMemberDepositChange={onMemberDepositChange}
            onMemberStaffChange={onMemberStaffChange}
            onMemberRemove={onMemberRemove}
          />
        );
      default:
        return false;
    }
  }, [moim, detail, isEdit, tabIndex]);

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
          <MoimDetailSummary>
            <div className="summaryInner">
              <div className="thumb">
                <img src={mainImage} />
              </div>
              <UserInfo image={userImage} name={userName} count={likeCount} />
              <div className="btnWrap">
                {!isClient ? (
                  <>
                    <button
                      type="button"
                      className="btnMain"
                      onClick={onJoinModalOpen}
                    >
                      join
                    </button>
                    <button
                      type="button"
                      className="btnSub"
                      onClick={onExitModalOpen}
                    >
                      <FontAwesomeIcon icon={faDoorOpen} />
                    </button>
                  </>
                ) : (
                  <>
                    {isEdit && (
                      <button
                        type="button"
                        className="btnMain"
                        onClick={onJoinModalOpen}
                      >
                        save
                      </button>
                    )}
                    <button
                      type="button"
                      className="btnSub"
                      onClick={onEditCancel}
                    >
                      {!isEdit ? (
                        <FontAwesomeIcon icon={faCog} />
                      ) : (
                        <FontAwesomeIcon icon={faDoorOpen} />
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </MoimDetailSummary>
          <MoimDetailInfo>
            <MoimDetailBase>
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
              <MoimDetailStatus
                category={category}
                list={moimStatus}
                status={status}
                isEdit={isEdit}
                onStatusChange={onStatusChange}
              />
              {!isUndefined(payInfo) && (
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
              {!isUndefined(url) && (
                <MoimDetailUrl
                  url={url}
                  isEdit={isEdit}
                  urlInputRef={urlInputRef}
                  onUrlCopy={onUrlCopy}
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
            </MoimDetailBase>
            <MoimDetailAdditional activeIndex={tabIndex}>
              <div className="tabMenu">
                <motion.div
                  className="activeBar"
                  animate={{ x: tabIndex * 80 }}
                  transition={{
                    ease: 'backInOut',
                  }}
                />
                <ul className="tabList">
                  {map(detailTabMenu[category], (item, index) => (
                    <MoimDetailTabItem
                      key={index}
                      isActive={index === tabIndex}
                    >
                      <button type="button" onClick={() => onTabClick(index)}>
                        <FontAwesomeIcon icon={item} />
                      </button>
                    </MoimDetailTabItem>
                  ))}
                </ul>
              </div>
              <div className="tabContent">
                <div className="tabContentInner">
                  <div className="tabContentBox">
                    {category === 'community'
                      ? DetailComminityTabBoxSwitch
                      : DetailMeetingTabBoxSwitch}
                  </div>
                </div>
              </div>
            </MoimDetailAdditional>
          </MoimDetailInfo>
        </MoimDetailWrap>
      )}
    </>
  );
};

export default MoimDetail;
