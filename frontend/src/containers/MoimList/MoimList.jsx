import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import map from 'lodash/map';
import { getAllCommunityAction } from '../../store/module/community';
import { getAllMeetingAction } from '../../store/module/meeting';
import Card from '../../components/Card';
import { MoimListWrap } from './style';

const MoimList = ({ category }) => {
  const list = {
    community: useSelector(({ community }) => community.list),
    meeting: useSelector(({ meeting }) => meeting.list),
  };

  const dispatch = useDispatch();

  const onGetAllCommunity = useCallback(
    () => dispatch(getAllCommunityAction.REQUEST()),
    [dispatch],
  );

  const onGetAllMeeting = useCallback(
    () => dispatch(getAllMeetingAction.REQUEST()),
    [dispatch],
  );

  useEffect(() => {
    onGetAllCommunity();
    onGetAllMeeting();
  }, []);

  return (
    <MoimListWrap>
      {map(list[category], (item) => {
        return (
          <Card key={item[`${category}Id`]} item={item} category={category} />
        );
      })}
    </MoimListWrap>
  );
};

export default MoimList;