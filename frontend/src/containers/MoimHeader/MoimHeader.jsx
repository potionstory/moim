import React, { useMemo } from 'react';
import MoimHeaderTabComp from './MoimHeaderTabComp';
import MoimHeaderUtilComp from './MoimHeaderUtilComp';
import { MoimHeaderWrap } from './style';

const MoimHeader = ({ tabMenu, utilMenu, tabIndex, utilIndex, onTabClick, onUtilClick }) => {
  const tabTitle = useMemo(() => tabMenu[tabIndex].title, [tabIndex]);

  return (
    <MoimHeaderWrap>
      <div className="moimHeader">
        <MoimHeaderTabComp tabMenu={tabMenu} activeIndex={tabIndex} onTabClick={onTabClick} />
        <MoimHeaderUtilComp tabIndex={tabIndex} utilMenu={utilMenu} activeIndex={utilIndex} onUtilClick={onUtilClick} />
      </div>
      <h2>{tabTitle}</h2>
    </MoimHeaderWrap>
  );
};

export default MoimHeader;
