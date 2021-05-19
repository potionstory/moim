import React, { useState, useCallback } from 'react';
import map from 'lodash/map';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SelectBoxWrap } from './style';

const SelectBox = ({ defaultValue, value, list, onSelectChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenHandle = useCallback(() => {
    setIsOpen((isOpen) => !isOpen);
  }, []);

  const onHandleClick = useCallback((id) => {
    setIsOpen((isOpen) => !isOpen);
    onSelectChange(id);
  }, []);

  const isScroll = list.length * 41 - 1 > 4 * 41 - 1;

  return (
    <SelectBoxWrap isScroll={isScroll} isValue={value}>
      <div className="selected">
        <span className="item">{value || defaultValue}</span>
        <button type="button" onClick={onOpenHandle}>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{
              ease: 'backInOut',
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </motion.span>
        </button>
      </div>
      <motion.ul
        animate={{
          height: isOpen ? (isScroll ? 4 * 41 - 1 : list.length * 41 - 1) : 0,
        }}
        transition={{
          ease: 'backInOut',
        }}
      >
        {map(list, (item) => {
          const { id, name } = item;

          return (
            <li key={id}>
              <button type="button" onClick={() => onHandleClick(id)}>
                {name}
              </button>
            </li>
          );
        })}
      </motion.ul>
    </SelectBoxWrap>
  );
};

export default SelectBox;
