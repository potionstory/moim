import React, { useState, useRef, useCallback, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { MoimDetailMapWrap } from './style';

const { kakao } = window;

const MoimDetailMap = ({ location, onHandleLocation }) => {
  const [locateCoords, setLocateCoords] = useState([0, 0]);




  const [place, setPlace] = useState([37.56292028474936, 126.96727831458435]);
  const [searchWord, setSearchWord] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [searchList, setSearchList] = useState([]);
  const mapRef = useRef();
  const searchListRef = useRef();
  const paginationRef = useRef();

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

  const onLocationChange = useCallback(() => {
    onHandleLocation(locateCoords);
  }, [locateCoords]);

  const createMap = useCallback(() => {
    mapRef.current.innerHTML = '';

    let overlay = null;
    let options = {
      center: new kakao.maps.LatLng(location._latitude, location._longitude),
      level: 3,
    }
    const map = new kakao.maps.Map(mapRef.current, options)
    const marker = new kakao.maps.Marker({ position: map.getCenter() });
    const geocoder = new kakao.maps.services.Geocoder();

    marker.setMap(map);

    // 좌표로 주소정보 가져오기
    const searchDetailAddrFromCoords = (coords) => {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          console.log(result[0].place_name);
          let detailAddr = !!result[0].road_address
            ? '<div className="dddddd" class="bbbbbbb">도로명주소 : ' +
              result[0].road_address.address_name +
              '</div>'
            : '';
          detailAddr +=
            '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
      
          const content =  `<div class="customoverlay">
                            <span class="overlayInner">
                              <span class="title">${detailAddr}</span>
                            </span>
                          </div>`;

          overlay = new kakao.maps.CustomOverlay({
            map,
            position: new kakao.maps.LatLng(coords.getLat(), coords.getLng()),
            content,
            clickable: true,
            yAnchor: 1 
          });
        }
      });
    }

    searchDetailAddrFromCoords(marker.getPosition());

    kakao.maps.event.addListener(map, 'click', (e) => {
      const { latLng } = e; 
      
      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latLng);
      marker.setMap(map);

      overlay.setMap(null);
      searchDetailAddrFromCoords(marker.getPosition());

      setLocateCoords([latLng.getLat(), latLng.getLng()]);
    });
  }, [location._latitude]);

  const createmarker = useCallback(() => {
    const tempArr = []
    locationArr.forEach(e => {
      tempArr.push(
        new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(e.mapY, e.mapX),
        })
      )
    })
    setMarkerArr(tempArr)
  }, []);

  useEffect(() => {
    createMap();
    setLocateCoords([location._latitude, location._longitude]);
  }, [location]);

  console.log("locateCoords: ", locateCoords);

  // useEffect(() => {
  //   mapRef.current.innerHTML = '';

  //   const options = {
  //     center: new kakao.maps.LatLng(place[0], place[1]),
  //     level: 3,
  //   };
  //   const map = new kakao.maps.Map(mapRef.current, options);
  //   const location = new kakao.maps.Marker({ position: map.getCenter() });
  //   const ps = new kakao.maps.services.Places();
  //   const geocoder = new kakao.maps.services.Geocoder();
    
  //   let selectedMarker = null;

  //   let markers = [];

  //   location.setMap(map);

  //   ps.keywordSearch(searchPlace, placesSearchCB);

  //   kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
  
  //     // 클릭한 위도, 경도 정보를 가져옵니다 
  //     var latlng = mouseEvent.latLng; 
      
  //     // 마커 위치를 클릭한 위치로 옮깁니다
  //     location.setPosition(latlng);
  //     location.setMap(map);

  //     setPlace([latlng.getLat(), latlng.getLng()]);
      
  //     var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
  //     message += '경도는 ' + latlng.getLng() + ' 입니다';
      
  //     console.log('message: ', message);
      
  //   });

  //   function placesSearchCB(data, status, pagination) {
  //     if (status === kakao.maps.services.Status.OK) {
  //       let bounds = new kakao.maps.LatLngBounds();

  //       for (let i = 0; i < data.length; i++) {
  //         // displayMarker(data[i]);
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));

  //         var placePosition = new kakao.maps.LatLng(data[i].y, data[i].x),
  //           marker = addMarker(placePosition, i);
  //       }
  //       map.setBounds(bounds);
  //       displayPagination(pagination);
  //       setSearchList(data);
  //     }
  //   }

  //   // 검색결과 목록 하단에 페이지 번호 표시
  //   function displayPagination(pagination) {
  //     const fragment = document.createDocumentFragment();

  //     // 기존에 추가된 페이지 번호 삭제
  //     while (paginationRef.current.hasChildNodes()) {
  //       paginationRef.current.removeChild(paginationRef.current.lastChild);
  //     }

  //     if (pagination.last > 1) {
  //       for (let i = 1; i <= pagination.last; i++) {
  //         let el = document.createElement('button');
  //         el.type = 'button';
  //         el.innerHTML = i;

  //         if (i === pagination.current) {
  //           el.className = 'on';
  //         } else {
  //           el.onclick = (function (i) {
  //             return function () {
  //               removeMarker();
  //               pagination.gotoPage(i);
  //             };
  //           })(i);
  //         }

  //         fragment.appendChild(el);
  //       }
  //       searchListRef.current.scrollTo(0, 0);
  //       paginationRef.current.className = 'pagination';
  //       paginationRef.current.appendChild(fragment);
  //     } else {
  //       paginationRef.current.className = '';
  //     }
  //   }

  //   function addMarker(position, idx) {
  //     const imageSrc =
  //         'http://t1.daumcdn.net/localimg/localimages/07/2018/pc/img/marker_normal.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
  //       normalImageSize = new kakao.maps.Size(29, 50), // 마커 이미지의 크기
  //       normalImageOptions = {
  //         spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
  //         spriteOrigin: new kakao.maps.Point(89, idx * 50), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //         offset: new kakao.maps.Point(15, 36), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       normalImage = new kakao.maps.MarkerImage(
  //         imageSrc,
  //         normalImageSize,
  //         normalImageOptions,
  //       ),
  //       overImageSize = new kakao.maps.Size(39, 60), // 마커 이미지의 크기
  //       overImageOptions = {
  //         spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
  //         spriteOrigin: new kakao.maps.Point(242, idx * 60), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //         offset: new kakao.maps.Point(16, 48), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       overImage = new kakao.maps.MarkerImage(
  //         imageSrc,
  //         overImageSize,
  //         overImageOptions,
  //       ),
  //       clickImageSize = new kakao.maps.Size(39, 60), // 마커 이미지의 크기
  //       clickImageOptions = {
  //         spriteSize: new kakao.maps.Size(276, 891), // 스프라이트 이미지의 크기
  //         spriteOrigin: new kakao.maps.Point(122, idx * 60), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
  //         offset: new kakao.maps.Point(16, 48), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
  //       },
  //       clickImage = new kakao.maps.MarkerImage(
  //         imageSrc,
  //         clickImageSize,
  //         clickImageOptions,
  //       ),
  //       marker = new kakao.maps.Marker({
  //         position, // 마커의 위치
  //         image: normalImage,
  //       });

  //     marker.setMap(map); // 지도 위에 마커를 표출합니다
  //     markers.push(marker); // 배열에 생성된 마커를 추가합니다

  //     // 마커에 mouseover 이벤트를 등록합니다
  //     kakao.maps.event.addListener(marker, 'mouseover', function () {
  //       // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
  //       // 마커의 이미지를 오버 이미지로 변경합니다
  //       if (!selectedMarker || selectedMarker !== marker) {
  //         marker.setImage(overImage);
  //       }
  //     });

  //     // 마커에 mouseover 이벤트를 등록합니다
  //     kakao.maps.event.addListener(marker, 'mouseout', function () {
  //       // 클릭된 마커가 없고, mouseover된 마커가 클릭된 마커가 아니면
  //       // 마커의 이미지를 오버 이미지로 변경합니다
  //       if (!selectedMarker || selectedMarker !== marker) {
  //         marker.setImage(normalImage);
  //       }
  //     });

  //     kakao.maps.event.addListener(marker, 'click', function () {
  //       // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
  //       // 마커의 이미지를 클릭 이미지로 변경합니다
  //       if (!selectedMarker || selectedMarker !== marker) {
  //         // 클릭된 마커 객체가 null이 아니면
  //         // 클릭된 마커의 이미지를 기본 이미지로 변경하고
  //         !!selectedMarker &&
  //           selectedMarker.setImage(selectedMarker.normalImage);

  //         // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
  //         marker.setImage(clickImage);
  //       }
  //       // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
  //       selectedMarker = marker;

  //       function searchDetailAddrFromCoords(coords, callback) {
  //         // 좌표로 법정동 상세 주소 정보를 요청합니다
  //         geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  //       }

  //       searchDetailAddrFromCoords(marker.getPosition(), function (
  //         result,
  //         status,
  //       ) {
  //         if (status === kakao.maps.services.Status.OK) {
  //           var detailAddr = !!result[0].road_address
  //             ? '<div>도로명주소 : ' +
  //               result[0].road_address.address_name +
  //               '</div>'
  //             : '';
  //           detailAddr +=
  //             '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

  //           var content =
  //             '<div class="bAddr">' +
  //             '<span class="title">법정동 주소정보</span>' +
  //             detailAddr +
  //             '</div>';
  //           console.log(detailAddr);
  //         }
  //       });
  //     });
  //     return marker;
  //   }

  //   function removeMarker() {
  //     for (var i = 0; i < markers.length; i++) {
  //       markers[i].setMap(null);
  //     }
  //     markers = [];
  //   }
  // }, [searchPlace]);

  return (
    <MoimDetailMapWrap isSearch={isEmpty(searchList)}>
      <div ref={mapRef} className="mapArea"></div>
      <div className="searchWrap">
        <div className="searchInner">
          <div className="searchBox">
            <form onSubmit={onHandleSearch}>
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
            </form>
          </div>
          <div className={`${!isEmpty(searchList) && 'searchList'}`}>
            <ul ref={searchListRef}>
              {searchList.map((item, index) => (
                <li key={index}>
                  <span className="marker">{index + 1}</span>
                  <div className="info">
                    <span className="title">{item.place_name}</span>
                    <div className="address">
                      {item.road_address_name && (
                        <span className="road">{item.road_address_name}</span>
                      )}
                      <span className="jibun">{item.address_name}</span>
                    </div>
                    <span className="tel">{item.phone}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div ref={paginationRef}></div>
          </div>
        </div>
      </div>
      <button type="button" className="btnLocation" onClick={onLocationChange}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </button>
    </MoimDetailMapWrap>
  );
};

export default MoimDetailMap;
