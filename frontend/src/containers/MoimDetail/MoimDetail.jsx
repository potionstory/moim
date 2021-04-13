import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import { getCommunityAction, getMeetingAction, resetDetailAction } from '../../store/module/detail';
import { communityType, meetingType } from '../../lib/const';
import UserInfo from '../../components/UserInfo';
import IconList from '../../components/IconList';
import { MoimDetailWrap, MoimDetailBase } from './style';

const MoimDetail = ({ category, id }) => {  
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [typeIndex, setTypeIndex] = useState(-1);
  
  const moimType = useMemo(() => category === 'community' ? communityType : meetingType, [category]);
  
  const onTypeChange = useCallback((index) => {
    setTypeIndex(index);
  }, []);

  const onGetCommunity = useCallback(
    () => dispatch(getCommunityAction.REQUEST(id)),
    [dispatch],
  );

  const onGetMeeting = useCallback(
    () => dispatch(getMeetingAction.REQUEST(id)),
    [dispatch],
  );

  const onResetDetail = useCallback(
    () => dispatch(resetDetailAction()),
    [dispatch],
  );

  useEffect(() => {
    if (category === 'community') {
      onGetCommunity(id);
    } else {
      onGetMeeting(id);
    }
    return () => {
      onResetDetail();
    };
  }, []);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, item => item.name === moim.type));
  }, [moimType, moim]);

  const { mainImage, userImage, userName, likeCount, title, status, text, tags } = moim;

  return (
    <>
      {!isEmpty(moim) && (
        <MoimDetailWrap>
          <MoimDetailBase>
            <div className="info">
              <div className="thumb">
                <img src={mainImage} />
              </div>
              <UserInfo
                image={userImage}
                name={userName}
                count={likeCount}
              />
            </div>
            <div className="summary">
              {typeIndex !== -1 && <IconList list={moimType} checkIndex={typeIndex} isEdit={true} isIcon={category === 'community' ? false : true} onCheckChange={onTypeChange} />}
              <span>{title}</span>
              <span>{status}</span>
              <span>{text}</span>
              <span>{tags}</span>
            </div>
          </MoimDetailBase>
        </MoimDetailWrap>
      )}
    </>
  );
};

export default MoimDetail;
