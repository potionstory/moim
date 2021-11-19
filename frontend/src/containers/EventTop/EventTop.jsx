import React from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventTopWrap, EventTopTabWrap, TabButton } from './style';

const EventTop = ({ tabMenu, tabTitle, tabIndex, onTabClick }) => {
  return (
    <EventTopWrap>
      <div className="eventTop">
        <EventTopTabWrap>
          <motion.div
            className="activeBar"
            animate={{ x: tabIndex * 80 }}
            transition={{
              ease: 'backInOut',
            }}
          />
          <ul className="tabList">
            {map(tabMenu, (item, index) => (
              <TabButton key={index} isActive={index === tabIndex}>
                <button type="button" onClick={() => onTabClick(index)}>
                  <FontAwesomeIcon icon={item.icon} />
                </button>
              </TabButton>
            ))}
          </ul>
        </EventTopTabWrap>
      </div>
      <h2>{tabTitle}</h2>
    </EventTopWrap>
  );
};

export default EventTop;
