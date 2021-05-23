import React, { useState, useMemo, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import filter from 'lodash/filter';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faAngleUp,
  faUser,
  faUserSlash,
  faWonSign,
  faGhost,
  faDiceD6,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { MoimDetailMemberWrap } from './style';

const MoimDetailMember = ({
  isEdit,
  member,
  waiter,
  onChangeMemberCount,
  onMemberDepositChange,
}) => {
  const { count, list } = member;

  const [isMemberOpen, setIsMemberOpen] = useState(true);
  const [isWaiterOpen, setIsWaiterOpen] = useState(true);

  const memberList = useMemo(
    () => [...list, ...new Array(count - list.length)],
    [count, list],
  );

  const onMemberToggle = useCallback(() => {
    setIsMemberOpen((isMemberOpen) => !isMemberOpen);
  }, []);

  const onWatierToggle = useCallback(() => {
    setIsWaiterOpen((isWaiterOpen) => !isWaiterOpen);
  }, []);

  return (
    <MoimDetailMemberWrap isEdit={isEdit}>
      <div className="memberInner">
        <div className="memberTop">
          <div className="memberCount">
            <div className="countWrap">
              <span className="now">{list.length}</span>
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
                animate={{ width: `${(list.length / count) * 100}%` }}
                transition={{
                  ease: 'backInOut',
                }}
              />
            </span>
          </div>
          <div className="memberClient"></div>
        </div>
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
                  {filter(list, { isDeposit: true }).length}
                </span>
                {` / `}
                <span className="count notPay">
                  <span className="icon">
                    <FontAwesomeIcon icon={faWonSign} />
                  </span>
                  {list.length - filter(list, { isDeposit: true }).length}
                </span>
                {` / `}
                <span className="count empty">
                  <span className="icon">
                    <FontAwesomeIcon icon={faDiceD6} />
                  </span>
                  {count - list.length}
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
              {map(memberList, (item, index) => {
                if (item !== undefined) {
                  const { userId, name, isDeposit } = item;

                  return (
                    <li
                      key={index}
                      onClick={() => isEdit && onMemberDepositChange(userId)}
                    >
                      <div className="listBox">
                        <div className="listInner">
                          <span className="index">{index + 1}</span>
                          <span className={`deposit ${isDeposit && 'pay'}`}>
                            <FontAwesomeIcon icon={faWonSign} />
                          </span>
                          {!isEdit ? (
                            <span className="avatar">
                              <FontAwesomeIcon icon={faGhost} />
                            </span>
                          ) : (
                            <span className="payCheck">
                              <FontAwesomeIcon
                                icon={faCheck}
                                className={`${isDeposit && 'isCheck'}`}
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
                  {waiter.length}
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
              {map(waiter, (item, index) => {
                const { name } = item;

                return (
                  <li key={index}>
                    <div className="listBox">
                      <div className="listInner">
                        <span className="index">{index + 1}</span>
                        <span className="avatar">
                          <FontAwesomeIcon icon={faGhost} />
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
      </div>
    </MoimDetailMemberWrap>
  );
};

export default MoimDetailMember;
