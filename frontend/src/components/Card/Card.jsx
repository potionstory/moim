import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import CardUserInfoComp from './CardUserInfoComp';
import { CardWarp, CardBlock, CardInner, CardBody } from './style';
import { getMeetingStatus } from '../../utils/commonUtil';

const Card = ({ item, category }) => {
  return (
    <CardWarp>
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
            <CardTabComp
              image={item.mainImage}
              text={item.text}
              category={category}
            />
          </CardBody>
        </CardInner>
      </CardBlock>
      <CardUserInfoComp
        image={item.userImage}
        name={item.userHandle}
        count={item.likeCount}
      />
    </CardWarp>
  );
};

export default Card;
