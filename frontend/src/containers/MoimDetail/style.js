import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const MoimDetailWrap = styled.section`
  display: flex;
  flex-direction: row;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

export const MoimDetailSummary = styled.div`
  width: 220px;
  .thumb {
    overflow: hidden;
    height: 220px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

export const MoimDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  margin-left: 24px;
`;

export const MoimDetailBase = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MoimDetailTypeWrap = styled.div`
  display: flex;
  .name {
    margin-left: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.theme};
    text-transform: uppercase;
    line-height: 40px;
  }
`;

export const MoimDetailTitleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  padding: 12px 0;
  min-height: 92px;
  ${({ isEdit }) =>
    isEdit &&
    css`
      padding: 12px 24px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.sub};
    `};
  h3 {
    font-size: 3.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    line-height: 72px;
  }
  textarea {
    width: 100%;
    font-size: 3.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    line-height: 72px;
    vertical-align: top;
  }
`;

export const MoimDetailCostWrap = styled.div`
  display: flex;
  margin-top: 12px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ isFree }) => (isFree ? color.gray : color.orange)};
    svg {
      font-size: 1rem;
      color: ${color.black};
      transition: all 0.2s ease-out;
    }
  }
  .costContent {
    margin-left: 12px;
    span {
      ${({ isFree }) =>
        !isFree &&
        css`
          font-family: 'Rubik';
        `};
      font-size: 1rem;
      font-weight: 600;
      color: ${({ isFree }) => (isFree ? color.gray : color.orange)};
      text-transform: uppercase;
      line-height: 40px;
    }
    .costInput {
      display: inline-flex;
      overflow: hidden;
      background-color: ${({ theme }) => theme.sub};
      border-radius: 20px;
      input {
        width: 180px;
        height: 40px;
        padding: 8px 20px;
        box-sizing: border-box;
        font-family: 'Rubik';
        font-size: 1rem;
        font-weight: 600;
        color: ${({ isFree }) => (isFree ? color.gray : color.orange)};
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.theme};
        svg {
          font-size: 1rem;
          color: ${({ theme }) => theme.main};
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

export const MoimDetailStatusWrap = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
    }
  }
  .statusContent {
    margin-left: 12px;
  }
`;

export const MoimDetailUrlWrap = styled.div`
  display: flex;
  margin-top: 12px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
    }
  }
  .urlContent {
    display: flex;
    flex: 1;
    overflow: hidden;
    margin-left: 12px;
    a {
      font-size: 0.875rem;
      font-weight: 600;
      color: ${color.blue};
      line-height: 40px;
      ${ellipsis};
      opacity: 0.6;
      transition: all 0.2s ease-out;
      &:hover {
        opacity: 1;
      }
    }
    .urlInput {
      display: inline-flex;
      overflow: hidden;
      background-color: ${({ theme }) => theme.sub};
      border-radius: 20px;
      input {
        width: 180px;
        height: 40px;
        padding: 8px 20px;
        box-sizing: border-box;
        font-size: 0.875rem;
        font-weight: 600;
        color: ${color.blue};
        ${ellipsis};
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.theme};
        svg {
          font-size: 1rem;
          color: ${({ theme }) => theme.main};
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

export const MoimDetailTagWrap = styled.div`
  display: flex;
  margin-top: 12px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
      transition: all 0.2s ease-out;
    }
  }
  .tagContent {
    flex: 1;
    margin-left: 12px;
    ${({ isEdit }) =>
      !isEdit &&
      css`
        padding-top: 10px;
      `};
    .tagInput {
      display: inline-flex;
      overflow: hidden;
      margin-bottom: 12px;
      background-color: ${({ theme }) => theme.sub};
      border-radius: 20px;
      input {
        width: 180px;
        height: 40px;
        padding: 8px 20px;
        box-sizing: border-box;
        font-size: 0.875rem;
        font-weight: 600;
        color: ${({ theme }) => theme.title};
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.theme};
        svg {
          font-size: 1rem;
          color: ${({ theme }) => theme.main};
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

export const MoimDetailDescriptionWrap = styled.div`
  display: flex;
  margin-top: 12px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
    }
  }
  .desciptionBox {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 12px;
    .description {
      min-height: 40px;
      ${({ isEdit, theme }) =>
        css`
          padding: ${!isEdit ? '6px 0 0' : '6px 12px'};
          background-color: ${!isEdit ? color.none : theme.sub};
          color: ${!isEdit ? color.gray : theme.text};
        `};
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: bold;
      white-space: pre-wrap;
      line-height: 28px;
    }
    .limit {
      display: block;
      height: 40px;
      font-family: 'Rubik';
      font-size: 0.875rem;
      font-weight: 600;
      color: ${({ theme }) => theme.title};
      text-align: right;
      line-height: 40px;
      .now {
        color: ${color.gray};
      }
      .max {
        color: ${color.green};
      }
    }
  }
`;

export const MoimDetailAdditional = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${color.gray};
  .tabMenu {
    position: relative;
    .activeBar {
      position: absolute;
      top: 0;
      width: 80px;
      height: 80px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.theme};
    }
    .tabList {
      display: flex;
      flex-direction: row;
      position: relative;
    }
  }
  .tabContent {
    overflow: hidden;
    position: relative;
    margin-top: 12px;
    padding-top: 50%;
    border-radius: 4px;
    .tabContentInner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.sub};
      .tabContentBox {
        height: 100%;
      }
    }
  }
