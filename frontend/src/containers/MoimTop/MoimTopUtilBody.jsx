import React, { memo } from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CheckBox from '../../Components/CheckBox';
import Toggle from '../../Components/Toggle';
import {
  MoimTopUtilBodyWrap,
  MoimTopUtilTabMenu,
  MoimTopUtilTabBody,
} from './style';

const MoimTopUtilBody = memo(
  ({ menu, cont, activeIndex, onTabClick, isVisible, onItemCheck }) => {
    return (
      <MoimTopUtilBodyWrap isVisible={isVisible}>
        <div className="tabMemu">
          <MoimTopUtilTabMenu activeIndex={activeIndex + 1}>
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
          </MoimTopUtilTabMenu>
        </div>
        <MoimTopUtilTabBody activeIndex={activeIndex + 1}>
          <div className="tabBlock">
            <div className="tabInner">
              {map(cont, (array, utilIndex) => (
                <div className="tabBox" key={utilIndex}>
                  <ul>
                    {map(array, (item, itemIndex) => {
                      const { name, type, isChecked } = item;

                      return (
                        <li key={itemIndex}>
                          {type === 'checkbox' && (
                            <CheckBox
                              name={name}
                              isChecked={isChecked}
                              isInverse={true}
                              onCheck={() => onItemCheck(utilIndex, itemIndex)}
                            />
                          )}
                          {type === 'radio' && (
                            <Toggle
                              isTheme={false}
                              index={itemIndex}
                              name={name}
                              isChecked={isChecked}
                              onCheck={() => onItemCheck(utilIndex, itemIndex)}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </MoimTopUtilTabBody>
      </MoimTopUtilBodyWrap>
    );
  },
);

export default MoimTopUtilBody;
