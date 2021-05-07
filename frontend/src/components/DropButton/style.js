import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const DropButtonWrap = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  transition: all 0.2s ease-out;
  .dropButton {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ isActive, theme }) =>
      isActive ? color.red : theme.theme};
    font-size: 0.875rem;
    transition: all 0.2s ease-out;
    svg {
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
  .dropMenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    li {
      position: absolute;
      left: 0;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: ${({ theme }) => theme.theme};
      text-align: center;
      line-height: 40px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        svg {
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
`;
