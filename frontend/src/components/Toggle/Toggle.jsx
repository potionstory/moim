import React from 'react';
import { motion } from 'framer-motion';
import { ToggleWrap } from './style';

const Toggle = ({ name, isChecked, onCheck }) => {
  return (
    <ToggleWrap isChecked={isChecked}>
      <label>
        <input type="checkbox" checked={isChecked} onChange={onCheck} />
        <div className="toggleBar">
          <motion.div
            className="activeBar"
            initial={{ x: (isChecked === true ? 1 : 0) * 16 }}
            animate={{ x: (isChecked === true ? 1 : 0) * 16 }}
            transition={{
              ease: 'backInOut',
            }}
          />
        </div>
        {name}
      </label>
    </ToggleWrap>
  );
};

export default Toggle;
