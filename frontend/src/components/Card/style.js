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
  margin: 2rem 1rem 1rem;
  .inner {
    transition: all 0.2s ease-out;
  }
  &:hover {
    .inner {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
    }
  }
`;

export const CardBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const CardInner = styled.div`
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
`;

export const CardHeader = styled.div`
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
    .status {
      display: flex;
      flex-grow: 0;
      align-items: flex-start;
      margin-top: 4px;
      span {
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

export const CardBody = styled.div`
  display: flex;
  flex: 1;
  margin-top: 12px;
`;

export const CardTabMenuWrap = styled.div`
  width: 40px;
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
        font-size: 0.875rem;
        line-height: 40px;
        svg {
          transition: all 0.2s ease-out;
          color: ${({ theme }) => theme.gray};
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
`;

export const CardTabContentBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const CardTabContentInner = styled.div`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sub};
  .cardTabBox {
    display: none;
    height: 100%;
    &:nth-child(${({ activeIndex }) => activeIndex + 1}) {
      display: block;
    }
  }
`;

export const CardImage = styled.span`
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

export const CardText = styled.div`
  height: 100%;
  a {
    display: block;
    height: 100%;
    padding: 12px;
    font-size: 0.75rem;
    color: ${color.gray};
    word-break: break-all;
    line-height: 1.5;
    transition: all 0.2s ease-out;
    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

export const CardLink = styled.div`
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
      color: ${({ theme }) => theme.text};
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

export const CardMap = styled.div`
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

export const CardTime = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-family: 'Rubik';
  .dateBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 60%;
    height: 60%;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.main};
    .week {
      position: absolute;
      top: 12px;
      left: 50%;
      height: 1rem;
      padding: 0 6px;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.main};
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      line-height: 1rem;
      transform: translateX(-50%);
      color: ${({ theme }) => theme.title};
    }
    .weekDot {
      display: flex;
      align-items: center;
      justify-content: space-around;
      position: absolute;
      top: 12px;
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
        height: 1rem;
        padding: 0 6px;
        border-radius: 8px;
        background-color: ${color.gray};
        font-size: 0.625rem;
        font-weight: 600;
        text-transform: uppercase;
        line-height: 1rem;
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
    font-weight: 600;
    color: ${({ theme }) => theme.title};
  }
  .time {
    color: ${({ theme }) => theme.title};
  }
`;

export const CardMore = styled.div`
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
        color: ${({ theme }) => theme.title};
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
