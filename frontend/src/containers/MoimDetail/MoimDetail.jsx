import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { getCommunityAction, getMeetingAction, resetDetailAction } from '../../store/module/detail';
import { communityType, meetingType, communityStatus, meetingStatus } from '../../lib/const';
import UserInfo from '../../components/UserInfo';
import IconList from '../../components/IconList';
import IconButton from '../../components/Button/IconButton';
import { MoimDetailWrap, MoimDetailBase, MoimDetailTitle, MoimDetailStatus } from './style';

const MoimDetail = ({ category, id }) => {
  const { moim } = useSelector(({ detail }) => detail);
  const dispatch = useDispatch();

  const [detail, setDetail] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [typeIndex, setTypeIndex] = useState(-1);
  
  const moimType = useMemo(() => category === 'community' ? communityType : meetingType, [category]);
  const moimStatus = useMemo(() => category === 'community' ? communityStatus : meetingStatus, [category]);
  
  const onEditToggle = useCallback(() => {
    setIsEdit(isEdit => !isEdit);
  }, []);

  const onTypeChange = useCallback((index) => {
    setDetail(detail => {
      return {
        ...detail,
        type: moimType[index].name,
      }
    });
  }, [moimType]);

  const onTitleChange = useCallback((e) => {
    const { value } = e.target;

    setDetail(detail => {
      return {
        ...detail,
        title: value,
      }
    });
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
    setDetail(moim);
  }, [moim]);

  useEffect(() => {
    setTypeIndex(findIndex(moimType, item => item.name === detail.type));
  }, [moimType, detail]);

  const { mainImage, userImage, userName, likeCount, title, status, text, tags } = detail;

  return (
    <>
      {!isEmpty(detail) && (
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
              {typeIndex !== -1 && <IconList list={moimType} checkIndex={typeIndex} isEdit={isEdit} isIcon={category === 'community' ? false : true} onCheckChange={onTypeChange} />}
              <MoimDetailTitle isEdit={isEdit}>
                {!isEdit ? <h3>{title}</h3> : <input type="text" value={title} onChange={onTitleChange} />}
              </MoimDetailTitle>
              <MoimDetailStatus>
                {status}
                <ul>
                {moimStatus.map((item => {
                  return <li key={item.name}>{item.name}</li>
                }))}
                </ul>
              </MoimDetailStatus>
              <span>{text}</span>
              <span>{tags}</span>
            </div>
          </MoimDetailBase>
        </MoimDetailWrap>
      )}
      <IconButton onClickEvent={onEditToggle} icon={faEdit} />
    </>
  );
};

export default MoimDetail;
