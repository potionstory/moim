import {
  faAt,
  faLock,
  faRedoAlt,
  faUser,
  faPhoneAlt,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

export const signInForm = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'email',
    value: '',
    isCheck: false,
    icon: faAt,
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'password',
    value: '',
    isCheck: false,
    icon: faLock,
  },
];

export const signUpForm = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'email',
    value: '',
    isCheck: false,
    icon: faAt,
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'password',
    value: '',
    isCheck: false,
    icon: faLock,
  },
  {
    type: 'password',
    name: 'confirmPassword',
    placeholder: 'repeat password',
    value: '',
    isCheck: false,
    icon: faRedoAlt,
  },
];

export const moimPassNumberForm = [
  {
    type: 'number',
    name: 'passNumber',
    placeholder: '',
    value: new Array(6).fill(''),
    isCheck: false,
    icon: faKey,
  },
  {
    type: 'number',
    name: 'confirmPassNumber',
    placeholder: '',
    value: new Array(6).fill(''),
    isCheck: false,
    icon: faRedoAlt,
  },
];

export const userInfoForm = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'email',
    value: '',
    isCheck: false,
    icon: faAt,
  },
  {
    type: 'text',
    name: 'userName',
    placeholder: 'user name',
    value: '',
    isCheck: false,
    icon: faUser,
  },
];

export const moimMemberForm = [
  {
    type: 'text',
    name: 'name',
    placeholder: 'name',
    value: '',
    isCheck: false,
    isRequire: true,
    icon: faUser,
  },
  {
    type: 'email',
    name: 'email',
    placeholder: 'email',
    value: '',
    isCheck: false,
    isRequire: false,
    icon: faAt,
  },
  {
    type: 'number',
    name: 'mobile',
    placeholder: 'mobile number',
    value: '',
    isCheck: false,
    isRequire: false,
    icon: faPhoneAlt,
  },
  {
    type: 'number',
    name: 'passNumber',
    placeholder: '',
    value: new Array(6).fill(''),
    isCheck: false,
    isRequire: true,
    icon: faKey,
  },
];
