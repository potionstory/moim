import React, { useState, useCallback, useMemo } from 'react';
import MoimList from '../../containers/MoimList';
import MoimTop from '../../containers/MoimTop';
import { categoryTabMenu } from '../../lib/const';

const Home = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const category = useMemo(() => categoryTabMenu[tabIndex].title, [tabIndex]);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  return (
    <>
      <MoimTop
        tabMenu={categoryTabMenu}
        tabTitle={category}
        tabIndex={tabIndex}
        onTabClick={onTabClick}
        isUtilVisible={true}
      />
      <MoimList category={category} />
    </>
  );
};

export default Home;
