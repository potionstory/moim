import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import CardUserInfoComp from './CardUserInfoComp';
import { CardWrap, CardBlock, CardInner, CardBody } from './style';
import { getMeetingStatus } from '../../utils/commonUtil';

const Card = ({ item, category }) => {
  return (
    <CardWrap>
      <CardBlock>
        <CardInner className="inner">
          <CardHeaderComp
            service={item.service}
            type={item.type}
            title={item.title}
            status={
              category === 'community' ? item.status : getMeetingStatus(item)
            }
            category={category}
          />
          <CardBody>
            <CardTabComp item={item} category={category} />
          </CardBody>
        </CardInner>
      </CardBlock>
      <CardUserInfoComp
        image={item.userImage}
        name={item.userName}
        count={item.likeCount}
      />
    </CardWrap>
  );
};

export default Card;
