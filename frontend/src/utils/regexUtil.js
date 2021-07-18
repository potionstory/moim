import { map, isEmpty } from 'lodash';

export const emailCheck = (value) => {
  const regExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return regExp.test(value);
};

export const passwordCheck = (value) => {
  const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  return regExp.test(value);
};

export const nameCheck = (value) => {
  const regExp = /^[가-힣a-zA-Z0-9]{4,12}$/;
  return regExp.test(value);
};

export const mobileCheck = (value) => {
  const regExp = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/g;
  return regExp.test(value);
};

export const passNumberCheck = (value) => {
  return map(value, (v) => !isEmpty(v)).every((v) => v === true);
};
