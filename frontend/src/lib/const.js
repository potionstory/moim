import dayjs from 'dayjs';
import {
  faCommentAlt,
  faMugHot,
  faFilter,
  faSortAmountDown,
  faDiceD6,
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

export const moimCommunityData = {
  type: 'kakao',
  status: 'open',
};

export const moimMeetingData = {
  type: 'online',
  status: 'empty',
};

export const DESCRIPTION_MAX_LENGTH = 150;

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
    [faDiceD6, faSpinner], // community
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

// bank list
export const bankList = [
  {
    id: '090',
    name: '카카오뱅크',
  },
  {
    id: '011',
    name: '농협',
  },
  {
    id: '004',
    name: 'KB국민',
  },
  {
    id: '088',
    name: '신한',
  },
  {
    id: '020',
    name: '우리',
  },
  {
    id: '081',
    name: '하나',
  },
  {
    id: '003',
    name: 'IBK기업',
  },
  {
    id: '023',
    name: 'SC제일',
  },
  {
    id: '027',
    name: '씨티',
  },
  {
    id: '002',
    name: 'KDB산업',
  },
  {
    id: '103',
    name: 'SBI저축은행',
  },
  {
    id: '045',
    name: '새마을',
  },
  {
    id: '031',
    name: '대구',
  },
  {
    id: '034',
    name: '광주',
  },
  {
    id: '071',
    name: '우체국',
  },
  {
    id: '048',
    name: '신협',
  },
  {
    id: '037',
    name: '전북',
  },
  {
    id: '039',
    name: '경남',
  },
  {
    id: '032',
    name: '부산',
  },
  {
    id: '007',
    name: '수협',
  },
  {
    id: '035',
    name: '제주',
  },
  {
    id: '050',
    name: '저축은행',
  },
  {
    id: '064',
    name: '산림조합',
  },
  {
    id: '089',
    name: '케이뱅크',
  },
];

// boring avatars name
export const avatars = [
  'Mary Baker',
  'Amelia Earhart',
  'Mary Roebling',
  'Sarah Winnemucca',
  'Margaret Brent',
  'Lucy Stone',
  'Mary Edwards',
  'Margaret Chase',
  'Mahalia Jackson',
  'Maya Angelou',
  'Margaret Bourke',
  'Eunice Kennedy',
  'Carrie Chapman',
  'Elizabeth Peratrovich',
  'Alicia Dickerson',
  'Daisy Gatson',
  'Emma Willard',
  'Amelia Boynton',
  'Maria Mitchell',
  'Sojourner Truth',
  'Willa Cather',
  'Coretta Scott',
  'Harriet Tubman',
  'Fabiola Cabeza',
  'Sacagawea',
  'Esther Martinez',
  'Elizabeth Cady',
  'Bessie Coleman',
  'Ma Rainey',
  'Julia Ward',
  'Irene Morgan',
  'Babe Didrikson',
  'Lyda Conley',
  'Annie Dodge',
  'Maud Nathan',
  'Betty Ford',
  'Rosa Parks',
  'Susan La',
  'Gertrude Stein',
  'Wilma Mankiller',
  'Grace Hopper',
  'Jane Addams',
  'Katharine Graham',
  'Florence Chadwick',
  'Zora Neale',
  'Wilma Rudolph',
  'Annie Jump',
  'Mother Frances',
  'Jovita Idár',
  'Maggie L',
  'Henrietta Swan',
  'Jane Cunningham',
  'Victoria Woodhull',
  'Helen Keller',
  'Patsy Takemoto',
  'Chien-Shiung',
  'Dorothea Dix',
  'Margaret Sanger',
  'Alice Paul',
  'Frances Willard',
  'Sally Ride',
  'Juliette Gordon',
  'Queen Lili',
  'Katharine Lee',
  'Harriet Beecher',
  'Felisa Rincon',
  'Hetty Green',
  'Belva Lockwood',
  'Biddy Mason',
  'Ida B',
  'Eleanor Roosevelt',
  'Maria Goeppert',
  'Phillis Wheatley',
  'Mary Harris',
  'Fannie Lou',
  'Rosalyn Yalow',
  'Susan B',
  'Clara Barton',
  'Lady Deborah',
  'Jane Johnston',
  'Alice Childress',
  'Georgia O',
  'Rebecca Crumpler',
  'Anne Bradstreet',
  'Elizabeth Blackwell',
  'Christa McAuliffe',
  'Edmonia Lewis',
  'Nellie Bly',
  'Mary Cassatt',
  'Pauli Murray',
  'Ellen Swallow',
  'Hedy Lamarr',
  'Pearl Kendrick',
  'Abigail Adams',
  'Margaret Fuller',
  'Emma Lazarus',
  'Marian Anderson',
  'Virginia Apgar',
  'Mary Walton',
];
