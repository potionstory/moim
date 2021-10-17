import React, { memo } from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { detailTabMenu } from '../../lib/const';
import { MoimDetailAdditionalWrap, MoimDetailTabItem } from './style';

const MoimDetailAdditional = memo(
  ({
    tabIndex,
    category,
    detailComminityTabBoxSwitch,
    detailMeetingTabBoxSwitch,
    onTabClick,
  }) => {
    return (
      <MoimDetailAdditionalWrap activeIndex={tabIndex}>
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
              <MoimDetailTabItem key={index} isActive={index === tabIndex}>
                <button type="button" onClick={() => onTabClick(index)}>
                  <FontAwesomeIcon icon={item} />
                </button>
              </MoimDetailTabItem>
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
      </MoimDetailAdditionalWrap>
    );
  },
);

export default MoimDetailAdditional;
