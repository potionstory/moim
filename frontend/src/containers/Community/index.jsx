import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCommunityAction } from '../../store/module/community';

const Community = () => {
  const list = useSelector((state) => state.community.list);
  const dispatch = useDispatch();
  const onGetAllCommunity = useCallback(
    () => dispatch(getAllCommunityAction.REQUEST()),
    [dispatch],
  );

  useEffect(() => {
    onGetAllCommunity();
  }, []);
  return (
    <div>
      <h2>Community Container</h2>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.communityId}>
              <div>
                <strong>{item.name}</strong>
                <span>{item.url}</span>
                <span>{item.createdAt}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Community;
