import {
  faImage,
  faAlignLeft,
  faMapMarkerAlt,
  faClock,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import icon from './icons';
import { iconBg } from './styles/palette';

// card tabmenu icon
export const tabMenu = {
  community: [faImage, faAlignLeft, faEllipsisH],
  meeting: [faImage, faAlignLeft, faClock, faMapMarkerAlt, faEllipsisH],
};

// social
export const socials = [
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
