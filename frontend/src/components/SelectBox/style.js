import styled from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const SelectBoxWrap = styled.div`
  position: relative;
  .selected {
    display: flex;
    overflow: hidden;
    position: relative;
    z-index: 10;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    .item {
      flex: 1;
      padding: 8px 20px;
      font-size: 0.875rem;
      color: ${({ isValue, theme }) => (isValue ? theme.title : color.gray)};
      font-weight: 600;
      line-height: 1.5rem;
      ${ellipsis};
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: ${({ theme }) => theme.theme};
      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        svg {
          font-size: 1.5rem;
          color: ${({ theme }) => theme.title};
          opacity: 0.6;
          transition: all 0.2s ease-out;
        }
        &:hover {
          svg {
            opacity: 1;
          }
        }
      }
    }
  }
  ul {
    ${({ isScroll }) =>
      !isScroll ? 'overflow: hidden;' : 'overflow-y: auto;'};
    position: absolute;
    top: 52px;
    left: 0;
    z-index: 15;
    width: 100%;
    height: 0;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.title};
    li {
      display: flex;
      border-top: 1px dashed ${color.gray};
      button {
        flex: 1;
        padding: 8px 20px;
        box-sizing: border-box;
        font-size: 0.875rem;
        color: ${({ theme }) => theme.main};
        font-weight: 600;
        line-height: 1.5rem;
        text-align: left;
        opacity: 0.6;
        ${ellipsis};
        &:hover {
          background-color: ${({ theme }) => theme.text};
          opacity: 1;
        }
      }
      &:first-child {
        border-top: 0 none;
      }
    }
  }
`;
