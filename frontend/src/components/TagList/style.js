import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const TagListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    height: 1rem;
    margin: 0 6px 6px 0;
    button {
      position: relative;
      height: 1rem;
      padding: 0 8px;
      ${({ isEdit }) => css`{padding: ${!isEdit ? '0 8px' : '0 24px 0 8px'}`};
      border-radius: 8px;
      background-color: ${color.blue};
      font-size: 0.625rem;
      font-weight: 600;
      color: ${color.white};
      line-height: 1rem;
      transition: background-color 0.2s ease-out;
      &:hover {
        background-color: ${({ isEdit, theme }) =>
          !isEdit ? theme.theme : color.red};
      }
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background-color: ${({ theme }) => theme.title};
        svg {
          width: 8px !important;
          color: ${({ theme }) => theme.main};
        }
      }
    }
  }
`;
