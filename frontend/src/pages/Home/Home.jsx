import React, { useState, useCallback } from 'react';
import { faCommentAlt, faMugHot } from '@fortawesome/free-solid-svg-icons';
import MoimList from '../../containers/MoimList';
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
      <MoimList category={tabMenu[activeIndex].title} />
    </>
  );
};

export default Home;
