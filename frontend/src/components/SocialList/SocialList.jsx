import React from 'react';
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
    name: 'kakao',
    icon: icon.kakao,
    bgColor: iconBg.kakao,
  },
  {
    name: 'facebook',
    icon: icon.facebook,
    bgColor: iconBg.facebook,
  },
  {
    name: 'naver',
    icon: icon.naver,
    bgColor: iconBg.naver,
  },
];

const SocialList = () => {
  return (
    <SocialListWrap>
      {socials.map((item, index) => (
        <SocialItem key={index} bgColor={item.bgColor}>
          <a href="#">
            <img src={item.icon} />
          </a>
        </SocialItem>
      ))}
    </SocialListWrap>
  );
};

export default SocialList;
