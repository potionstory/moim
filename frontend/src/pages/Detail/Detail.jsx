import React from 'react';
import { useSelector } from 'react-redux';
import MoimDetail from '../../Containers/MoimDetail';

const Detail = ({ match }) => {
  const { id } = match.params;

  const { category } = useSelector(({ global }) => global);

  return (
    <>
      <MoimDetail category={category} id={id} />
    </>
  );
};

export default Detail;
