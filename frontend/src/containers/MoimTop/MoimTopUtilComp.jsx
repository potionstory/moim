import React, { useState, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  filterCheck,
  sortCheck,
  utilReset,
} from '../../../src/store/module/util';
import { utilTabMenu } from '../../lib/const';
import MoimTopUtilBodyComp from './MoimTopUtilBodyComp';
import { MoimTopUtilWrap, UtilButton, UtilWrap, UtilHeader } from './style';

const MoimTopUtilComp = ({ tabIndex, utilMenu, activeIndex, onUtilClick }) => {
  const util = useSelector(({ util }) => util);
  const dispatch = useDispatch();

  const [filterTabIndex, setFilterTabIndex] = useState([0, 0]);
  const [sortTabIndex, setSortTabIndex] = useState(0);

  const utilTitle = useMemo(
    () => activeIndex !== -1 && utilMenu[activeIndex].title,
    [util, activeIndex],
  );

  const onTabClick = useCallback(
    (index) => {
      if (activeIndex === 0) {
        setFilterTabIndex(
          produce((draft) => {
            draft[tabIndex] = index;
          }),
        );
      } else {
        setSortTabIndex(index);
      }
    },
    [activeIndex, tabIndex],
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
          const isActive = index === activeIndex;

          return (
            <UtilButton key={index} isActive={isActive}>
              <button type="button" onClick={() => onUtilClick(index)}>
                <FontAwesomeIcon icon={isActive ? faTimes : item.icon} />
              </button>
            </UtilButton>
          );
        })}
      </ul>
      {activeIndex !== -1 && (
        <UtilWrap isRound={activeIndex === 0}>
          <UtilHeader>
            <span className="icon">
              <FontAwesomeIcon icon={utilMenu[activeIndex].icon} />
            </span>
            <div className="info">
              <h3>{utilTitle}</h3>
              <button type="button" onClick={onReset}>
                <FontAwesomeIcon icon={faRedoAlt} />
              </button>
            </div>
          </UtilHeader>
          {activeIndex === 0 && (
            <MoimTopUtilBodyComp
              menu={utilTabMenu[utilTitle][tabIndex]}
              cont={util[utilTitle][tabIndex]}
              activeIndex={filterTabIndex[tabIndex]}
              onTabClick={onTabClick}
              isVisible={activeIndex === 0}
              onItemCheck={onFilterCheck}
            />
          )}
          {activeIndex === 1 && (
            <MoimTopUtilBodyComp
              menu={utilTabMenu[utilTitle]}
              cont={util[utilTitle]}
              activeIndex={sortTabIndex}
              onTabClick={onTabClick}
              isVisible={activeIndex === 1}
              onItemCheck={onSortCheck}
            />
          )}
        </UtilWrap>
      )}
    </MoimTopUtilWrap>
  );
};

export default MoimTopUtilComp;
