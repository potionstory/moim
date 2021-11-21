import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const EventMemberWarp = styled.div`
  .memberList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    li {
      width: 153px;
      height: 153px;
    }
  }
  .memberButton {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
  }
`;

export const EventMemberCardWrap = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  ${({ isFixed, team, theme }) => {
    if (isFixed) {
      switch (team) {
        case 1:
          return css`
            background-color: ${color.red};
          `;
        case 2:
          return css`
            background-color: ${color.orange};
          `;
        case 3:
          return css`
            background-color: ${color.green};
          `;
        case 4:
          return css`
            background-color: ${color.blue};
          `;
        case 5:
          return css`
            background-color: ${color.purple};
          `;
        default:
          return false;
      }
    } else {
      return css`
        background-color: ${theme.title};
      `;
    }
  }};
  opacity: ${({ isFixed }) => (!isFixed ? 0.6 : 1)};
  transition: all 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
  .job {
    width: 100%;
    height: 24px;
    span {
      display: inline-block;
      width: 100px;
      height: 24px;
      padding: 0 12px;
      border-radius: 24px;
      background-color: ${({ theme }) => theme.main};
      font-size: 1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.title};
      line-height: 24px;
    }
  }
  .number {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    text-align: center;
    font-family: 'Rubik';
    font-size: 4rem;
    font-weight: bold;
    color: ${({ isFixed, theme }) => (!isFixed ? theme.theme : theme.title)};
    .animated-container > div,
    .digit {
      width: 40px;
    }
    .digit {
      height: 76px;
      line-height: 80px;
    }
  }
  .name {
    width: 100%;
    height: 24px;
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    color: ${({ theme }) => theme.main};
    line-height: 24px;
    ${ellipsis};
  }
`;
