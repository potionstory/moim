import React, { useState, useCallback } from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardTabComp from './CardTabComp';
import CardUserInfoComp from './CardUserInfoComp';
import { CardWarp, CardBlock, CardInner, CardBody } from './style';
import { kakao } from '../../lib/icons';

const Card = ({ item }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  return (
    <CardWarp>
      <CardBlock>
        <CardInner className="inner">
          <CardHeaderComp icon={kakao} title={item.name} status="open" />
          <CardBody>
            <CardTabComp tabIndex={tabIndex} onTabClick={onTabClick} />
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
