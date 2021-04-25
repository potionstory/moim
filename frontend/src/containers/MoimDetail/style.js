import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const MoimDetailWrap = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
`;

export const MoimDetailBase = styled.div`
  display: flex;
  .info {
    width: 220px;
    .thumb {
      overflow: hidden;
      height: 220px;
      border-radius: 4px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .summary {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    margin-left: 24px;
  }
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
  .amount {
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
    .amountInput {
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
          padding: ${!isEdit ? '6px 0' : '6px 12px'};
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

export const MoimDetailInfo = styled.div``;
