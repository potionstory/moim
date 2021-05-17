import React from 'react';
import MoimDetail from '../../containers/MoimDetail';

const Detail = ({ match }) => {

  const { category, id } = match.params;

  return (
    <>
      <MoimDetail
        category={category}
        id={id}
      />
    </>
  );
};

export default Detail;
