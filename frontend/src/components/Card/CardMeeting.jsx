import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import dayjs from 'dayjs';
import CardMainImageBox from './CardMainImageBox';
import CardDescriptionBox from './CardDescriptionBox';
import CardScheduleBox from './CardScheduleBox';
import CardMapBox from './CardMapBox';
import CardAddInfoBox from './CardAddInfoBox';
import CardLockBox from './CardLockBox';
import { CardTabBoxWrap } from './style';

const { kakao } = window;
const mapIndex = 3; //map menu index

const CardMeeting = ({ item, activeIndex, onHandleDetail }) => {
  const {
    meetingId,
    userId,
    isLock,
    type,
    mainImage,
    description,
    startDate,
    endDate,
    location,
    memberNowCount,
    memberMaxCount,
    tags,
  } = item;

  const mapRef = useRef(meetingId);

  const [address, setAddress] = useState('');

  // meeting date
  const eventStartDate = useMemo(
    () =>
      !isLock &&
      dayjs.unix(startDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [startDate],
  );
  const eventStartWeek = useMemo(
    () => !isLock && dayjs.unix(startDate._seconds).format('ddd'),
    [startDate],
  );
  const eventEndDate = useMemo(
    () =>
      !isLock &&
      dayjs.unix(endDate._seconds).format('YYYY/MM/DD/HH/mm').split('/'),
    [endDate],
  );
  const eventEndWeek = useMemo(
    () => !isLock && dayjs.unix(endDate._seconds).format('ddd'),
    [endDate],
  );

  const isSameDate = useMemo(
    () =>
      !isLock &&
      dayjs(dayjs.unix(startDate._seconds)).isSame(
        dayjs.unix(endDate._seconds),
        'day',
      ),
    [startDate, endDate],
  );

  const onAddressCopy = useCallback(() => {
    if (!isLock) {
      const { name } = location;

      navigator.clipboard.writeText(`[${name}] ${address}`);
    }
  }, [address]);

  const cardTabBoxSwitch = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return (
          <CardMainImageBox
            id={meetingId}
            userId={userId}
            isLock={isLock}
            mainImage={mainImage}
            onHandleDetail={onHandleDetail}
          />
        );
      case 1:
        return (
          <CardDescriptionBox
            id={meetingId}
            userId={userId}
            isLock={isLock}
            description={description}
            onHandleDetail={onHandleDetail}
          />
        );
      case 2:
        return !isLock ? (
          <CardScheduleBox
            isSameDate={isSameDate}
            eventStartDate={eventStartDate}
            eventStartWeek={eventStartWeek}
            eventEndDate={eventEndDate}
            eventEndWeek={eventEndWeek}
          />
        ) : (
          <CardLockBox />
        );
      case 3:
        if (!isLock) {
          const { name } = location;

          return (
            <CardMapBox
              name={name}
              address={address}
              type={type}
              mapRef={mapRef}
              onAddressCopy={onAddressCopy}
            />
          );
        } else {
          return <CardLockBox />;
        }
      case 4:
        return (
          <CardAddInfoBox
            now={memberNowCount}
            max={memberMaxCount}
            tags={tags}
          />
        );
      default:
        return false;
    }
  }, [address, onAddressCopy, activeIndex]);

  useEffect(() => {
    // meeting location
    if (!isLock && mapIndex === activeIndex && type === 'offline') {
      const { _latitude, _longitude } = location.coordinate;

      mapRef.current.innerHTML = '';

      const options = {
        center: new kakao.maps.LatLng(_latitude, _longitude),
        level: 3,
      };
      const map = new kakao.maps.Map(mapRef.current, options);
      const markerPosition = new kakao.maps.LatLng(_latitude, _longitude);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      const geocoder = new kakao.maps.services.Geocoder();

      marker.setMap(map);
      geocoder.coord2Address(_longitude, _latitude, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          let address = !!result[0].road_address
            ? result[0].road_address.address_name
            : result[0].address.address_name;

          setAddress(address);
        }
      });
    }
  }, [activeIndex, type]);

  return (
    <CardTabBoxWrap>
      <div className="cardTabBox">{cardTabBoxSwitch}</div>
    </CardTabBoxWrap>
  );
};

export default CardMeeting;
