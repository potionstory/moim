import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import UserInfo from '../UserInfo';
import { CardWrap, CardBlock, CardInner, CardBody } from './style';
import { getMeetingStatus } from '../../utils/commonUtil';

const Card = ({ item, category }) => {
  const { type, title, status } = item;

  return (
    <CardWrap>
      <CardBlock>
        <CardInner className="inner">
          <CardHeaderComp
            id={item[`${category}Id`]}
            type={type}
            title={title}
            status={category === 'community' ? status : getMeetingStatus(item)}
            category={category}
          />
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
