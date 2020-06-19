import React, { useState, useCallback } from 'react';
import { faCommentAlt, faMugHot } from '@fortawesome/free-solid-svg-icons';
import Community from '../containers/Community';
import TabTitle from '../containers/TabTitle';

const tabMenu = [
  {
    icon: faCommentAlt,
    title: 'community',
  },
  {
    icon: faMugHot,
    title: 'meeting',
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setActiveIndex(index);
  }, []);
  return (
    <>
      <TabTitle
        menu={tabMenu}
        activeIndex={activeIndex}
        onTabClick={onTabClick}
      />
      <Community category={tabMenu[activeIndex].title} />
    </>
  );
};

export default Home;
