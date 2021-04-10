import React, { useMemo } from 'react';
import MoimTopTabComp from './MoimTopTabComp';
import MoimTopUtilComp from './MoimTopUtilComp';
import { MoimTopWrap } from './style';

const MoimTop = ({
  tabMenu,
  utilMenu,
  tabIndex,
  utilIndex,
  onTabClick,
  onUtilClick,
}) => {
  const tabTitle = useMemo(() => tabMenu[tabIndex].title, [tabIndex]);

  return (
    <MoimTopWrap>
      <div className="moimTop">
        <MoimTopTabComp
          tabMenu={tabMenu}
          activeIndex={tabIndex}
          onTabClick={onTabClick}
        />
        <MoimTopUtilComp
          tabIndex={tabIndex}
          utilMenu={utilMenu}
          activeIndex={utilIndex}
          onUtilClick={onUtilClick}
        />
      </div>
      <h2>{tabTitle}</h2>
    </MoimTopWrap>
  );
};

export default MoimTop;
