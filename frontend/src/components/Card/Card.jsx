import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import CardUserInfoComp from './CardUserInfoComp';
import { CardWarp, CardBlock, CardInner, CardBody } from './style';

const Card = ({ item, category }) => {
  return (
    <CardWarp>
      <CardBlock>
        <CardInner className="inner">
          <CardHeaderComp
            service={item.service}
            title={item.title}
            status={item.status}
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
