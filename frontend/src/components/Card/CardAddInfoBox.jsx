import React, { memo } from 'react';
import { isUndefined } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTag } from '@fortawesome/free-solid-svg-icons';
import TagList from '../TagList';
import { CardAddInfoBoxWrap } from './style';

const CardAddInfoBox = memo(({ now, max, tags }) => {
  return (
    <CardAddInfoBoxWrap>
      {!isUndefined(now) && (
        <div className="contentWrap">
          <div className="contentHead">
            <span className="iconBox">
              <FontAwesomeIcon className="icon" icon={faUser} />
            </span>
            <span className="title">members</span>
          </div>
          <div className="contentBody">
            <span className="memberCount">
              <span className="now">{now}</span>
              {` / `}
              <span className="max">{max}</span>
            </span>
          </div>
        </div>
      )}
      <div className="contentWrap">
        <div className="contentHead">
          <span className="iconBox">
            <FontAwesomeIcon className="icon" icon={faTag} />
          </span>
          <span className="title">tags</span>
        </div>
        <div className="contentBody">
          <TagList list={tags} />
        </div>
      </div>
    </CardAddInfoBoxWrap>
  );
});

export default CardAddInfoBox;
