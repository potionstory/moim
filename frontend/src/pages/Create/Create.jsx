import React, { useState, useCallback, useMemo } from 'react';
import MoimTop from '../../Containers/MoimTop';
import { categoryTabMenu } from '../../lib/const';

const Create = () => {
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
        isUtilVisible={false}
      />
    </>
  );
};

export default Create;
