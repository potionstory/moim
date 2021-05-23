import {
  faAt,
  faLock,
  faRedoAlt,
  faUser,
  faPhoneAlt,
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

export const moimJoinForm = [
  {
    type: 'text',
    name: 'userName',
    placeholder: 'name',
    value: '',
    isCheck: false,
    icon: faUser,
  },
  {
    type: 'number',
    name: 'mobile',
    placeholder: 'mobile number',
    value: '',
    isCheck: false,
    icon: faPhoneAlt,
  },
];
