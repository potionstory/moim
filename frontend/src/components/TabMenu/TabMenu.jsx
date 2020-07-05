import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabMenuWrap, TabButton } from './style';

const TabMeun = ({ menu, activeIndex, onTabClick }) => {
  return (
    <TabMenuWrap>
      <motion.div
        className="activeBox"
        animate={{ left: activeIndex * 40 }}
        transition={{
          ease: 'backInOut',
        }}
      />
      <ul>
        {menu.map((item, index) => (
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
