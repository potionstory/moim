import React, { useRef, useMemo, useEffect } from 'react';
import dayjs from 'dayjs';
import CardMainImageBox from './CardMainImageBox';
import CardDescriptionBox from './CardDescriptionBox';
import CardScheduleBox from './CardScheduleBox';
import CardMapBox from './CardMapBox';
import CardAddInfoBox from './CardAddInfoBox';
import { CardTabBoxWrap } from './style';

const { kakao } = window;
const mapIndex = 3; //map menu index

const CardMeeting = ({ item, activeIndex }) => {
  const {
    meetingId,
    type,
    mainImage,
    description,
    startDate,
    endDate,
    tags,
  } = item;

  const mapRef = useRef(meetingId);

  // meeting date
  const eventStartDate = useMemo(
    () => dayjs.unix(startDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [startDate],
  );
  const eventStartWeek = useMemo(
    () => dayjs.unix(startDate._seconds).format('ddd'),
    [startDate],
  );
  const eventEndDate = useMemo(
    () => dayjs.unix(endDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [endDate],
  );
  const eventEndWeek = useMemo(
    () => dayjs.unix(endDate._seconds).format('ddd'),
    [endDate],
  );

  const isSameDate = useMemo(
    () =>
      dayjs(dayjs.unix(startDate._seconds)).isSame(
        dayjs.unix(endDate._seconds),
        'day',
      ),
    [startDate, endDate],
  );

  const CardTabBoxSwitch = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return (
          <CardMainImageBox
            detailUrl={`/detail/meeting/${meetingId}`}
            mainImage={mainImage}
          />
        );
      case 1:
        return (
          <CardDescriptionBox
            detailUrl={`/detail/meeting/${meetingId}`}
            description={description}
          />
        );
      case 2:
        return (
          <CardScheduleBox
            isSameDate={isSameDate}
            eventStartDate={eventStartDate}
            eventStartWeek={eventStartWeek}
            eventEndDate={eventEndDate}
            eventEndWeek={eventEndWeek}
          />
        );
      case 3:
        return <CardMapBox type={type} mapRef={mapRef} />;
      case 4:
        return <CardAddInfoBox number={10} tags={tags} />;
      default:
        return false;
    }
  }, [item, activeIndex]);

  useEffect(() => {
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
    <CardTabBoxWrap>
      <div className="cardTabBox">{CardTabBoxSwitch}</div>
    </CardTabBoxWrap>
  );
};

export default CardMeeting;
