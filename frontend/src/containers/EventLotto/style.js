import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const EventLottoWarp = styled.div`
  .lottoBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4rem 0;
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 240px;
      height: 240px;
      background-color: ${({ theme }) => theme.title};
      border-radius: 4px;
      svg {
        font-size: 8rem;
        color: ${({ theme }) => theme.theme};
      }
      .number {
        font-size: 8rem;
        font-weight: bold;
        font-family: 'Rubik';
        color: ${({ theme }) => theme.main};
      }
    }
  }
  .winnerList {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    li {
      width: 153px;
      height: 153px;
    }
  }
`;

export const EventWinnerCardWrap = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 4px;
  ${({ team }) => {
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
  }};
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
    color: ${({ theme }) => theme.title};
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
