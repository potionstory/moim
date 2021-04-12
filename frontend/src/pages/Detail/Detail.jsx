import React, { useState, useCallback } from 'react';
import MoimTop from '../../containers/MoimTop';
import MoimDetail from '../../containers/MoimDetail';
import { categoryTabMenu } from '../../lib/const';

const Detail = ({ match }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  const { category, id } = match.params;

  return (
    <>
      <MoimTop
        tabMenu={categoryTabMenu}
        tabTitle={category}
        tabIndex={tabIndex}
        onTabClick={onTabClick}
        isUtilVisible={false}
      />
      <MoimDetail
        category={category}
        id={id}
      />
    </>
  );
};

export default Detail;
