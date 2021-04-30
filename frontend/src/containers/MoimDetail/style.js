import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const MoimDetailWrap = styled.section`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
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

export const MoimDetailTitle = styled.div`
  height: 92px;
  margin-top: 12px;
  padding: 12px 0;
  line-height: 92px;
  ${({ isEdit }) =>
    isEdit &&
    css`
      padding: 12px 24px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.sub};
    `};
  h3 {
    font-size: 4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    ${ellipsis};
  }
  input {
    width: 100%;
    height: 92px;
    font-size: 4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
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
    .contentInner {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${color.gray};
      .contentBox {
        display: none;
        height: 100%;
        &:nth-child(${({ activeIndex }) => activeIndex + 1}) {
          display: block;
        }
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

export const MoimDetailDateWrap = styled.div`
  display: flex;
`;