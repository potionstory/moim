import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import UserInfo from '../UserInfo';
import { CardWrap, CardBlock, CardInner, CardBody } from './style';

const Card = ({ item, category }) => {
  return (
    <CardWrap>
      <CardBlock>
        <CardInner className="inner">
          <CardHeaderComp item={item} category={category} />
          <CardBody>
            <CardTabComp item={item} category={category} />
          </CardBody>
        </CardInner>
      </CardBlock>
      <UserInfo
        image={item.userImage}
        name={item.userName}
        count={item.likeCount}
      />
    </CardWrap>
  );
};

export default Card;
