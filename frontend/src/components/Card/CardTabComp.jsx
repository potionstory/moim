import React, { useState, useCallback } from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { tabMenu } from '../../lib/const';
import CardCommunityComp from './CardCommunityComp';
import CardMeetingComp from './CardMeetingComp';
import {
  CardTabMenuWrap,
  CardTabMenu,
  CardTabContentWarp,
  CardTabContentBlock,
  CardTabContentInner,
} from './style';

const CardTabComp = ({ image, text, category }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

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
            {map(tabMenu[category], (item, index) => (
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
            {category === 'community' ? (
              <CardCommunityComp image={image} text={text} />
            ) : (
              <CardMeetingComp image={image} text={text} />
            )}
          </CardTabContentInner>
        </CardTabContentBlock>
      </CardTabContentWarp>
    </>
  );
};

export default CardTabComp;
