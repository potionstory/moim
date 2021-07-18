import React from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoimTopTabWrap, TabButton } from './style';

const MoimTopTab = ({ tabMenu, activeIndex, onTabClick }) => {
  return (
    <MoimTopTabWrap>
      <motion.div
        className="activeBar"
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
    </MoimTopTabWrap>
  );
};

export default MoimTopTab;
