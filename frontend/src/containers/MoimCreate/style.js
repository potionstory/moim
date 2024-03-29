import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis, hidden } from '../../lib/styles/util';

export const MoimCreateWrap = styled.section`
  display: flex;
  flex-direction: row;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 12px;
  }
`;

export const MoimCreateSummaryWrap = styled.div`
  width: 226px;
  .summaryInner {
    position: sticky;
    top: 104px;
    .thumb {
      overflow: hidden;
      position: relative;
      padding-top: 100%;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.sub};
      .btnUpload {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        cursor: pointer;
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
        input {
          ${hidden};
        }
      }
      .imageNone {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.2s ease-out;
        svg {
          position: relative;
          font-size: 6rem;
          color: ${({ theme }) => theme.main};
        }
      }
      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      &:hover {
        .btnUpload {
          opacity: 1;
        }
        .imageNone {
          opacity: 0;
        }
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

  @media screen and (max-width: 768px) {
    width: 100%;
    .summaryInner {
      .thumb {
        height: 100%;
        .btnUpload {
          opacity: 1;
        }
      }
    }
  }
`;

export const MoimCreateInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  margin-left: 24px;

  @media screen and (max-width: 768px) {
    margin-top: 24px;
    margin-left: 0;
    padding-top: 24px;
    border-top: 1px solid ${color.gray};
  }
`;

export const MoimCreateBaseWrap = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin-top: 24px;
    margin-left: 0;
    padding-top: 24px;
    border-top: 1px solid ${color.gray};
  }
`;

export const MoimCreateTypeWrap = styled.div`
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

export const MoimCreateTitleWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    padding: 0;
    min-height: 40px;
    ${({ isEdit }) =>
      isEdit &&
      css`
        padding: 12px;
      `};
    h3,
    textarea {
      font-size: 2rem;
      line-height: 40px;
    }
  }
`;

export const MoimCreateLockWrap = styled.div`
  display: flex;
  gap: 0 12px;
  margin-top: 12px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
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
    .passNumber {
      display: flex;
      flex: 1;
      gap: 0 6px;
      width: 270px;
      li {
        display: flex;
        flex: 1;
        input {
          display: block;
          width: 100%;
          height: 40px;
          padding: 0;
          border-radius: 4px;
          background-color: ${({ theme }) => theme.sub};
          text-align: center;
          font-size: 0.875rem;
          font-weight: 600;
          color: ${({ theme }) => theme.title};
          &:-webkit-autofill {
            -webkit-text-fill-color: ${({ theme }) => theme.title};
            box-shadow: 0 0 0 1000px ${({ theme }) => theme.main} inset;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .lockContent {
      flex-direction: column;
      gap: 6px 0;
    }
  }
`;

export const MoimCreatePayInfoWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .payContent {
      flex-direction: column;
      gap: 6px 0;
      .payInfo {
        padding: 0;
        border-left: 0;
      }
      .payInput {
        width: 100%;
        margin-right: 0;
      }
    }
  }
`;

export const MoimCreateStatusWrap = styled.div`
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

export const MoimCreateUrlWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .urlContent {
      button {
        svg {
          opacity: 1;
        }
      }
    }
  }
`;

export const MoimCreateTagWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .tagContent {
      .tagInput {
        width: 100%;
      }
    }
  }
`;

export const MoimCreateDescriptionWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .desciptionBox {
      .description {
        ${({ isEdit, theme }) =>
          css`
            padding: ${!isEdit ? '8px 0 0' : '8px 12px'};
            background-color: ${!isEdit ? color.none : theme.sub};
            color: ${theme.text};
          `};
        line-height: 24px;
      }
    }
  }
`;

export const MoimCreateAdditionalWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .tabContent {
      padding-top: 100%;
    }
  }
`;

export const MoimCreateTabItem = styled.li`
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

export const MoimCreateScheduleWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .dateInner {
      padding: 12px;
      width: 50%;
      font-size: 1.5rem;
      .dateBox {
        padding-top: 100%;
        width: 100%;
        height: 0;
        .weekDot {
          top: 9px;
          svg {
            font-size: 0.5rem;
          }
          span {
            padding: 0 10px;
            height: 20px;
            font-size: 0.625rem;
            line-height: 20px;
          }
        }
        .day {
          position: absolute;
          top: 50%;
          left: 50%;
          font-size: 4rem;
          transform: translate(-50%, -50%);
        }
        .btnCalendar {
          bottom: -88px;
          button {
            width: 40px;
            height: 40px;
            svg {
              font-size: 0.75rem;
              opacity: 1;
            }
          }
        }
      }
    }
    .progress {
      display: none;
    }
    .progressMobile {
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
        color: ${({ theme }) => theme.title};
      }
    }
  }
`;

export const MoimCreateMapWrap = styled.div`
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

  @media screen and (max-width: 768px) {
    .locationWrap {
      max-width: 100%;
    }
  }
`;

export const MoimCreateMapForm = styled.form`
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

  @media screen and (max-width: 768px) {
    span {
      button {
        svg {
          opacity: 1;
        }
      }
    }
  }
`;

export const MoimCreateMemberWrap = styled.div`
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
            img,
            svg {
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
              img,
              svg {
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
                .payment {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  position: absolute;
                  top: 4px;
                  right: 4px;
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
                  top: 4px;
                  left: 4px;
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

  @media screen and (max-width: 768px) {
    padding: 12px;
    .memberInner {
      .memberTop {
        flex-direction: column;
        .memberCount {
          .countWrap {
            .countEdit {
              .btnWrap {
                button {
                  svg {
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
        .memberClient {
          margin-top: 12px;
        }
      }
      .memberList {
        margin-top: 24px;
        .listHead {
          position: relative;
          .left {
            .counts {
              display: none;
            }
            .info {
              display: block;
              button {
                position: relative;
                z-index: 20;
              }
              .counts {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 20;
                padding: 4px 12px;
                border-radius: 4px;
                background-color: ${({ theme }) => theme.title};
                .count {
                  margin: 4px 0;
                  color: ${({ theme }) => theme.main};
                }
                .separator {
                  display: none;
                }
              }
            }
          }
          .btnMember {
            span {
              svg {
                opacity: 1;
              }
            }
          }
        }
        .listBody {
          ul {
            li {
              width: calc((100% - 36px) / 4);
              .listBox {
                .listInner {
                  .index {
                    font-size: 1rem;
                    line-height: 16px;
                  }
                  .avatar {
                    width: 36px;
                    height: 36px;
                    &.isClient,
                    &.isStaff {
                      svg {
                        font-size: 1rem;
                      }
                    }
                  }
                  .btnRemove,
                  .payment {
                    width: 16px;
                    height: 16px;
                    svg {
                      font-size: 0.5rem;
                    }
                  }
                  .name {
                    height: 16px;
                    font-size: 0.625rem;
                    line-height: 16px;
                  }
                }
              }
            }
          }
        }
        &:nth-child(2) {
          .listHead {
            .left {
              .info {
                button {
                  ${({ isMemberInfoOpen }) =>
                    isMemberInfoOpen &&
                    css`
                      background-color: ${({ theme }) => theme.theme};
                    `};
                }
              }
            }
          }
        }
        &:nth-child(3) {
          .listHead {
            .left {
              .info {
                button {
                  ${({ isWaiterInfoOpen }) =>
                    isWaiterInfoOpen &&
                    css`
                      background-color: ${({ theme }) => theme.theme};
                    `};
                }
              }
            }
          }
        }
      }
    }
  }
`;
