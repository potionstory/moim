import React, { useCallback, useMemo } from 'react';
import CardMainImageBox from './CardMainImageBox';
import CardDescriptionBox from './CardDescriptionBox';
import CardUrlBox from './CardUrlBox';
import CardAddInfoBox from './CardAddInfoBox';
import { CardTabBoxWrap } from './style';

const CardCommunity = ({ item, activeIndex, onHandleDetail }) => {
  const {
    communityId,
    userId,
    isLock,
    mainImage,
    description,
    url,
    tags,
  } = item;

  const onUrlCopy = useCallback(() => {
    navigator.clipboard.writeText(url);
  }, [url]);

  const cardTabBoxSwitch = useMemo(() => {
    switch (activeIndex) {
      case 0:
        return (
          <CardMainImageBox
            id={communityId}
            userId={userId}
            isLock={isLock}
            mainImage={mainImage}
            onHandleDetail={onHandleDetail}
          />
        );
      case 1:
        return (
          <CardDescriptionBox
            id={communityId}
            userId={userId}
            isLock={isLock}
            description={description}
            onHandleDetail={onHandleDetail}
          />
        );
      case 2:
        return <CardUrlBox url={url} onUrlCopy={onUrlCopy} />;
      case 3:
        return <CardAddInfoBox tags={tags} />;
      default:
        return false;
    }
  }, [item, activeIndex, onHandleDetail]);

  return (
    <CardTabBoxWrap>
      <div className="cardTabBox">{cardTabBoxSwitch}</div>
    </CardTabBoxWrap>
  );
};

export default CardCommunity;
