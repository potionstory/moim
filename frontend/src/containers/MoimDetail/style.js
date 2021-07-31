import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis, hidden } from '../../lib/styles/util';

export const MoimDetailWrap = styled.section`
  display: flex;
  flex-direction: row;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

export const MoimDetailSummaryWrap = styled.div`
  width: 226px;
  .summaryInner {
    position: sticky;
    top: 104px;
    .thumb {
      overflow: hidden;
      position: relative;
      height: 226px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.sub};
      .btnUpload {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
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
        &:hover {
          opacity: 1;
        }
        svg {
          position: relative;
          font-size: 6rem;
          color: ${({ theme }) => theme.main};
        }
        input {
          ${hidden};
        }
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .btnWrap {
      display: flex;
      justify-content: flex-end;
      gap: 0 12px;
      margin-top: 12px;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 600;
        color: ${({ theme }) => theme.title};
        text-transform: uppercase;
      }
      .btnMain {
        flex: 1;
        background-color: ${({ isMainActive, theme }) =>
          isMainActive ? theme.theme : color.gray};
      }
      .btnSub {
        width: 40px;
        background-color: ${color.red};
      }
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

export const MoimDetailBaseWrap = styled.div`
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
  padding: 15px 0;
  min-height: 92px;
  ${({ isEdit }) =>
    isEdit &&
    css`
      padding: 15px 24px;
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

export const MoimDetailLockWrap = styled.div`
  display: flex;
  gap: 0 12px;
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
  .lockContent {
    display: flex;
    gap: 0 12px;
    box-sizing: border-box;
    .btnPassWord {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.theme};
      svg {
        font-size: 1rem;
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
`;

export const MoimDetailPayInfoWrap = styled.div`
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
  .payContent {
    display: flex;
    flex: 1;
    margin-left: 12px;
    .payInfo {
      padding: 0 12px;
      border-left: 1px dashed ${color.gray};
      ${({ isFree }) =>
        !isFree &&
        css`
          font-family: 'Rubik';
        `};
      font-size: 1rem;
      font-weight: 600;
      color: ${({ isFree, theme }) => (isFree ? color.gray : theme.text)};
      text-transform: uppercase;
      line-height: 40px;
      &.cost {
        color: ${color.orange};
      }
      &:first-child {
        padding-left: 0;
        border-left: 0 none;
      }
    }
    .payInput {
      width: 226px;
      margin-right: 12px;
      &.flex {
        flex: 1;
        margin-right: 0;
      }
    }
    .btnCopy {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.theme};
      svg {
        font-size: 1rem;
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
    background-color: ${({ theme }) => theme.sub};
    border-radius: 20px;
    a {
      flex: 1;
      height: 24px;
      padding: 8px 20px;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${color.blue};
      line-height: 24px;
      ${ellipsis};
      opacity: 0.6;
      transition: all 0.2s ease-out;
      &:hover {
        opacity: 1;
      }
    }
    input {
      flex: 1;
      height: 40px;
      padding: 8px 20px;
      box-sizing: border-box;
      font-size: 0.875rem;
      font-weight: 600;
      color: ${color.blue};
      line-height: 24px;
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
        padding-top: 4px;
      `};
    .tagInput {
      width: 226px;
      + ul {
        margin-top: 6px;
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
          color: ${theme.text};
        `};
      box-sizing: border-box;
      border-radius: 4px;
      font-size: 0.875rem;
      font-weight: 600;
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

export const MoimDetailAdditionalWrap = styled.div`
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed ${color.gray};
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
      color: ${({ isActive, theme }) => (!isActive ? theme.gray : theme.title)};
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        color: ${({ theme }) => theme.title};
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
    .overlay {
      position: relative;
      border-radius: 4px;
      box-shadow: 2px 2px 2px ${color.gray};
      .title {
        overflow: hidden;
        position: relative;
        z-index: 10;
        padding: 12px;
        border-radius: 4px;
        background-color: ${color.pink};
        font-size: 0.875rem;
        font-weight: 600;
        color: ${color.white};
        line-height: 1rem;
      }
      &:after {
        position: absolute;
        bottom: -6px;
        left: 50%;
        margin-left: -6px;
        width: 12px;
        height: 12px;
        box-shadow: 2px 0 2px ${color.gray};
        background-color: ${color.pink};
        transform: rotate(45deg);
        content: '';
      }
    }
    .selectedOverlay {
      position: relative;
      border-radius: 4px;
      box-shadow: 2px 2px 2px ${color.gray};
      .address {
        overflow: hidden;
        position: relative;
        z-index: 10;
        padding: 12px;
        border-radius: 4px;
        background-color: ${color.blue};
        font-size: 0.875rem;
        font-weight: 600;
        color: ${color.white};
        line-height: 1rem;
      }
      &:after {
        position: absolute;
        bottom: -6px;
        left: 50%;
        margin-left: -6px;
        width: 12px;
        height: 12px;
        box-shadow: 2px 0 2px ${color.gray};
        background-color: ${color.blue};
        transform: rotate(45deg);
        content: '';
      }
    }
  }
  .locationWrap {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    max-height: 100%;
    padding: 10px 10px 30px;
    box-sizing: border-box;
    .locationInner {
      display: flex;
      flex-direction: column;
      min-height: 60px;
      max-height: 100%;
      border-radius: 4px;
      box-shadow: 2px 2px 2px ${color.gray};
      background-color: ${({ theme }) => theme.main};
    }
    .locationBox {
      width: 100%;
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
        border-top: 1px dashed ${color.gray};
        border-bottom: 1px dashed ${color.gray};
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
            color: ${({ theme }) => theme.title};
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
            color: ${({ theme }) => theme.title};
          }
        }
      }
    }
  }
