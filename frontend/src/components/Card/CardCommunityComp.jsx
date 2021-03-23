import React from 'react';
import { CardImage, CardText, CardLink, CardMore } from './style';

const CardCommunityComp = ({ item }) => {
  const { mainImage, text, url, tags } = item;

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
          <a href={url} target="_blank">{url}</a>
        </CardLink>
      </div>
      <div className="cardTabBox">
        <CardMore>{tags}</CardMore>
      </div>
    </>
  );
};

export default CardCommunityComp;
