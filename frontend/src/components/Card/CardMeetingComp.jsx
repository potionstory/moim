import React from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { CardImage, CardText, CardMap, CardTime, CardMore } from './style';

const CardMeetingComp = ({ item }) => {
  const { mainImage, text, tags } = item;

  return (
    <>
      <div className="cardTabBox">
        <CardImage>
          <img src={mainImage} />
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
        <CardMore>
          <div className="contentWrap">
            <div className="contentHead">
              <span className="iconBox">
                <FontAwesomeIcon className="icon" icon={faTag} />
              </span>
              <span className="title">tags</span>
            </div>
            <div className="contentBody">
              <ul className="tagList">
                {map(tags, (item, index) => (
                  <li key={index}>
                    <button type="button">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardMore>
      </div>
    </>
  );
};

export default CardMeetingComp;
