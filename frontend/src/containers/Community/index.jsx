import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCommunity } from '../../modules/community';
import api from '../../api/api';

const Community = () => {
  const list = useSelector((state) => state.community.list);
  const dispatch = useDispatch();
  const onGetCommunity = useCallback(() => dispatch(getCommunity()), [
    dispatch,
  ]);

  const [onlines, setOnlines] = useState([]);

  useEffect(() => {
    api
      .get('/onlines')
      .then((res) => {
        console.log(res.data);
        setOnlines(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2>Community Container</h2>
      <button onClick={onGetCommunity}>리덕스 사용하기</button>
      {onlines.map((item) => {
        return (
          <div key={item.onlineId}>
            <strong>{item.name}</strong>
            <span>{item.url}</span>
            <span>{item.createdAt}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Community;
