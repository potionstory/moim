import {
  faDiceD6,
  faLock,
  faPlug,
  faSpinner,
  faSortAlphaUp,
  faCalendarDay,
  faImage,
  faAlignLeft,
  faMapMarkerAlt,
  faClock,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';
import icon from './icons';
import { iconBg } from './styles/palette';

// moim header util menu icon
export const utilTabMenu = {
  filter: [
    [faDiceD6, faLock], // community
    [faPlug, faSpinner], // meeting
  ],
  sort: [faSortAlphaUp, faCalendarDay],
};

// moim list card tab menu icon
export const cardTabMenu = {
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
    ]
  ],
  sort: [
    [
      {
        name: 'title',
        type: 'radio',
        isChecked: false,
      }
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
      }
    ],
  ],
};