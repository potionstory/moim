import React, { memo } from 'react';
import { Svg } from './style';

const Spinner = memo(() => {
  return (
    <Svg className="spinner" viewBox="0 0 120 120">
      <circle className="circle" cx="60" cy="60" r="50"></circle>
    </Svg>
  );
});

export default Spinner;
