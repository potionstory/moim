import React from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IconListWrap, IconButton } from './style';

const IconList = ({ list, checkIndex, isEdit, isIcon, onCheckChange }) => {
  return (
    <IconListWrap>
      <ul>
        {map(list, (item, index) => {
          const { name, icon } = item;
          const isChecked = checkIndex === index;

          if (isEdit || isChecked) {
            return (
              <li key={name}>
                {isEdit ? (
                  <IconButton type="button" isChecked={isChecked} isEdit={isEdit} onClick={() => onCheckChange(index)}>
                    {isIcon ? <FontAwesomeIcon icon={icon} /> : <img src={icon} />}
                    <span className="cover">
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  </IconButton>
                ) : (
                  <span className="icon">
                    {isIcon ? <FontAwesomeIcon icon={icon} /> : <img src={icon} />}
                  </span>
                )}
              </li>
            )
          }
        })}
      </ul>
    </IconListWrap>
  );
}

export default IconList;