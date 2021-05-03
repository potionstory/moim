import {
  faCommentAlt,
  faMugHot,
  faFilter,
  faSortAmountDown,
  faDiceD6,
  faLock,
  faPowerOff,
  faSpinner,
  faSortAlphaUp,
  faCalendarDay,
  faImage,
  faAlignLeft,
  faClock,
  faMapMarkerAlt,
  faUser,
  faLink,
  faEllipsisH,
  faWifi,
  faShoePrints,
  faSearchPlus,
  faExternalLinkAlt,
  faCopy,
} from '@fortawesome/free-solid-svg-icons';
import icon from './icons';
import { color, iconBg } from './styles/palette';

export const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const categoryTabMenu = [
  {
    icon: faCommentAlt,
    title: 'community',
  },
  {
    icon: faMugHot,
    title: 'meeting',
  },
];

export const utilMenu = [
  {
    icon: faFilter,
    title: 'filter',
  },
  {
    icon: faSortAmountDown,
    title: 'sort',
  },
];

// moim header util menu icon
export const utilTabMenu = {
  filter: [
    [faDiceD6, faLock], // community
    [faPowerOff, faSpinner], // meeting
  ],
  sort: [faSortAlphaUp, faCalendarDay],
};

// moim list card tab menu icon
export const cardTabMenu = {
  community: [faImage, faAlignLeft, faLink, faEllipsisH],
  meeting: [faImage, faAlignLeft, faClock, faMapMarkerAlt, faEllipsisH],
};

export const linkIcon = [faExternalLinkAlt, faCopy];

// community type
export const communityType = [
  {
    name: 'kakao',
    icon: icon.kakao,
  },
  {
    name: 'line',
    icon: icon.line,
  },
  {
    name: 'slack',
    icon: icon.slack,
  },
  {
    name: 'discord',
    icon: icon.discord,
  },
];

// meeting type
export const meetingType = [
  {
    name: 'online',
    icon: faWifi,
  },
  {
    name: 'offline',
    icon: faShoePrints,
  },
];

// community status
export const communityStatus = [
  {
    name: 'open',
    bgColor: color.blue,
  },
  {
    name: 'close',
    bgColor: color.gray,
  },
];

// meeting status
export const meetingStatus = [
  {
    name: 'empty',
    bgColor: color.blue,
  },
  {
    name: 'full',
    bgColor: color.red,
  },
  {
    name: 'proceeding',
    bgColor: color.green,
  },
  {
    name: 'complete',
    bgColor: color.gray,
  },
];

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

export const util = {
  filter: [
    [
      [
        {
          name: 'kakao',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'line',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'slack',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'discord',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'etc',
          type: 'checkbox',
          isChecked: false,
        },
      ],
      [
        {
          name: 'open',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'close',
          type: 'checkbox',
          isChecked: false,
        },
      ],
    ],
    [
      [
        {
          name: 'online',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'offline',
          type: 'checkbox',
          isChecked: false,
        },
      ],
      [
        {
          name: 'empty',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'full',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'proceeding',
          type: 'checkbox',
          isChecked: false,
        },
        {
          name: 'complete',
          type: 'checkbox',
          isChecked: false,
        },
      ],
    ],
  ],
  sort: [
    [
      {
        name: 'title',
        type: 'radio',
        isChecked: false,
      },
    ],
    [
      {
        name: 'start',
        type: 'radio',
        isChecked: false,
      },
      {
        name: 'create',
        type: 'radio',
        isChecked: false,
      },
    ],
  ],
};

// moim detail tab menu icon
export const detailTabMenu = {
  community: [faSearchPlus],
  meeting: [faSearchPlus, faClock, faMapMarkerAlt, faUser],
};
