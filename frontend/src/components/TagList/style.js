import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const TagListWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    max-width: 100%;
    height: 20px;
    margin: 6px 6px 0 0;
    button {
      overflow: hidden;
      position: relative;
      max-width: 100%;
      height: 20px;
      ${({ isEdit }) =>
        css`
          padding: ${!isEdit ? '0 10px' : '0 30px 0 10px'};
        `};
      border-radius: 10px;
      background-color: ${({ theme }) => theme.theme};
      font-size: 0.625rem;
      font-weight: 600;
      color: ${({ theme }) => theme.title};
      line-height: 20px;
      text-overflow: ellipsis;
      transition: background-color 0.2s ease-out;
      &:hover {
        background-color: ${({ isEdit }) =>
          !isEdit ? color.green : color.red};
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
          color: ${({ theme }) => theme.main};
        }
      }
    }
  }
`;
