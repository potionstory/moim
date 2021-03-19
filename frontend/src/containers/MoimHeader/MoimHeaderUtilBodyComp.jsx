import React from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBox from '../../components/CheckBox';
import Toggle from '../../components/Toggle';
import { UtilBody, UtilTabMenuWrap, UtilTabMenu, UtilTabContentWarp, UtilTabContentBlock, UtilTabContentInner } from './style';

const MoimHeaderUtilBodyComp = ({ menu, cont, activeIndex, onTabClick, isVisible, onItemCheck }) => {

  return (
    <UtilBody isVisible={isVisible}>
      <UtilTabMenuWrap>
        <UtilTabMenu activeIndex={activeIndex + 1}>
          <motion.div
            className="activeBox"
            initial={{ y: activeIndex * 40 }}
            animate={{ y: activeIndex * 40 }}
            transition={{
              ease: 'backInOut',
            }}
          />
          <ul>
            {map(menu, (item, index) => (
              <li key={index}>
                <button type="button" onClick={() => onTabClick(index)}>
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
            {map(cont, (array, utilIndex) => (
              <div className="utilTabBox" key={utilIndex}>
                <ul>
                  {map(array, (item, itemIndex) => {
                    const { name, type, isChecked } = item;

                    return (
                      <li key={itemIndex}>
                        {type === "checkbox" && <CheckBox name={name} isChecked={isChecked} onCheck={() => onItemCheck(utilIndex, itemIndex)} />}
                        {type === "radio" && <Toggle index={itemIndex} name={name} isChecked={isChecked} onCheck={() => onItemCheck(utilIndex, itemIndex)} />}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </UtilTabContentInner>
        </UtilTabContentBlock>
      </UtilTabContentWarp>
    </UtilBody>
  );
};

export default MoimHeaderUtilBodyComp;