import React from 'react';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { TagListWrap } from './style';

const TagList = ({ list, isEdit, onRemove }) => {
  return (
    <TagListWrap isEdit={isEdit}>
      {map(list, (item, index) => {
        return (
          <li key={index}>
            {!isEdit ? (
              <button type="button">{item}</button>
            ) : (
              <button type="button" onClick={() => onRemove(item)}>
                {item}
                {isEdit && (
                  <span>
                    <FontAwesomeIcon icon={faMinus} />
                  </span>
                )}
              </button>
            )}
          </li>
        );
      })}
    </TagListWrap>
  );
};

export default TagList;
