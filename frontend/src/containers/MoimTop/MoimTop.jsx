import React from 'react';
import MoimTopTabComp from './MoimTopTabComp';
import MoimTopUtilComp from './MoimTopUtilComp';
import { MoimTopWrap } from './style';

const MoimTop = ({
  tabMenu,
  tabTitle,
  tabIndex,
  onTabClick,
  isUtilVisible,
}) => {
  return (
    <MoimTopWrap>
      <div className="moimTop">
        <MoimTopTabComp
          tabMenu={tabMenu}
          activeIndex={tabIndex}
          onTabClick={onTabClick}
        />
        {isUtilVisible && <MoimTopUtilComp tabIndex={tabIndex} />}
      </div>
      <h2>{tabTitle}</h2>
    </MoimTopWrap>
  );
};

export default MoimTop;
