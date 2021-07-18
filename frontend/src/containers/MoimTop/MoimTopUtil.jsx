import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { map } from 'lodash';
import produce from 'immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  filterCheck,
  sortCheck,
  utilReset,
} from '../../../src/store/module/util';
import { utilTabMenu } from '../../lib/const';
import MoimTopUtilBody from './MoimTopUtilBody';
import { utilMenu } from '../../lib/const';
import { MoimTopUtilWrap, UtilButton, UtilWrap, UtilHeader } from './style';

const MoimTopUtil = ({ tabIndex }) => {
  const util = useSelector(({ util }) => util);
  const dispatch = useDispatch();

  const [utilIndex, setUtilIndex] = useState(-1);
  const [filterTabIndex, setFilterTabIndex] = useState([0, 0]);
  const [sortTabIndex, setSortTabIndex] = useState(0);

  const utilTitle = useMemo(
    () => utilIndex !== -1 && utilMenu[utilIndex].title,
    [util, utilIndex],
  );

  const onUtilClick = useCallback(
    (index) => {
      setUtilIndex(utilIndex !== index ? index : -1);
    },
    [utilIndex],
  );

  const onTabClick = useCallback(
    (index) => {
      if (utilIndex === 0) {
        setFilterTabIndex(
          produce((draft) => {
            draft[tabIndex] = index;
          }),
        );
      } else {
        setSortTabIndex(index);
      }
    },
    [utilIndex, tabIndex],
  );

  const onReset = useCallback(() => {
    dispatch(utilReset({ utilTitle }));
  }, [utilTitle]);

  const onFilterCheck = useCallback(
    (filterIndex, itemIndex) => {
      dispatch(filterCheck({ utilTitle, tabIndex, filterIndex, itemIndex }));
    },
    [utilTitle, tabIndex],
  );

  const onSortCheck = useCallback(
    (filterIndex, itemIndex) => {
      dispatch(sortCheck({ utilTitle, filterIndex, itemIndex }));
    },
    [utilTitle],
  );

  return (
    <MoimTopUtilWrap>
      <ul className="utilList">
        {map(utilMenu, (item, index) => {
          const isActive = index === utilIndex;

          return (
            <UtilButton key={index} isActive={isActive}>
              <button type="button" onClick={() => onUtilClick(index)}>
                <FontAwesomeIcon icon={isActive ? faTimes : item.icon} />
              </button>
            </UtilButton>
          );
        })}
      </ul>
      {utilIndex !== -1 && (
        <UtilWrap isRound={utilIndex === 0}>
          <UtilHeader>
            <span className="icon">
              <FontAwesomeIcon icon={utilMenu[utilIndex].icon} />
            </span>
            <div className="info">
              <h3>{utilTitle}</h3>
              <button type="button" onClick={onReset}>
                <FontAwesomeIcon icon={faRedoAlt} />
              </button>
            </div>
          </UtilHeader>
          {utilIndex === 0 && (
            <MoimTopUtilBody
              menu={utilTabMenu[utilTitle][tabIndex]}
              cont={util[utilTitle][tabIndex]}
              activeIndex={filterTabIndex[tabIndex]}
              onTabClick={onTabClick}
              isVisible={utilIndex === 0}
              onItemCheck={onFilterCheck}
            />
          )}
          {utilIndex === 1 && (
            <MoimTopUtilBody
              menu={utilTabMenu[utilTitle]}
              cont={util[utilTitle]}
              activeIndex={sortTabIndex}
              onTabClick={onTabClick}
              isVisible={utilIndex === 1}
              onItemCheck={onSortCheck}
            />
          )}
        </UtilWrap>
      )}
    </MoimTopUtilWrap>
  );
};

export default MoimTopUtil;
