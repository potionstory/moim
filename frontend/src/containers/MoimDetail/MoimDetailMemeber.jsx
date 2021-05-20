import React, { useState, useCallback } from 'react';
import AutosizeInput from 'react-input-autosize';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { MoimDetailMemberWrap } from './style';

const MoimDetailMember = ({ isEdit, member, onChangeMemberCount }) => {
  const { count, list } = member;

  return (
    <MoimDetailMemberWrap>
      <div className="memberInner">
        <div className="memberTop">
          <div className="memberCount">
            <div className="countWrap">
              <span className="count">
                {list.length} / {count}
              </span>
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
            </div>
            <span className="progress">
              <motion.span
                className="bar"
                animate={{ width: `${50}%` }}
                transition={{
                  ease: 'backInOut',
                }}
              />
            </span>
          </div>
          <div className="memberClien"></div>
        </div>
        <div className="memberList">
          <span className="title">fasdjfsd</span>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
        <div className="memberList">
          <span className="title">fasdjfsd</span>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
          </ul>
        </div>
      </div>
    </MoimDetailMemberWrap>
  );
};

export default MoimDetailMember;
