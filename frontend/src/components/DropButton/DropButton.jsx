import React, { memo, useState, useCallback } from 'react';
import { map } from 'lodash';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DropButtonWrap } from './style';

const DropButton = memo(({ menu, onHandle }) => {
  const [isActive, setIsActive] = useState(false);

  const onToggle = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <DropButtonWrap isActive={isActive}>
      <motion.button
        className="dropButton"
        animate={{ rotate: isActive ? 45 : 0 }}
        transition={{
          ease: 'backInOut',
        }}
        onClick={onToggle}
      >
        <FontAwesomeIcon className="icon" icon={faPlus} />
      </motion.button>
      <ul className="dropMenu">
        {map(menu, (icon, index) => (
          <motion.li
            key={icon + index}
            animate={{ y: isActive ? (index + 1) * 45 : 0 }}
            transition={{
              ease: 'backInOut',
            }}
          >
            <button type="button" onClick={onHandle[index]}>
              <FontAwesomeIcon className="icon" icon={icon} />
            </button>
          </motion.li>
        ))}
      </ul>
    </DropButtonWrap>
  );
});

export default DropButton;
