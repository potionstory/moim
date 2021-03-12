import React, { useState, useCallback, useMemo, useEffect } from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { utilTabMenu } from '../../lib/const';
import MoimHeaderUtilBodyComp from './MoimHeaderUtilBodyComp';
import { MoimHeaderUtilWrap, UtilButton, UtilWrap, UtilHeader, UtilBody, UtilTabMenuWrap, UtilTabMenu, UtilTabContentWarp, UtilTabContentBlock, UtilTabContentInner } from './style';

const MoimHeaderUtilComp = ({ util, activeIndex, onUtilClick }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [filterTabIndex, setFilterTabIndex] = useState(0);
  const [sortTabIndex, setSortTabIndex] = useState(0);
  const utilTitle = useMemo(() => activeIndex !== -1 && util[activeIndex].title, [util, activeIndex]);

  const onUtilTabClick = useCallback((index) => {
    switch (utilTitle) {
      case "filter":
        return setFilterTabIndex(index);
      case "sort":
        return setSortTabIndex(index);
      default:
        return flase;
    }
  }, [utilTitle]);

  return (
    <MoimHeaderUtilWrap>
      <ul className="utilList">
        {map(util, (item, index) => (
          <UtilButton key={index} isActive={index === activeIndex}>
            <button type="button" onClick={() => onUtilClick(index)}>
              <FontAwesomeIcon icon={item.icon} />
            </button>
          </UtilButton>
        ))}
      </ul>
      {activeIndex !== -1 && (
        <UtilWrap isRound={activeIndex === 0}>
          <UtilHeader>
            <span className="icon">
              <FontAwesomeIcon icon={util[activeIndex].icon} />
            </span>
            <div className="info">
              <h3>{utilTitle}</h3>
              <button type="button">
                <FontAwesomeIcon icon={faRedoAlt} />
              </button>
            </div>
          </UtilHeader>
          <MoimHeaderUtilBodyComp menu={utilTabMenu[utilTitle]} activeIndex={tabIndex} onUtilTabClick={onUtilTabClick} />
        </UtilWrap>
      )}
    </MoimHeaderUtilWrap>
  );
};

export default MoimHeaderUtilComp;