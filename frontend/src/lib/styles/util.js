import { css } from 'styled-components';

export const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ellipsisMulti = css`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

export const hidden = css`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 1;
`;
