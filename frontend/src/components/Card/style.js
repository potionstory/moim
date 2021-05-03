import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const CardWrap = styled.li`
  display: flex;
  flex: 1;
  flex-grow: 0;
  flex-direction: column;
  justify-content: space-between;
  min-width: 296px;
  margin: 0 1rem 2rem;
  .cardBlock {
    display: block;
    position: relative;
    padding-top: 100%;
    .cardInner {
      display: flex;
      flex: 1;
      flex-direction: column;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding: 12px;
      box-sizing: border-box;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.main};
      transition: all 0.2s ease-out;
    }
  }
  &:hover {
    .cardBlock {
      .cardInner {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
      }
    }
  }
`;

export const CardHeaderWrap = styled.div`
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      color: ${({ theme }) => theme.title};
    }
  }
  .info {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin-left: 12px;
    .title {
      display: block;
      font-size: 1rem;
      font-weight: 600;
      color: ${color.gray};
      line-height: 1rem;
      ${ellipsis};
      transition: all 0.2s ease-out;
      &:hover {
        color: ${({ theme }) => theme.title};
      }
    }
    .subInfo {
      display: flex;
      flex-grow: 0;
      align-items: flex-start;
      margin-top: 4px;
      .cost {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        margin-right: 6px;
        border-radius: 10px;
        background-color: ${({ isFree }) =>
          isFree ? color.gray : color.orange};
        svg {
          font-size: 0.625rem;
          color: ${color.black};
        }
      }
      .status {
        height: 20px;
        padding: 0 10px;
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
      }
    }
  }
`;

export const CardBodyWrap = styled.div`
  display: flex;
  flex: 1;
  margin-top: 12px;
  .cardBodyInner {
    width: 40px;
  }
`;

export const CardTabMenu = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.sub};
  .activeBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.theme};
  }
  ul {
    position: relative;
    li {
      button {
        display: block;
        width: 100%;
        line-height: 40px;
        svg {
          font-size: 0.875rem;
          color: ${({ theme }) => theme.gray};
          transition: all 0.2s ease-out;
        }
        &:hover {
          svg {
            color: ${({ theme }) => theme.title};
          }
        }
      }
      &:nth-child(${({ activeIndex }) => activeIndex + 1}) {
        button {
          svg {
            color: ${({ theme }) => theme.main};
          }
        }
      }
    }
  }
`;

export const CardTabContentWrap = styled.div`
  flex: 1;
  margin-left: 12px;
  .cardTabBlock {
    display: block;
    position: relative;
    padding-top: 100%;
  }
`;

export const CardTabBoxWrap = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sub};
  .cardTabBox {
    height: 100%;
  }
`;

export const CardMainImageBoxWrap = styled.span`
  display: block;
  overflow: hidden;
  position: relative;
  height: 100%;
  .thumb {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .cover {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.2s ease-out;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.title};
      opacity: 0.6;
      content: '';
    }
    svg {
      position: relative;
      font-size: 6rem;
      color: ${({ theme }) => theme.main};
    }
  }
  &:hover {
    .cover {
      opacity: 1;
    }
  }
`;

export const CardDescriptionBoxWrap = styled.div`
  height: 100%;
  a {
    display: block;
    height: 100%;
    padding: 12px;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${color.gray};
    word-break: break-all;
    line-height: 1.5;
    white-space: pre-wrap;
    transition: all 0.2s ease-out;
    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const CardUrlBoxWrap = styled.div`
  padding: 12px;
  .linkBox {
    display: flex;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.main};
    .url {
      flex: 1;
      padding: 8px 20px;
      font-size: 0.625rem;
      font-weight: 600;
      color: ${color.blue};
      line-height: 1.5rem;
      word-break: break-all;
      text-transform: uppercase;
      opacity: 0.6;
      transition: all 0.2s ease-out;
      ${ellipsis};
      &:hover {
        opacity: 1;
      }
    }
  }
`;

export const CardScheduleBoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  padding: 6px;
  font-family: 'Rubik';
  .dateBox {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 144px;
    padding: 0 6px;
    text-align: center;
    .dayBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 132px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.main};
      .weekDot {
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: 9px;
        left: 6px;
        width: calc(100% - 12px);
        svg {
          font-size: 0.5rem;
          color: ${color.gray};
          &:nth-child(1) {
            color: ${color.red};
          }
          &:nth-child(7) {
            color: ${color.blue};
          }
        }
        span {
          height: 20px;
          padding: 0 10px;
          border-radius: 10px;
          background-color: ${color.gray};
          font-size: 0.625rem;
          font-weight: 600;
          text-transform: uppercase;
          line-height: 20px;
          color: ${color.white};
          &:nth-child(1) {
            background-color: ${color.red};
          }
          &:nth-child(7) {
            background-color: ${color.blue};
          }
        }
      }
      .day {
        font-size: 4rem;
        font-weight: 600;
        color: ${({ theme }) => theme.title};
      }
    }
    .month {
      margin-bottom: 6px;
      font-weight: 600;
      color: ${({ theme }) => theme.title};
    }
    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 6px;
      color: ${({ theme }) => theme.title};
      .timeToMotion {
        display: block;
        width: 20px;
        height: 20px;
        margin: 0 6px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.theme};
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 20px;
          svg {
            font-size: 1rem;
            color: ${({ theme }) => theme.main};
          }
        }
      }
    }
  }
  .dateBox.to {
    .dayBox {
      height: 92px;
      .weekDot {
        svg {
          display: none;
        }
        span {
          background-color: ${color.none};
          color: ${color.gray};
          &:nth-child(1) {
            color: ${color.red};
          }
          &:nth-child(7) {
            color: ${color.blue};
          }
        }
      }
      .day {
        font-size: 2rem;
      }
    }
  }
  .dateToMotion {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.theme};
    transform: translate(-50%, -50%);
    svg {
      font-size: 2rem;
      color: ${({ theme }) => theme.main};
    }
  }
`;

export const CardMapBoxWrap = styled.div`
  height: 100%;
  .mapArea {
    height: 100%;
  }
  .mapNone {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${color.gray};
    svg {
      font-size: 6rem;
    }
    span {
      margin-top: 1rem;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

export const CardAddInfoBoxWrap = styled.div`
  padding: 12px;
  .contentWrap {
    .contentHead {
      display: flex;
      align-items: center;
      .iconBox {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        background-color: ${color.gray};
        font-size: 0.625rem;
        line-height: 24px;
        text-align: center;
        svg {
          color: ${({ theme }) => theme.main};
        }
      }
      .title {
        display: block;
        flex: 1;
        margin-left: 6px;
        font-size: 0.875rem;
        font-weight: 600;
        color: ${color.gray};
        line-height: 24px;
        text-transform: uppercase;
        ${ellipsis};
      }
    }
    .contentBody {
      margin-top: 6px;
      .memberCount {
        font-family: 'Rubik';
        font-weight: 600;
        color: ${({ theme }) => theme.title};
        .now {
          color: ${color.gray};
        }
        .max {
          color: ${color.green};
        }
      }
    }
    + .contentWrap {
      margin-top: 20px;
    }
  }
`;
