import React, { useState, useCallback } from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { cardTabMenu } from '../../lib/const';
import CardCommunity from './CardCommunity';
import CardMeeting from './CardMeeting';
import { CardBodyWrap, CardTabMenu, CardTabContentWrap } from './style';

const CardBody = ({ item, category }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onTabClick = useCallback((index) => {
    setTabIndex(index);
  }, []);

  return (
    <CardBodyWrap>
      <div className="cardBodyInner">
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
      </div>
      <CardTabContentWrap>
        <div className="cardTabBlock">
          {category === 'community' ? (
            <CardCommunity item={item} activeIndex={tabIndex} />
          ) : (
            <CardMeeting item={item} activeIndex={tabIndex} />
          )}
        </div>
      </CardTabContentWrap>
    </CardBodyWrap>
  );
};

export default CardBody;
