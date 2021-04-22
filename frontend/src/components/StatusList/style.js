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

export const StatusItem = styled.button`
  position: relative;
  height: 20px;
  ${({ isEdit }) =>
    css`
      padding: ${!isEdit ? '0 10px' : '0 10px 0 30px'};
    `};
  border-radius: 10px;
  ${({ status, theme }) => {
    switch (status) {
      case 'open':
        return css`
          background-color: ${theme.theme};
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
  opacity: ${({ isChecked }) => (isChecked ? 1 : 0.6)};
  transition: all 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.title};
    svg {
      color: ${({ theme }) => theme.main};
    }
  }
`;
