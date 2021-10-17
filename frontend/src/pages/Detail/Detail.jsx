import React, { memo } from 'react';
import MoimDetail from '../../Containers/MoimDetail';

const Detail = memo(({ match }) => {
  const { category, id } = match.params;

  return (
    <>
      <MoimDetail category={category} id={id} />
    </>
  );
});

export default Detail;