`;

export const MoimDetailTabItem = styled.li`
  position: relative;
  button {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    svg {
      font-size: 2rem;
      color: ${({ isActive, theme }) => (!isActive ? theme.gray : theme.main)};
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        color: ${({ isActive, theme }) =>
          !isActive ? theme.title : theme.main};
      }
    }
  }
`;

export const MoimDetailScheduleWrap = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  .dateTimePicker {
    display: none;
  }
  .dateInner {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 24px;
    font-family: 'Rubik';
    font-size: 2rem;
    .dateBox {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 264px;
      height: 264px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.main};
      .week {
        position: absolute;
        top: 15px;
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
          font-size: 1rem;
          color: ${color.gray};
          &:nth-child(1) {
            color: ${color.red};
          }
          &:nth-child(7) {
            color: ${color.blue};
          }
        }
        span {
          height: 32px;
          padding: 0 10px;
          border-radius: 20px;
          background-color: ${color.gray};
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          line-height: 32px;
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
        font-size: 8rem;
        font-weight: 600;
        color: ${({ theme }) => theme.title};
      }
      .btnCalendar {
        display: flex;
        justify-content: center;
        position: absolute;
        bottom: 15px;
        left: 0;
        width: 100%;
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 4px;
          background-color: ${({ theme }) => theme.theme};
          svg {
            font-size: 1rem;
            color: ${({ theme }) => theme.main};
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
    .month {
      margin-bottom: 12px;
      font-weight: 600;
      color: ${({ theme }) => theme.title};
    }
    .time {
      margin-top: 12px;
      color: ${({ theme }) => theme.title};
    }
  }
  .progress {
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120px;
    transform: translate(-50%, -50%);
    span {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      svg {
        font-size: 4rem;
      }
    }
  }
`;

export const MoimDetailMapWrap = styled.div`
  height: 100%;
  .mapArea {
    height: 100%;
    .customoverlay {
      position: relative;
      bottom: 55px;
      border-radius: 6px;
      border: 1px solid #ccc;
      border-bottom: 2px solid #ddd;
      float: left;
      .overlayInner {
        display: block;
        text-decoration: none;
        color: #000;
        text-align: center;
        border-radius: 6px;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
        background: #d95050;
      }
      .title {
        display: block;
        text-align: center;
        background: #fff;
        margin-right: 35px;
        padding: 10px 15px;
        font-size: 14px;
        font-weight: bold;
      }
      &:after {
        content: '';
        position: absolute;
        margin-left: -12px;
        left: 50%;
        bottom: -12px;
        width: 22px;
        height: 12px;
        background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
      }
      &:nth-of-type(n) {
        border: 0;
        box-shadow: 0px 1px 2px #888;
      }
    }
  }
  .locationWrap {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    max-height: 100%;
    ${({ isSearch }) =>
      css`
        padding: ${isSearch ? '10px' : '10px 10px 30px'};
      `};
    box-sizing: border-box;
    .locationInner {
      display: flex;
      flex-direction: column;
      width: 300px;
      min-height: 60px;
      max-height: 100%;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.main};
    }
    .locationBox {
      width: 100%;
      span {
        display: flex;
        overflow: hidden;
        margin: 10px;
        border-radius: 4px;
        input {
          flex: 1;
          padding: 8px;
          height: 40px;
          background-color: ${({ theme }) => theme.title};
          font-size: 1rem;
          font-weight: 600;
          color: ${({ theme }) => theme.main};
          &:-webkit-autofill {
            -webkit-text-fill-color: ${({ theme }) => theme.main};
            -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.title} inset;
          }
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background-color: ${({ theme }) => theme.theme};
          svg {
            font-size: 1rem;
            color: ${({ theme }) => theme.main};
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
    .searchList {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow-y: auto;
      height: calc(100% - 120px);
      padding: 0 10px 10px;
      ul {
        flex: 1;
        overflow-y: auto;
        li {
          display: flex;
          position: relative;
          padding: 10px;
          overflow: hidden;
          cursor: pointer;
          min-height: 65px;
          .marker {
            width: 24px;
            height: 24px;
            border-radius: 4px;
            background-color: ${({ theme }) => theme.theme};
            font-family: 'Rubik';
            font-size: 1rem;
            font-weight: 600;
            color: ${({ theme }) => theme.main};
            text-align: center;
            line-height: 24px;
          }
          .info {
            flex: 1;
            overflow: hidden;
            margin-left: 10px;
            font-weight: 600;
            span {
              display: block;
            }
            .title {
              font-size: 1rem;
              color: ${({ theme }) => theme.theme};
              line-height: 24px;
              ${ellipsis};
            }
            .address {
              margin-top: 6px;
              font-size: 0.825rem;
              .road {
                color: ${({ theme }) => theme.text};
              }
              .jibun {
                color: ${({ theme }) => theme.gray};
              }
            }
            .tel {
              margin-top: 6px;
              font-size: 0.825rem;
              color: ${color.green};
            }
          }
          &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            border-bottom: 1px dashed ${color.gray};
            content: '';
          }
          &:last-child:after {
            display: none;
          }
          &:hover {
            background-color: ${({ theme }) => theme.sub};
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: center;
        padding-top: 10px;
        border-top: 1px dashed ${color.gray};
        button {
          width: 24px;
          height: 24px;
          font-family: 'Rubik';
          font-size: 1rem;
          font-weight: 600;
          color: ${color.gray};
          text-align: center;
          line-height: 24px;
          transition: all 0.2s ease-out;
          &:hover {
            color: ${({ theme }) => theme.title};
          }
          &.on {
            border-radius: 4px;
            background-color: ${color.green};
            color: ${({ theme }) => theme.main};
          }
        }
      }
    }
  }
`;
