import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faAlignLeft,
  faMapMarkerAlt,
  faClock,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import {
  CardTabMenuWrap,
  CardTabMenu,
  CardTabContentWarp,
  CardTabContentBlock,
  CardTabContentInner,
  CardImage,
  CardText,
  CardMap,
  CardTime,
  CardMore,
} from './style';
import { temp } from '../../lib/images';

const tabList = [faImage, faAlignLeft, faMapMarkerAlt, faClock, faEllipsisH];

const CardTabComp = ({ tabIndex, onTabClick }) => {
  return (
    <>
      <CardTabMenuWrap>
        <CardTabMenu activeIndex={tabIndex + 1}>
          <motion.div
            className="activeBox"
            animate={{ top: tabIndex * 40 }}
            transition={{
              ease: 'backInOut',
            }}
          />
          <ul>
            {tabList.map((item, index) => (
              <li key={index}>
                <button type="button" onClick={() => onTabClick(index)}>
                  <FontAwesomeIcon icon={item} />
                </button>
              </li>
            ))}
          </ul>
        </CardTabMenu>
      </CardTabMenuWrap>
      <CardTabContentWarp>
        <CardTabContentBlock>
          <CardTabContentInner activeIndex={tabIndex + 1}>
            <div className="cardTabBox">
              <CardImage>
                <img src={temp} />
              </CardImage>
            </div>
            <div className="cardTabBox">
              <CardText>
                0123456789
                <br />
                가나다라마바사아자차카타파하
                <br />
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
              </CardText>
            </div>
            <div className="cardTabBox">
              <CardMap>카카오 지도 넣기</CardMap>
            </div>
            <div className="cardTabBox">
              <CardTime>
                모임 시간: 네모 블럭으로 넣기 모임 시간까지의 카운트는
                생각해보기(최적화 문제) 많은 카드들이 동시에 카운트가 되면
                느려질거 예상 (시작전/진행중/완료 상태 표시)
              </CardTime>
            </div>
            <div className="cardTabBox">
              <CardMore>
                기타 내용들 보여주기(바로가기 / 참여하기 등등)
              </CardMore>
            </div>
          </CardTabContentInner>
        </CardTabContentBlock>
      </CardTabContentWarp>
    </>
  );
};

export default CardTabComp;
