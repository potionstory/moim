import React, { memo } from 'react';
import { map } from 'lodash';
import { socials } from '../../lib/const';
import { SocialListWrap, SocialItem } from './style';

const SocialList = memo(({ onSocialSign }) => {
  return (
    <SocialListWrap>
      {map(socials, (item, index) => (
        <SocialItem key={index} bgColor={item.bgColor}>
          <button type="button" onClick={() => onSocialSign(item.name)}>
            <img src={item.icon} />
          </button>
        </SocialItem>
      ))}
    </SocialListWrap>
  );
});

export default SocialList;