`;

export const MoimDetailMapForm = styled.form`
  width: 100%;
  span {
    display: flex;
    overflow: hidden;
    margin: 10px;
    border-radius: 4px;
    input {
      flex: 1;
      padding: 8px;
      width: 240px;
      height: 40px;
      background-color: ${({ theme }) => theme.title};
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.main};
      &:-webkit-autofill {
        -webkit-text-fill-color: ${({ theme }) => theme.main};
        box-shadow: 0 0 0 1000px ${({ theme }) => theme.title} inset;
      }
      &.locationName {
        background-color: ${({ isEdit, theme }) =>
          !isEdit ? theme.theme : theme.title};
        color: ${({ isEdit, theme }) => (!isEdit ? theme.title : theme.theme)};
      }
    }
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      background-color: ${({ isActive, theme }) =>
        !isActive ? color.gray : theme.theme};
      svg {
        font-size: 1rem;
        color: ${({ theme }) => theme.title};
        opacity: 0.6;
        transition: all 0.2s ease-out;
      }
      &:hover {
        svg {
          opacity: ${({ isActive }) => (isActive ? 1 : 0.6)};
        }
      }
    }
  }
`;

export const MoimDetailMemberWrap = styled.div`
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  .memberInner {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .memberTop {
      display: flex;
      flex: 1;
      gap: 0 24px;
      .memberCount {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        .countWrap {
          display: flex;
          gap: 12px;
          justify-content: center;
          width: 100%;
          height: 80px;
          font-family: 'Rubik';
          font-size: 3.6rem;
          font-weight: 600;
          color: ${color.gray};
          .now {
            color: ${({ theme }) => theme.title};
          }
          .max {
            color: ${color.green};
          }
          .countEdit {
            display: flex;
            align-items: center;
            overflow: hidden;
            border-radius: 4px;
            .countInput {
              display: flex;
              flex: 1;
              height: 100%;
              padding: 12px;
              box-sizing: border-box;
              background-color: ${({ theme }) => theme.main};
              div {
                flex: 1;
                input {
                  min-width: 56px;
                  height: 56px;
                  font-size: 3.6rem;
                  font-weight: 600;
                  color: ${color.green};
                  vertical-align: top;
                  text-align: center;
                }
              }
            }
            .btnWrap {
              button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                svg {
                  font-size: 1rem;
                  color: ${({ theme }) => theme.title};
                  opacity: 0.6;
                  transition: all 0.2s ease-out;
                }
                &.plus {
                  background-color: ${color.blue};
                }
                &.minus {
                  background-color: ${color.red};
                }
                &:hover {
                  svg {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
        .progress {
          position: relative;
          width: 100%;
          height: 12px;
          margin-top: 12px;
          border-radius: 6px;
          background-color: ${({ theme }) => theme.main};
          .bar {
            position: absolute;
            top: 0;
            left: 0;
            height: 12px;
            border-radius: 6px;
            background-color: ${({ theme }) => theme.theme};
          }
        }
      }
      .memberClient {
        flex: 1;
        padding: 12px;
        border-radius: 4px;
        background-color: ${({ theme }) => theme.main};
        .clientHead {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 28px;
          padding-bottom: 12px;
          border-bottom: 1px solid ${color.gray};
          .title {
            height: 15px;
            font-size: 1rem;
            font-weight: 600;
            color: ${({ theme }) => theme.title};
            text-transform: uppercase;
            line-height: 15px;
          }
          .setting {
            position: relative;
            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 15px;
              height: 15px;
              svg {
                font-size: 0.8rem;
                color: ${({ theme }) => theme.title};
                opacity: ${({ isSettingBox }) => (!isSettingBox ? 0.6 : 1)};
                transition: all 0.2s ease-out;
              }
              &:hover {
                svg {
                  opacity: 1;
                }
              }
            }
            .box {
              display: flex;
              flex-direction: column;
              position: absolute;
              top: 0;
              z-index: 1;
              right: 27px;
              padding: 4px 12px;
              border-radius: 4px;
              background-color: ${({ theme }) => theme.title};
              opacity: 0;
            }
          }
        }
        .clientBody {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 12px;
          .clientInfo {
            display: flex;
            overflow: hidden;
            height: 40px;
            margin-right: 12px;
            img {
              width: 40px;
              height: 40px;
              border: 3px solid ${color.gray};
              border-radius: 20px;
              background-color: ${({ theme }) => theme.main};
              object-fit: cover;
              transition: all 0.2s ease-out;
            }
            .name {
              flex: 1;
              height: 40px;
              margin-left: 12px;
              font-size: 0.75rem;
              font-weight: 600;
              color: ${({ theme }) => theme.title};
              line-height: 40px;
              ${ellipsis};
              transition: all 0.2s ease-out;
            }
            &:hover {
              img {
                border-color: ${({ theme }) => theme.theme};
              }
              .name {
                color: ${({ theme }) => theme.theme};
              }
            }
          }
        }
      }
    }
    .memberList {
      margin-top: 48px;
      .listHead {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 12px;
        border-bottom: 1px dashed ${color.gray};
        font-size: 1rem;
        .left {
          display: flex;
          align-items: center;
          gap: 0 12px;
          .iconBox {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 4px;
            background-color: ${({ theme }) => theme.title};
            svg {
              color: ${color.blue};
            }
            &.waiter {
              svg {
                color: ${color.red};
              }
            }
          }
          .title {
            font-weight: 600;
            text-transform: uppercase;
          }
          .counts {
            display: flex;
            align-items: center;
            gap: 0 6px;
            font-weight: 600;
            color: ${color.gray};
            .count {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 0 6px;
              font-family: 'Rubik';
              font-weight: 600;
              color: ${({ theme }) => theme.title};
              .icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                svg {
                  font-size: 0.625rem;
                }
              }
            }
            .pay {
              .icon {
                border-radius: 10px;
                background-color: ${color.orange};
                svg {
                  color: ${color.black};
                }
              }
            }
            .notPay {
              .icon {
                border-radius: 10px;
                background-color: ${color.gray};
                svg {
                  color: ${color.black};
                }
              }
            }
            .empty {
              .icon {
                svg {
                  font-size: 1rem;
                  color: ${color.gray};
                }
              }
            }
          }
        }
        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 4px;
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
      .listBody {
        overflow: hidden;
        ul {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 12px;
          li {
            position: relative;
            width: calc((100% - 108px) / 10);
            .listBox {
              padding-top: 100%;
              .listInner {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 4px;
                background-color: ${({ theme }) => theme.title};
                .index {
                  position: absolute;
                  top: 0;
                  left: 0;
                  padding: 3px;
                  font-family: 'Rubik';
                  font-size: 1.25rem;
                  font-style: italic;
                  font-weight: 600;
                  color: ${({ theme }) => theme.main};
                  line-height: 20px;
                }
                .payment {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: absolute;
                  top: 3px;
                  right: 3px;
                  width: 20px;
                  height: 20px;
                  border-radius: 10px;
                  background-color: ${color.gray};
                  ${({ isEdit }) =>
                    isEdit &&
                    css`
                      cursor: pointer;
                    `};
                  svg {
                    font-size: 0.625rem;
                    color: ${color.black};
                  }
                  &.active {
                    background-color: ${color.orange};
                  }
                }
                .avatar,
                .staffCheck {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  width: 40px;
                  height: 40px;
                  border-radius: 20px;
                  background-color: ${({ theme }) => theme.sub};
                  ${({ isEdit }) =>
                    isEdit &&
                    css`
                      cursor: pointer;
                    `};
                  svg {
                    font-size: 1.6rem;
                    color: ${({ theme }) => theme.gray};
                    &.isCheck {
                      color: ${color.green};
                    }
                  }
                  img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                  }
                  &.isClient,
                  &.isStaff {
                    svg {
                      font-size: 1.2rem;
                    }
                  }
                  &.isClient {
                    svg {
                      color: ${color.blue};
                    }
                  }
                  &.isStaff {
                    svg {
                      color: ${color.pink};
                    }
                  }
                }
                .name {
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 20px;
                  padding: 0 6px;
                  box-sizing: border-box;
                  font-size: 0.75rem;
                  font-weight: 600;
                  color: ${({ theme }) => theme.main};
                  line-height: 20px;
                  text-align: center;
                  ${ellipsis}
                }
                &.empty {
                  background-color: ${({ theme }) => theme.main};
                  svg {
                    font-size: 2rem;
                    color: ${color.gray};
                  }
                }
                .btnRemove {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: absolute;
                  top: 3px;
                  left: 3px;
                  width: 20px;
                  height: 20px;
                  border-radius: 10px;
                  background-color: ${color.red};
                  svg {
                    font-size: 0.625rem;
                    color: ${({ theme }) => theme.title};
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
