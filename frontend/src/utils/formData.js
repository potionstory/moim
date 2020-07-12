import {
  faAt,
  faLock,
  faRedoAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

export const signin = [
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

export const signup = [
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
  {
    type: 'text',
    name: 'handle',
    placeholder: 'user name',
    value: '',
    isCheck: false,
    icon: faUser,
  },
];
