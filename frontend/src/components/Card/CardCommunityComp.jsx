import React from 'react';
import { CardImage, CardText, CardMore } from './style';

const CardCommunityComp = ({ image, text }) => {
  return (
    <>
      <div className="cardTabBox">
        <CardImage>
          <img src={image} />
        </CardImage>
      </div>
      <div className="cardTabBox">
        <CardText>{text}</CardText>
      </div>
      <div className="cardTabBox">
        <CardMore>기타 내용들 보여주기(바로가기 / 참여하기 등등)</CardMore>
      </div>
    </>
  );
};

export default CardCommunityComp;
