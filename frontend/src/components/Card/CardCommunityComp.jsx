import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faCopy,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import DropButton from '../DropButton';
import { CardImage, CardText, CardLink, CardMore } from './style';

const linkIcon = [faExternalLinkAlt, faCopy];

const CardCommunityComp = ({ item }) => {
  const { communityId, mainImage, text, url, tags } = item;

  const onNewTab = useCallback(() => {
    window.open(url);
  }, [url]);

  const onUrlCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
  }, [url]);

  return (
    <>
      <div className="cardTabBox">
        <CardImage>
          <Link to={`/detail/community/${communityId}`}>
            <img src={mainImage} />
          </Link>
        </CardImage>
      </div>
      <div className="cardTabBox">
        <CardText>{text}</CardText>
      </div>
      <div className="cardTabBox">
        <CardLink>
          <div className="linkBox">
            <a className="url" href={url} target="_blank">
              {url}
            </a>
            <DropButton menu={linkIcon} onHandle={[onNewTab, onUrlCopy]} />
          </div>
        </CardLink>
      </div>
      <div className="cardTabBox">
        <CardMore>
          <div className="contentWrap">
            <div className="contentHead">
              <span className="iconBox">
                <FontAwesomeIcon className="icon" icon={faTag} />
              </span>
              <span className="title">tags</span>
            </div>
            <div className="contentBody">
              <ul className="tagList">
                {map(tags, (item, index) => (
                  <li key={index}>
                    <button type="button">{item}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardMore>
      </div>
    </>
  );
};

export default CardCommunityComp;
