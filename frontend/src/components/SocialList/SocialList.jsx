import React from 'react';
import map from 'lodash/map';
import icon from '../../lib/icons';
import { iconBg } from '../../lib/styles/palette';
import { SocialListWrap, SocialItem } from './style';

const socials = [
  {
    name: 'google',
    icon: icon.google,
    bgColor: iconBg.google,
  },
  {
    name: 'facebook',
    icon: icon.facebook,
    bgColor: iconBg.facebook,
  },
  {
    name: 'kakao',
    icon: icon.kakao,
    bgColor: iconBg.kakao,
  },
  {
    name: 'naver',
    icon: icon.naver,
    bgColor: iconBg.naver,
  },
];

const SocialList = ({ onSocialSign }) => {
  return (
    <SocialListWrap>
      {map(socials, (item, index) => (
        <SocialItem key={index} bgColor={item.bgColor}>
          <button type="button" onClick={onSocialSign}>
            <img src={item.icon} />
          </button>
        </SocialItem>
      ))}
    </SocialListWrap>
  );
};

export default SocialList;
