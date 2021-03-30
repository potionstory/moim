import React, { useEffect } from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { CardImage, CardText, CardMap, CardTime, CardMore } from './style';

const { kakao } = window;
const mapIndex = 2; //map menu index

const CardMeetingComp = ({ item, activeIndex }) => {
  const { meetingId, mainImage, text, tags } = item;

  useEffect(() => {
    if (mapIndex === activeIndex) {
      const container = document.getElementById(`${meetingId}`);
      container.innerHTML = "";
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      const markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 
      const marker = new kakao.maps.Marker({
        position: markerPosition
      });

      marker.setMap(map);
    }
  }, [activeIndex]);

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
        <CardMap>
          <div id={`${meetingId}`} className="mapArea">
          </div>
        </CardMap>
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
