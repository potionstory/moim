import React from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EventTopWrap, EventTopTabWrap } from './style';

const EventTop = () => {
  return (
    <EventTopWrap>
      <div className="eventTop">
        <EventTopTabWrap>
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
          {isAuth && (
            <Link to="/create" className="btnCreate">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          )}
        </EventTopTabWrap>
      </div>
      <h2>EventTop</h2>
    </EventTopWrap>
  );
};

export default EventTop;
