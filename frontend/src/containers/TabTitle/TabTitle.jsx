import React from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabTitleWrap, TabButton } from './style';

const TabTitle = ({ menu, activeIndex, onTabClick }) => {
  return (
    <TabTitleWrap>
      <div className="tabTitle">
        <motion.div
          className="activeBox"
          animate={{ x: activeIndex * 86 }}
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
      </div>
      <h2>{menu[activeIndex].title}</h2>
    </TabTitleWrap>
  );
};

export default TabTitle;