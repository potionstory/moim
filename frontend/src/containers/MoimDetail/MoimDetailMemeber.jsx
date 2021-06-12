import React, { useState, useMemo, useCallback, useEffect } from 'react';
import AutosizeInput from 'react-input-autosize';
import filter from 'lodash/filter';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faAngleUp,
  faUser,
  faUserSlash,
  faWonSign,
  faCrown,
  faGhost,
  faDiceD6,
  faCog,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import CheckBox from '../../components/CheckBox';
import { moimMemberForm } from '../../utils/formData';
import { MoimDetailMemberWrap } from './style';

const settingBoxVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
};

const MoimDetailMember = ({
  isEdit,
  userImage,
  userName,
  memberSetting,
  memberList,
  onIsSelfCheck,
  onJoinFormCheck,
  onChangeMemberCount,
  onMemberDepositChange,
  onMemberStaffChange,
  onMemberRemove,
}) => {
  const [isSettingBox, setIsSettingBox] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(true);
  const [isWaiterOpen, setIsWaiterOpen] = useState(true);

  const members = useMemo(() => {
    const { isSelf, count } = memberSetting;
    const member = isSelf
      ? [
          {
            userId: userName,
            name: userName,
            isDeposit: true,
            isClient: true,
            isStaff: false,
          },
          ...memberList,
        ]
      : memberList;

    if (member.length <= count) {
      return [[...member, ...new Array(count - member.length)], []];
    } else {
      return [member.slice(0, count), member.slice(count, member.length)];
    }
  }, [memberSetting, memberList]);

  const onSettingBox = useCallback(() => {
    setIsSettingBox((isSettingBox) => !isSettingBox);
  }, []);

  const onMemberToggle = useCallback(() => {
    setIsMemberOpen((isMemberOpen) => !isMemberOpen);
  }, []);

  const onWatierToggle = useCallback(() => {
    setIsWaiterOpen((isWaiterOpen) => !isWaiterOpen);
  }, []);

  const { count, isSelf, formData } = memberSetting;

  return (
    <MoimDetailMemberWrap isEdit={isEdit} isSettingBox={isSettingBox}>
      <div className="memberInner">
        <div className="memberTop">
          <div className="memberCount">
            <div className="countWrap">
              <span className="now">
                {memberList.length + Number(isSelf) < count
                  ? memberList.length + Number(isSelf)
                  : count}
              </span>
              {`/`}
              {!isEdit ? (
                <span className="max">{count}</span>
              ) : (
                <span className="countEdit">
                  <span className="countInput">
                    <AutosizeInput
                      type="text"
                      placeholder="0"
                      inputMode="numeric"
                      value={count !== 0 ? count : ''}
                      onChange={onChangeMemberCount}
                    />
                  </span>
                  <span className="btnWrap">
                    <button
                      type="button"
                      className="plus"
                      onClick={() => onChangeMemberCount('increment')}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      type="button"
                      className="minus"
                      onClick={() => onChangeMemberCount('decrement')}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </span>
                </span>
              )}
            </div>
            <span className="progress">
              <motion.span
                className="bar"
                animate={{
                  width: `${
                    ((memberList.length + Number(isSelf) < count
                      ? memberList.length + Number(isSelf)
                      : count) /
                      count) *
                    100
                  }%`,
                }}
                transition={{
                  ease: 'backInOut',
                }}
              />
            </span>
          </div>
          <div className="memberClient">
            <div className="clientHead">
              <span className="title">client</span>
              {isEdit && (
                <span className="setting">
                  <button type="button" className="btn" onClick={onSettingBox}>
                    <FontAwesomeIcon icon={faCog} />
                  </button>
                  <motion.div
                    animate={isSettingBox ? 'open' : 'closed'}
                    variants={settingBoxVariants}
                    transition={{
                      ease: 'backInOut',
                    }}
                    className="box"
                  >
                    <ul>
                      {map(moimMemberForm, (item) => {
                        const { name, isRequire } = item;

                        return (
                          <li key={name}>
                            <CheckBox
                              name={name}
                              isChecked={formData[name]}
                              isRequire={isRequire}
                              isInverse={true}
                              onCheck={() => isRequire || onJoinFormCheck(name)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </span>
              )}
            </div>
            <div className="clientBody">
              <a href="#" className="clientInfo">
                <img src={userImage} />
                <span className="name">{userName}</span>
              </a>
              {isEdit && (
                <CheckBox
                  name="IN MEMBER"
                  isChecked={isSelf}
                  isInverse={false}
                  onCheck={onIsSelfCheck}
                />
              )}
            </div>
          </div>
        </div>
        {!isEmpty(members[0]) && (
          <div className="memberList">
            <div className="listHead">
              <div className="left">
                <span className="iconBox">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <span className="title">members</span>
                <span className="counts">
                  <span className="count pay">
                    <span className="icon">
                      <FontAwesomeIcon icon={faWonSign} />
                    </span>
                    {filter(members[0], { isDeposit: true }).length}
                  </span>
                  {` / `}
                  <span className="count notPay">
                    <span className="icon">
                      <FontAwesomeIcon icon={faWonSign} />
                    </span>
                    {filter(members[0], { isDeposit: false }).length}
                  </span>
                  {` / `}
                  <span className="count empty">
                    <span className="icon">
                      <FontAwesomeIcon icon={faDiceD6} />
                    </span>
                    {members[0].length - filter(members[0], undefined).length}
                  </span>
                </span>
              </div>
              <button type="button" onClick={onMemberToggle}>
                <motion.span
                  animate={{ rotate: isMemberOpen ? 180 : 0 }}
                  transition={{
                    ease: 'backInOut',
                  }}
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </motion.span>
              </button>
            </div>
            <motion.div
              className="listBody"
              animate={{
                height: isMemberOpen ? 'auto' : 0,
              }}
              transition={{
                ease: 'backInOut',
              }}
            >
              <ul>
                {map(members[0], (item, index) => {
                  if (item !== undefined) {
                    const { userId, name, isDeposit, isClient, isStaff } = item;

                    return (
                      <li key={index}>
                        <div className="listBox">
                          <div className="listInner">
                            {!isEdit ? (
                              <span className="index">{index + 1}</span>
                            ) : (
                              !isClient && (
                                <button
                                  type="button"
                                  className="btnRemove"
                                  onClick={() => onMemberRemove(userId)}
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                </button>
                              )
                            )}
                            <span
                              className={`deposit ${isDeposit && 'pay'}`}
                              onClick={() =>
                                isEdit &&
                                !isClient &&
                                onMemberDepositChange(userId)
                              }
                            >
                              <FontAwesomeIcon
                                icon={!isEdit ? faWonSign : faWonSign}
                              />
                            </span>
                            {!isEdit ? (
                              <span
                                className={`avatar ${isClient && 'isClient'} ${
                                  isStaff && 'isStaff'
                                }`}
                              >
                                <FontAwesomeIcon
                                  icon={isClient || isStaff ? faCrown : faGhost}
                                />
                              </span>
                            ) : (
                              <span
                                className={`avatar ${isClient && 'isClient'} ${
                                  isStaff && 'isStaff'
                                }`}
                                onClick={() =>
                                  isClient || onMemberStaffChange(userId)
                                }
                              >
                                <FontAwesomeIcon
                                  icon={isClient || isStaff ? faCrown : faGhost}
                                />
                              </span>
                            )}
                            <span className="name">{name}</span>
                          </div>
                        </div>
                      </li>
                    );
                  } else {
                    return (
                      <li key={index}>
                        <div className="listBox">
                          <div className="listInner empty">
                            <FontAwesomeIcon icon={faDiceD6} />
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            </motion.div>
          </div>
        )}
        {!isEmpty(members[1]) && (
          <div className="memberList">
            <div className="listHead">
              <div className="left">
                <span className="iconBox waiter">
                  <FontAwesomeIcon icon={faUserSlash} />
                </span>
                <span className="title">waiters</span>
                <span className="counts">
                  <span className="count empty">
                    <span className="icon">
                      <FontAwesomeIcon icon={faGhost} />
                    </span>
                    {members[1].length}
                  </span>
                </span>
              </div>
              <button type="button" onClick={onWatierToggle}>
                <motion.span
                  animate={{ rotate: isWaiterOpen ? 180 : 0 }}
                  transition={{
                    ease: 'backInOut',
                  }}
                >
                  <FontAwesomeIcon icon={faAngleUp} />
                </motion.span>
              </button>
            </div>
            <motion.div
              className="listBody"
              animate={{
                height: isWaiterOpen ? 'auto' : 0,
              }}
              transition={{
                ease: 'backInOut',
              }}
            >
              <ul>
                {map(members[1], (item, index) => {
                  const { userId, name, isClient, isStaff } = item;

                  return (
                    <li key={index}>
                      <div className="listBox">
                        <div className="listInner">
                          {!isEdit ? (
                            <span className="index">{index + 1}</span>
                          ) : (
                            <button
                              type="button"
                              className="btnRemove"
                              onClick={() => onMemberRemove(userId)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </button>
                          )}
                          <span
                            className={`avatar ${isClient && 'isClient'} ${
                              isStaff && 'isStaff'
                            }`}
                          >
                            <FontAwesomeIcon
                              icon={isClient || isStaff ? faCrown : faGhost}
                            />
                          </span>
                          <span className="name">{name}</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
        )}
      </div>
    </MoimDetailMemberWrap>
  );
};

export default MoimDetailMember;
