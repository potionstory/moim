import React from 'react';
import dayjs from 'dayjs';
import { MoimDetailDateWrap } from './style';

const MoimDetailDate = ({ date }) => {
  const moimDate = dayjs
  .unix(date._seconds)
  .format('YYYY/MM/DD/HH/mm')
  .split('/');

  return (
    <MoimDetailDateWrap>
      <div>1</div>
      <div>1</div>
    </MoimDetailDateWrap>
  );
};

export default MoimDetailDate;
