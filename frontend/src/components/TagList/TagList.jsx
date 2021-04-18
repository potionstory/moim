import React from 'react';
import map from 'lodash/map';
import { TagListWrap } from './style';

const TagList = ({ list }) => {
  return (
    <TagListWrap>
      {map(list, (item, index) => {
        return (
          <li key={index}>
            <button type="button">{item}</button>
          </li>
        );
      })}
    </TagListWrap>
  );
};

export default TagList;
