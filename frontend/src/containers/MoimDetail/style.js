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

export const MoimDetailStatusWrap = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  span.icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 12px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
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
    margin-right: 12px;
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
        color: ${({ theme }) => theme.title};
        font-weight: 600;
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

export const MoimDetailInfo = styled.div``;
