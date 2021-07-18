import { reduce } from 'lodash';

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

const action = (type, payload = {}) => {
  return { type, payload };
};

export const createType = (base) => {
  return reduce(
    [REQUEST, SUCCESS, FAILURE],
    (acc, value) => {
      acc[value] = `${base}_${value}`;
      return acc;
    },
    {},
  );
};

export const createAction = (type) => {
  return {
    REQUEST: (payload) => action(type[REQUEST], payload),
    SUCCESS: (payload) => action(type[SUCCESS], payload),
    FAILURE: (payload) => action(type[FAILURE], payload),
  };
};
