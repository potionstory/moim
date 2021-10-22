import React, { memo } from 'react';
import MoimTopTab from './MoimTopTab';
import MoimTopUtil from './MoimTopUtil';
import { MoimTopWrap } from './style';

const MoimTop = memo(
  ({ tabMenu, tabTitle, tabIndex, onTabClick, isUtilVisible }) => {
    return (
      <MoimTopWrap>
        <div className="moimTop">
          <MoimTopTab
            tabMenu={tabMenu}
            activeIndex={tabIndex}
            onTabClick={onTabClick}
          />
          {/* {isUtilVisible && <MoimTopUtil tabIndex={tabIndex} />} */}
        </div>
        <h2>{tabTitle}</h2>
      </MoimTopWrap>
    );
  },
);

export default MoimTop;
