import React from 'react';
import isUndefined from 'lodash/isUndefined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTag } from '@fortawesome/free-solid-svg-icons';
import TagList from '../TagList';
import { CardAddInfoBoxWrap } from './style';

const CardAddInfoBox = ({ number, tags }) => {
  return (
    <CardAddInfoBoxWrap>
      {!isUndefined(number) && (
        <div className="contentWrap">
          <div className="contentHead">
            <span className="iconBox">
              <FontAwesomeIcon className="icon" icon={faUser} />
            </span>
            <span className="title">members</span>
          </div>
          <div className="contentBody">
            <span className="memberCount">
              <span className="now">10</span>
              {` / `}
              <span className="max">30</span>
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
};

export default CardAddInfoBox;