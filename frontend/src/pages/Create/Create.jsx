import React, { useState, useCallback } from 'react';
import { faCommentAlt, faMugHot } from '@fortawesome/free-solid-svg-icons';
import MoimCreate from '../../containers/MoimCreate';
import TabTitle from '../../containers/TabTitle';

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
      <MoimCreate category={activeIndex} />
    </>
  );
};

export default Home;
