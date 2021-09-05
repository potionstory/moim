import React from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { detailTabMenu } from '../../lib/const';
import { MoimCreateAdditionalWrap, MoimCreateTabItem } from './style';

const MoimCreateAdditional = ({
  tabIndex,
  category,
  detailComminityTabBoxSwitch,
  detailMeetingTabBoxSwitch,
  onTabClick,
}) => {
  return (
    <MoimCreateAdditionalWrap activeIndex={tabIndex}>
      <div className="tabMenu">
        <motion.div
          className="activeBar"
          animate={{ x: tabIndex * 80 }}
          transition={{
            ease: 'backInOut',
          }}
        />
        <ul className="tabList">
          {map(detailTabMenu[category], (item, index) => (
            <MoimCreateTabItem key={index} isActive={index === tabIndex}>
              <button type="button" onClick={() => onTabClick(index)}>
                <FontAwesomeIcon icon={item} />
              </button>
            </MoimCreateTabItem>
          ))}
        </ul>
      </div>
      <div className="tabContent">
        <div className="tabContentInner">
          <div className="tabContentBox">
            {category === 'community'
              ? detailComminityTabBoxSwitch
              : detailMeetingTabBoxSwitch}
          </div>
        </div>
      </div>
    </MoimCreateAdditionalWrap>
  );
};

export default MoimCreateAdditional;
