import React, { useState, useCallback } from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cardTabMenu } from '../../lib/const';
import CardCommunityComp from './CardCommunityComp';
import CardMeetingComp from './CardMeetingComp';
import {
  CardTabMenuWrap,
  CardTabMenu,
  CardTabContentWrap,
  CardTabContentBlock,
  CardTabContentInner,
} from './style';

const CardTabComp = ({ item, category }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  return (
    <>
      <CardTabMenuWrap>
        <CardTabMenu activeIndex={tabIndex}>
          <motion.div
            className="activeBar"
            animate={{ y: tabIndex * 40 }}
            transition={{
              ease: 'backInOut',
            }}
          />
          <ul>
            {map(cardTabMenu[category], (menu, index) => (
              <li key={index}>
                <button type="button" onClick={() => onTabClick(index)}>
                  <FontAwesomeIcon icon={menu} />
                </button>
              </li>
            ))}
          </ul>
        </CardTabMenu>
      </CardTabMenuWrap>
      <CardTabContentWrap>
        <CardTabContentBlock>
          <CardTabContentInner activeIndex={tabIndex}>
            {category === 'community' ? (
              <CardCommunityComp item={item} />
            ) : (
              <CardMeetingComp item={item} activeIndex={tabIndex} />
            )}
          </CardTabContentInner>
        </CardTabContentBlock>
      </CardTabContentWrap>
    </>
  );
};

export default CardTabComp;
