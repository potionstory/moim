import React from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoimHeaderTabWrap, TabButton } from './style';

const MoimHeaderTabComp = ({ tabMenu, activeIndex, onTabClick }) => {
  return (
    <MoimHeaderTabWrap>
      <motion.div
        className="motionTab"
        animate={{ x: activeIndex * 80 }}
        transition={{
          ease: 'backInOut',
        }}
      />
      <ul className="tabList">
        {map(tabMenu, (item, index) => (
          <TabButton key={index} isActive={index === activeIndex}>
            <button type="button" onClick={() => onTabClick(index)}>
              <FontAwesomeIcon icon={item.icon} />
            </button>
          </TabButton>
        ))}
      </ul>
    </MoimHeaderTabWrap>
  );
};

export default MoimHeaderTabComp;