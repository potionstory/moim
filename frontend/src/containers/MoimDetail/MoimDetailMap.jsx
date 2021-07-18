import React, { useState, useRef, useCallback, useEffect } from 'react';
import { isEqual, isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import markerNormal from '../../lib/images/marker_normal.png';
import { MoimDetailMapWrap, MoimDetailMapForm } from './style';

const { kakao } = window;

const MoimDetailMap = ({ isEdit, location, onHandleLocation }) => {
  const [locateName, setLocateName] = useState('');
  const [locateCoords, setLocateCoords] = useState([0, 0]);
  const [searchWord, setSearchWord] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [isChanged, setIsChanged] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const mapRef = useRef();
  const searchListRef = useRef();
  const paginationRef = useRef();

  const onSearchReset = useCallback(() => {
    setSearchWord('');
    setSearchPlace('');
    setIsSearch(false);
    searchListRef.current.scrollTo(0, 0);
    searchListRef.current.innerHTML = '';
    paginationRef.current.innerHTML = '';
    paginationRef.current.className = '';
  }, []);

  const onLocateNameChange = useCallback(
    (e) => {
      const { value } = e.target;

      setLocateName(value);

      if (location.name !== value) {
        setIsChanged(true);
      } else {
        setIsChanged(false);
      }
    },
    [location],
  );

  const onLocationChange = useCallback(
    (e) => {
      e.preventDefault();

      if (isChanged && locateName === '') {
        alert('모임 장소의 이름을 입력해주세요');
      } else if (isChanged) {
        onHandleLocation(locateName, locateCoords);
        onSearchReset();
        setIsChanged(false);
      }
    },
    [locateName, locateCoords, isChanged],
  );

  const onHandleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setSearchPlace(searchWord);
    },
    [searchWord],
  );

  const onSearchChange = useCallback((e) => {
    setSearchWord(e.target.value);
  }, []);

  const createMap = useCallback(() => {
    mapRef.current.innerHTML = '';

    const {
      coordinate: { _latitude, _longitude },
    } = location;

    let overlay = null;
    let selectedOverlay = null;
    let selectedMarker = null;
    let searchMarkers = [];
    let options = {
      center: new kakao.maps.LatLng(_latitude, _longitude),
      level: 3,
    };

    const map = new kakao.maps.Map(mapRef.current, options);
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(_latitude, _longitude),
      zIndex: 10,
    });
    const geocoder = new kakao.maps.services.Geocoder();
    const ps = new kakao.maps.services.Places();

    marker.setMap(map);
    selectedMarker = marker;

    // 마우스 오버한 좌표의 overlay 가져오기
    const overlayDetailAddrFromCoords = (coords, title) => {
      const content = `<div class="overlay"><p class="title">${title}</p></div>`;

      overlay = new kakao.maps.CustomOverlay({
        map,
        position: new kakao.maps.LatLng(coords.getLat(), coords.getLng()),
        content,
        yAnchor: 2.5,
        zIndex: 15,
      });
    };

    overlayDetailAddrFromCoords(marker.getPosition());
    overlay.setMap(null);

    // 좌표로 클릭한 주소정보 가져오기
    const selectedDetailAddrFromCoords = (coords) => {
      geocoder.coord2Address(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            let address = !!result[0].road_address
              ? result[0].road_address.address_name
              : result[0].address.address_name;

            const content = `<div class="selectedOverlay"><p class="address">${address}</p></div>`;

            selectedOverlay = new kakao.maps.CustomOverlay({
              map,
              position: new kakao.maps.LatLng(coords.getLat(), coords.getLng()),
              content,
              yAnchor: 2.3,
              zIndex: 1,
            });
          }
        },
      );
    };

    selectedDetailAddrFromCoords(marker.getPosition());

    if (isEdit) {
      kakao.maps.event.addListener(map, 'click', (e) => {
        const { latLng } = e;

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latLng);
        marker.setMap(map);

        selectedOverlay.setMap(null);
        selectedDetailAddrFromCoords(marker.getPosition());

        setLocateCoords([latLng.getLat(), latLng.getLng()]);
        setLocateName('');
        setIsChanged(true);
      });
    }

    // 검색 결과 마커 추가
    const addMarker = (position, idx, title) => {
      const normalImageSize = new kakao.maps.Size(29, 50); // 마커 이미지의 크기
      const normalImageOptions = {
        spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(89, idx * 50), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(15, 36), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };
      const normalImage = new kakao.maps.MarkerImage(
        markerNormal,
        normalImageSize,
        normalImageOptions,
      );
      const overImageSize = new kakao.maps.Size(39, 60); // 마커 이미지의 크기
      const overImageOptions = {
        spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(122, idx * 60), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(16, 48), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      };
      const overImage = new kakao.maps.MarkerImage(
        markerNormal,
        overImageSize,
        overImageOptions,
      );
      const searchMarker = new kakao.maps.Marker({
        position, // 마커의 위치
        image: normalImage,
        zIndex: 0,
      });

      searchMarker.setMap(map); // 지도 위에 마커를 표출합니다
      searchMarkers.push(searchMarker); // 배열에 생성된 마커를 추가합니다

      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(searchMarker, 'mouseover', function () {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (
          !isEqual(selectedMarker.getPosition(), searchMarker.getPosition())
        ) {
          searchMarker.setImage(overImage);
          searchMarker.setZIndex(20);
          overlayDetailAddrFromCoords(searchMarker.getPosition(), title);
        }
      });

      // 마커에 mouseover 이벤트를 등록합니다
      kakao.maps.event.addListener(searchMarker, 'mouseout', function () {
        // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
        // 마커의 이미지를 오버 이미지로 변경합니다
        if (selectedMarker !== searchMarker) {
          searchMarker.setImage(normalImage);
          searchMarker.setZIndex(0);
          overlay.setMap(null);
        }
      });

      kakao.maps.event.addListener(searchMarker, 'click', function () {
        searchMarker.setZIndex(0);
        searchMarker.setImage(normalImage);

        const latLng = searchMarker.getPosition();
        const {
          coordinate: { _latitude, _longitude },
        } = location;

        if (
          !isEqual(_latitude, latLng.getLat()) &&
          !isEqual(_longitude, latLng.getLng())
        ) {
          setIsChanged(true);
        } else {
          setIsChanged(false);
        }

        // 마커 위치를 클릭한 위치로 옮깁니다
        marker.setPosition(latLng);
        marker.setMap(map);

        overlay.setMap(null);
        selectedOverlay.setMap(null);
        selectedDetailAddrFromCoords(latLng);

        setLocateCoords([latLng.getLat(), latLng.getLng()]);
        setLocateName(title);

        selectedMarker = searchMarker;
      });

      return searchMarker;
    };

    // 검색 결과 마커 삭제
    const removeMarker = () => {
      for (let i = 0; i < searchMarkers.length; i++) {
        searchMarkers[i].setMap(null);
      }
      searchMarkers = [];
    };

    // 검색 결과 아이템
    const getListItem = (index, places) => {
      const { place_name, road_address_name, address_name, phone } = places;

      let el = document.createElement('li');
      let itemStr = `<span class="marker">${index + 1}</span>
        <div class="info">
          <span class="title">${place_name}</span>
          <span class="address">
            ${
              road_address_name &&
              `<span class="road">${road_address_name}</span>`
            }
            <span class="jibun">${address_name}</span>
            <span class="tel">${phone}</span>
          </span
        </div>`;

      el.innerHTML = itemStr;

      return el;
    };

    // 검색결과 목록 하단에 페이지 번호 표시
    const displayPagination = (pagination) => {
      const fragment = document.createDocumentFragment();

      // 기존에 추가된 페이지 번호 삭제
      paginationRef.current.innerHTML = '';

      if (pagination.last > 1) {
        for (let i = 1; i <= pagination.last; i++) {
          let el = document.createElement('button');
          el.type = 'button';
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = 'on';
          } else {
            el.onclick = (function (i) {
              return function () {
                removeMarker();
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        searchListRef.current.scrollTo(0, 0);
        paginationRef.current.className = 'pagination';
        paginationRef.current.appendChild(fragment);
      } else {
        paginationRef.current.className = '';
      }
    };

    const placesSearchCB = (data, status, pagination) => {
      if (isEdit && status === kakao.maps.services.Status.OK) {
        searchListRef.current.innerHTML = '';

        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          const normalImageSize = new kakao.maps.Size(29, 50); // 마커 이미지의 크기
          const normalImageOptions = {
            spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(89, i * 50), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(15, 36), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };
          const normalImage = new kakao.maps.MarkerImage(
            markerNormal,
            normalImageSize,
            normalImageOptions,
          );
          const overImageSize = new kakao.maps.Size(39, 60); // 마커 이미지의 크기
          const overImageOptions = {
            spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
            spriteOrigin: new kakao.maps.Point(122, i * 60), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new kakao.maps.Point(16, 48), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
          };
          const overImage = new kakao.maps.MarkerImage(
            markerNormal,
            overImageSize,
            overImageOptions,
          );

          const placePosition = new kakao.maps.LatLng(data[i].y, data[i].x);
          const placeMarker = addMarker(placePosition, i, data[i].place_name);
          const itemEl = getListItem(i, data[i]);

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

          // 마커와 검색결과 항목에 mouseover 했을때
          // 해당 장소에 인포윈도우에 장소명을 표시합니다
          // mouseout 했을 때는 인포윈도우를 닫습니다
          ((placeMarker, title) => {
            itemEl.onmouseover = () => {
              if (
                !isEqual(
                  selectedMarker.getPosition(),
                  placeMarker.getPosition(),
                )
              ) {
                placeMarker.setZIndex(20);
                placeMarker.setImage(overImage);
                overlayDetailAddrFromCoords(placeMarker.getPosition(), title);
              }
            };

            itemEl.onmouseout = () => {
              placeMarker.setZIndex(0);
              placeMarker.setImage(normalImage);
              overlay.setMap(null);
            };

            itemEl.onclick = () => {
              placeMarker.setZIndex(0);
              placeMarker.setImage(normalImage);

              const latLng = placeMarker.getPosition();
              const {
                coordinate: { _latitude, _longitude },
              } = location;

              if (
                !isEqual(_latitude, latLng.getLat()) ||
                !isEqual(_longitude, latLng.getLng())
              ) {
                setIsChanged(true);
              } else {
                setIsChanged(false);
              }

              // 마커 위치를 클릭한 위치로 옮깁니다
              marker.setPosition(latLng);
              marker.setMap(map);

              overlay.setMap(null);
              selectedOverlay.setMap(null);
              selectedDetailAddrFromCoords(latLng);

              setLocateCoords([latLng.getLat(), latLng.getLng()]);
              setLocateName(data[i].place_name);

              if (!isEqual(marker.getPosition(), placeMarker.getPosition())) {
                setIsChanged(true);
              }

              selectedMarker = placeMarker;
            };
          })(placeMarker, data[i].place_name);

          searchListRef.current.appendChild(itemEl);
        }
        map.setBounds(bounds);
        displayPagination(pagination);
        setIsSearch(true);
      }
    };

    // 키워드로 주소 검색
    ps.keywordSearch(searchPlace, placesSearchCB);
  }, [isEdit, location, searchPlace]);

  useEffect(() => {
    const { name, coordinate } = location;

    setLocateName(name);
    setLocateCoords([coordinate._latitude, coordinate._longitude]);

    if (!isEdit) {
      onSearchReset();
    }

    createMap();
  }, [isEdit, location, searchPlace]);

  return (
    <MoimDetailMapWrap>
      <div ref={mapRef} className="mapArea"></div>
      <div className="locationWrap">
        <div className="locationInner">
          <div className="locationBox">
            <MoimDetailMapForm
              onSubmit={onLocationChange}
              isEdit={isEdit}
              isActive={isChanged}
            >
              <span>
                <input
                  type="text"
                  value={locateName}
                  className="locationName"
                  placeholder="모임 장소의 이름을 입력해주세요"
                  size="15"
                  onChange={onLocateNameChange}
                  disabled={!isEdit}
                />
                {isEdit && (
                  <button type="submit" className="btnChange">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </button>
                )}
              </span>
            </MoimDetailMapForm>
            {isEdit && (
              <MoimDetailMapForm
                onSubmit={onHandleSearch}
                isActive={!isEmpty(searchWord)}
              >
                <span>
                  <input
                    type="text"
                    value={searchWord}
                    placeholder="모임 장소를 검색해주세요"
                    size="15"
                    onChange={onSearchChange}
                  />
                  <button type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </span>
              </MoimDetailMapForm>
            )}
          </div>
          <div className={`${isEdit && isSearch && 'searchList'}`}>
            <ul ref={searchListRef}></ul>
            <div ref={paginationRef}></div>
          </div>
        </div>
      </div>
    </MoimDetailMapWrap>
  );
};

export default MoimDetailMap;
