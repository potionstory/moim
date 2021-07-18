import React from 'react';
import CardHeader from './CardHeader';
import CardBody from './CardBody';
import UserInfo from '../UserInfo';
import { CardWrap } from './style';

const Card = ({ item, category, onHandleDetail }) => {
  return (
    <CardWrap>
      <div className="cardBlock">
        <div className="cardInner">
          <CardHeader
            item={item}
            category={category}
            onHandleDetail={onHandleDetail}
          />
          <CardBody
            item={item}
            category={category}
            onHandleDetail={onHandleDetail}
          />
        </div>
      </div>
      <UserInfo
        image={item.userImage}
        avatar={item.userAvatar}
        name={item.userName}
        count={item.likeCount}
      />
    </CardWrap>
  );
};

export default Card;
