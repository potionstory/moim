import React from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UtilBody, UtilTabMenuWrap, UtilTabMenu, UtilTabContentWarp, UtilTabContentBlock, UtilTabContentInner } from './style';

const MoimHeaderUtilBodyComp = ({ menu, activeIndex, onUtilTabClick }) => {
  return (
    <UtilBody>
      <UtilTabMenuWrap>
        <UtilTabMenu activeIndex={activeIndex + 1}>
          <motion.div
            className="activeBox"
            animate={{ y: activeIndex * 40 }}
            transition={{
              ease: 'backInOut',
            }}
          />
          <ul>
            {map(menu, (item, index) => (
              <li key={index}>
                <button type="button" onClick={() => onUtilTabClick(index)}>
                  <FontAwesomeIcon icon={item} />
                </button>
              </li>
            ))}
          </ul>
        </UtilTabMenu>
      </UtilTabMenuWrap>
      <UtilTabContentWarp>
        <UtilTabContentBlock>
          <UtilTabContentInner activeIndex={activeIndex + 1}>
            <div className="utilTabBox">
              Tab1
            </div>
            <div className="utilTabBox">
              Tab2
            </div>
            <div className="utilTabBox">
              Tab3
            </div>
          </UtilTabContentInner>
        </UtilTabContentBlock>
      </UtilTabContentWarp>
    </UtilBody>
  );
};

export default MoimHeaderUtilBodyComp;