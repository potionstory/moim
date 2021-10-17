import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { MoimTopTabWrap, TabButton } from './style';

const MoimTopTab = memo(({ tabMenu, activeIndex, onTabClick }) => {
  const isAuth = useSelector(({ auth }) => auth.isAuth);

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
      {isAuth && (
        <Link to="/create" className="btnCreate">
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      )}
    </MoimTopTabWrap>
  );
});

export default MoimTopTab;
