import React, { useState, useMemo, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleUp, faUser, faUserSlash, faGhost, faDiceD6 } from '@fortawesome/free-solid-svg-icons';
import { MoimDetailMemberWrap } from './style';

const MoimDetailMember = ({ isEdit, member, onChangeMemberCount }) => {
  const { count, list } = member;

  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const onMemberToggle = useCallback(() => {
    setIsMemberOpen((isMemberOpen) => !isMemberOpen);
  }, []);

  const memberList = useMemo(() => [...list, ...new Array(count - list.length)], [count, list]);

  return (
    <MoimDetailMemberWrap>
      <div className="memberInner">
        <div className="memberTop">
          <div className="memberCount">
            <div className="countWrap">
              <span className="now">{list.length}</span>
              {`/`}
              {!isEdit
                ? <span className="max">{count}</span>
                : (
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
                animate={{ width: `${list.length / count * 100}%` }}
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
          <div className="listBody">
            <ul>
              {map(memberList, (item, index) => {
                if (item !== undefined) {
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
          </div>
        </div>
      </div>
    </MoimDetailMemberWrap>
  );
};

export default MoimDetailMember;
