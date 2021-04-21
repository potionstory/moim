import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const TagListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    height: 20px;
    margin: 0 6px 6px 0;
    button {
      position: relative;
      height: 20px;
      ${({ isEdit }) => css`{padding: ${!isEdit ? '0 10px' : '0 30px 0 10px'}`};
      border-radius: 10px;
      background-color: ${color.blue};
      font-size: 0.625rem;
      font-weight: 600;
      color: ${color.white};
      line-height: 20px;
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
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.title};
        svg {
          width: 8px !important;
          color: ${({ theme }) => theme.main};
        }
      }
    }
  }
`;
