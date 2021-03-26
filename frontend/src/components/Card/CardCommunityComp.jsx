import React, { useCallback } from 'react';
import DropButton from '../DropButton';
import { CardImage, CardText, CardLink, CardMore } from './style';
import { faExternalLinkAlt, faCopy } from '@fortawesome/free-solid-svg-icons';

const linkIcon = [faExternalLinkAlt, faCopy];

const CardCommunityComp = ({ item }) => {
  const { mainImage, text, url, tags } = item;

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
          <img src={mainImage} />
        </CardImage>
      </div>
      <div className="cardTabBox">
        <CardText>{text}</CardText>
      </div>
      <div className="cardTabBox">
        <CardLink>
          <div className="linkBox">
            <a className="url" href={url} target="_blank">{url}</a>
            <DropButton menu={linkIcon} onHandle={[onNewTab, onUrlCopy]} />
          </div>
        </CardLink>
      </div>
      <div className="cardTabBox">
        <CardMore>{tags}</CardMore>
      </div>
    </>
  );
};

export default CardCommunityComp;
