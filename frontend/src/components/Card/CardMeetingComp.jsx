import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD6,
  faMapMarkerAlt,
  faCircle,
  faTag,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CardImage, CardText, CardMap, CardTime, CardMore } from './style';

const { kakao } = window;
const mapIndex = 3; //map menu index
const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CardMeetingComp = ({ item, activeIndex }) => {
  const { meetingId, type, mainImage, text, startDate, endDate, tags } = item;
  const mapRef = useRef(meetingId);

  // meeting date
  const eventStartDate = dayjs
    .unix(startDate._seconds)
    .format('YYYY/MM/DD/HH/mm')
    .split('/');
  const eventEndDate = dayjs
    .unix(endDate._seconds)
    .format('YYYY/MM/DD/HH/mm')
    .split('/');
  const eventWeek = dayjs.unix(startDate._seconds).format('ddd');

  useLayoutEffect(() => {
    // meeting location
    if (mapIndex === activeIndex && type === 'offline') {
      mapRef.current.innerHTML = '';

      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(mapRef.current, options);
      const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
    }
  }, [activeIndex, type]);

  return (
    <>
      <div className="cardTabBox">
        <CardImage>
          <Link to={`/detail/meeting/${meetingId}`} className="thumb">
            <img src={mainImage} />
          </Link>
          <Link to={`/detail/meeting/${meetingId}`} className="cover">
            <FontAwesomeIcon className="icon" icon={faDiceD6} />
          </Link>
        </CardImage>
      </div>
      <div className="cardTabBox">
        <CardText>
          <Link to={`/detail/meeting/${meetingId}`}>{text}</Link>
        </CardText>
      </div>
      <div className="cardTabBox">
        <CardTime>
          <span className="month">{`${eventStartDate[0]}.${eventStartDate[1]}`}</span>
          <div className="dateBox">
            {/* <span className="week">{eventWeek}</span> */}
            <span className="weekDot">
              {map(weeks, (week, index) => {
                if (week !== eventWeek) {
                  return <FontAwesomeIcon key={index} icon={faCircle} />;
                } else {
                  return <span key={index}>{eventWeek}</span>;
                }
              })}
            </span>
            <span className="day">{eventStartDate[2]}</span>
          </div>
          <span className="time">{`${eventStartDate[3]}:${
            eventStartDate[4]
          } - ${eventEndDate[3] !== '00' ? eventEndDate[3] : '24'}:${
            eventEndDate[4]
          }`}</span>
        </CardTime>
      </div>
      <div className="cardTabBox">
        <CardMap>
          {type === 'offline' ? (
            <div ref={mapRef} className="mapArea"></div>
          ) : (
            <div className="mapNone">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <span>online meeting</span>
            </div>
          )}
        </CardMap>
      </div>
      <div className="cardTabBox">
        <CardMore>
          <div className="contentWrap">
            <div className="contentHead">
              <span className="iconBox">
                <FontAwesomeIcon className="icon" icon={faUser} />
              </span>
              <span className="title">members</span>
            </div>
            <div className="contentBody">
              <span className="memberCount">
                <span className="now">10</span>
                {` / `}
                <span className="max">30</span>
              </span>
            </div>
          </div>
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
