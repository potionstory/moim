import React, { useState, useCallback, useMemo, useEffect } from 'react';
import MoimTop from '../../containers/MoimTop';
import { categoryTabMenu } from '../../lib/const';

const Detail = ({ match }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const category = useMemo(() => categoryTabMenu[tabIndex].title, [tabIndex]);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  useEffect(() => {
    console.log('match.params: ', match.params.category, match.params.id);
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

export default Detail;
