import React from 'react';
import MoimHeaderTabComp from './MoimHeaderTabComp';
import MoimHeaderUtilWrap from './MoimHeaderUtilComp';
import { MoimHeaderWrap } from './style';

const MoimHeader = ({ tab, util, tabIndex, utilIndex, onTabClick, onUtilClick }) => {

  return (
    <MoimHeaderWrap>
      <div className="moimHeader">
        <MoimHeaderTabComp tab={tab} activeIndex={tabIndex} onTabClick={onTabClick} />
        <MoimHeaderUtilWrap util={util} activeIndex={utilIndex} onUtilClick={onUtilClick} />
      </div>
      <h2>{tab[tabIndex].title}</h2>
    </MoimHeaderWrap>
  );
};

export default MoimHeader;
