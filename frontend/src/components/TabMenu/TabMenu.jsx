import React from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabMenuWrap, TabButton } from './style';

const TabMeun = ({ menu, activeIndex, onTabClick }) => {
  return (
    <TabMenuWrap>
      <motion.div
        className="activeBox"
        animate={{ x: activeIndex * 40 }}
        transition={{
          ease: 'backInOut',
        }}
      />
      <ul>
        {map(menu, (item, index) => (
          <TabButton key={index} isActive={index === activeIndex}>
            <button type="button" onClick={() => onTabClick(index)}>
              <FontAwesomeIcon icon={item.icon} />
            </button>
          </TabButton>
        ))}
      </ul>
    </TabMenuWrap>
  );
};

export default TabMeun;
