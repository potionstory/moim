import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const StatusListWrap = styled.div`
  display: flex;
  ul {
    display: flex;
    margin: 0 -3px;
    li {
      display: flex;
      margin: 0 3px;
    }
  }
`;

export const StatusItem = styled.span`
  height: 20px;
  padding: 0 10px;
  border-radius: 10px;
  ${({ status }) => {
    switch (status) {
      case 'open':
        return css`
          background-color: ${color.blue};
        `;
      case 'close':
        return css`
          background-color: ${color.gray};
        `;
      case 'empty':
        return css`
          background-color: ${color.blue};
        `;
      case 'full':
        return css`
          background-color: ${color.red};
        `;
      case 'proceeding':
        return css`
          background-color: ${color.green};
        `;
      case 'complete':
        return css`
          background-color: ${color.gray};
        `;
      default:
        return;
    }
  }};
  font-size: 0.625rem;
  font-weight: 600;
  color: ${color.white};
  line-height: 20px;
  text-transform: uppercase;
  opacity: ${({ isCheck }) => (isCheck ? 1 : 0.6)};
`;
