import React, { useState, useCallback } from 'react';
import {
  faCommentAlt,
  faMugHot,
  faFilter,
  faSortAmountDown,
} from '@fortawesome/free-solid-svg-icons';
import MoimList from '../../containers/MoimList';
import MoimTop from '../../containers/MoimTop';

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

const utilMenu = [
  {
    icon: faFilter,
    title: 'filter',
  },
  {
    icon: faSortAmountDown,
    title: 'sort',
  },
];

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [utilIndex, setUtilIndex] = useState(-1);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  const onUtilClick = useCallback(
    (index) => {
      setUtilIndex(utilIndex !== index ? index : -1);
    },
    [utilIndex],
  );

  return (
    <>
      <MoimTop
        tabMenu={tabMenu}
        utilMenu={utilMenu}
        tabIndex={tabIndex}
        utilIndex={utilIndex}
        onTabClick={onTabClick}
        onUtilClick={onUtilClick}
      />
      <MoimList category={tabMenu[tabIndex].title} />
    </>
  );
};

export default Home;
