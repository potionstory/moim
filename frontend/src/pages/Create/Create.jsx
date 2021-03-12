import React, { useState, useCallback } from 'react';
import { faCommentAlt, faMugHot } from '@fortawesome/free-solid-svg-icons';
import MoimCreate from '../../containers/MoimCreate';
import MoimHeader from '../../containers/MoimHeader';

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
      <MoimHeader
        menu={tabMenu}
        activeIndex={activeIndex}
        onTabClick={onTabClick}
      />
      <MoimCreate category={activeIndex} />
    </>
  );
};

export default Home;
