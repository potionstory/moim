import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findIndex } from 'lodash';
import MoimTop from '../../Containers/MoimTop';
import MoimCreate from '../../Containers/MoimCreate';
import { categoryChangeAction } from '../../store/module/global';
import { categoryTabMenu } from '../../lib/const';

const Create = () => {
  const { category } = useSelector(({ global }) => global);
  const dispatch = useDispatch();

  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback(
    (index) => {
      dispatch(categoryChangeAction(categoryTabMenu[index].title));
      setTabIndex(index);
    },
    [dispatch, categoryTabMenu],
  );

  useEffect(() => {
    setTabIndex(findIndex(categoryTabMenu, (tab) => tab.title === category));
  }, [category]);

  return (
    <>
      <MoimTop
        tabMenu={categoryTabMenu}
        tabTitle={category}
        tabIndex={tabIndex}
        onTabClick={onTabClick}
        isUtilVisible={false}
      />
      <MoimCreate category={category} />
    </>
  );
};

export default Create;
