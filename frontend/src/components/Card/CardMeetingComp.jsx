import React from 'react';
import { CardImage, CardText, CardMap, CardTime, CardMore } from './style';

const CardMeetingComp = ({ image, text }) => {
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
        <CardMap>카카오 지도 넣기</CardMap>
      </div>
      <div className="cardTabBox">
        <CardTime>
          모임 시간: 네모 블럭으로 넣기 모임 시간까지의 카운트는
          생각해보기(최적화 문제) 많은 카드들이 동시에 카운트가 되면 느려질거
          예상 (시작전/진행중/완료 상태 표시)
        </CardTime>
      </div>
      <div className="cardTabBox">
        <CardMore>기타 내용들 보여주기(바로가기 / 참여하기 등등)</CardMore>
      </div>
    </>
  );
};

export default CardMeetingComp;
