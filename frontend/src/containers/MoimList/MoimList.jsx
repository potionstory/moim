import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isNull, map } from 'lodash';
import { getAllCommunityAction } from '../../store/module/community';
import { getAllMeetingAction } from '../../store/module/meeting';
import { passNumberModalOpenAction } from '../../store/module/global';
import { setPassNumberCheckAction } from '../../store/module/detail';
import Card from '../../Components/Card';
import { MoimListWrap } from './style';

const MoimList = ({ category }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const list = {
    community: useSelector(({ community }) => community.list),
    meeting: useSelector(({ meeting }) => meeting.list),
  };
  const { id } = useSelector(({ global }) => global);
  const { isPassNumberCheck } = useSelector(({ detail }) => detail);
  const { userInfo } = useSelector(({ auth }) => auth);

  const onGetAllCommunity = useCallback(
    () => dispatch(getAllCommunityAction.REQUEST()),
    [dispatch],
  );

  const onGetAllMeeting = useCallback(
    () => dispatch(getAllMeetingAction.REQUEST()),
    [dispatch],
  );

  const onHandleDetail = useCallback(
    (id, userId, isLock) => {
      if (
        (isLock && isNull(userInfo)) ||
        (!isNull(userInfo) && userInfo.userId !== userId)
      ) {
        dispatch(passNumberModalOpenAction(id));
      } else {
        history.push(`/detail/${category}/${id}`);
      }
    },
    [category, list, userInfo, dispatch],
  );

  useEffect(() => {
    if (isPassNumberCheck) {
      history.push(`/detail/${category}/${id}`);
      dispatch(setPassNumberCheckAction(false));
    }
  }, [isPassNumberCheck, category, id, dispatch]);

  useEffect(() => {
    onGetAllCommunity();
    onGetAllMeeting();
  }, []);

  return (
    <MoimListWrap>
      {map(list[category], (item) => {
        return (
          <Card
            key={item[`${category}Id`]}
            item={item}
            category={category}
            onHandleDetail={onHandleDetail}
          />
        );
      })}
    </MoimListWrap>
  );
};

export default MoimList;
