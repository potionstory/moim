import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCommunityAction, getMeetingAction } from '../../store/module/detail';
import { MoimDetailWrap } from './style';

const MoimDetail = ({ category, id }) => {
  const dispatch = useDispatch();

  const onGetCommunity = useCallback(
    () => dispatch(getCommunityAction.REQUEST(id)),
    [dispatch],
  );

  const onGetMeeting = useCallback(
    () => dispatch(getMeetingAction.REQUEST(id)),
    [dispatch],
  );

  useEffect(() => {
    if (category === "community") {
      onGetCommunity(id);
    } else {
      onGetMeeting(id);
    }
  }, []);

  console.log(category, id);

  return (
    <MoimDetailWrap>
      Moim Detail
    </MoimDetailWrap>
  );
};

export default MoimDetail;
