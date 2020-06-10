import React from 'react';
import CardHeaderComp from './CardHeaderComp';
import CardUrlComp from './CardUrlComp';
import CardAddInfoComp from './CardAddInfoComp';
import CardUserInfoComp from './CardUserInfoComp';
import { CardWarp, CardInner, CardBase, CardImage, CardText } from './style';
import { kakao } from '../../lib/icons';
import { temp } from '../../lib/images';

const Card = ({ item }) => {
  return (
    <CardWarp>
      <CardInner>
        <CardBase>
          <CardHeaderComp icon={kakao} title={item.name} status="open" />
          <CardUrlComp url={item.url} />
          <CardImage>
            <img src={temp} />
          </CardImage>
          <CardText>
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
            설명
          </CardText>
        </CardBase>
        <CardAddInfoComp
          date="2020.07.23 (수) 19:23 ~ 21:00"
          place="서울시 강남구 삼성동 좋은 빌딩 301호"
        />
      </CardInner>
      <CardUserInfoComp
        image={item.userImage}
        name={item.userHandle}
        count={item.likeCount}
      />
    </CardWarp>
  );
};

export default Card;
