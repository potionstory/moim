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
  height: 4rem;
  margin-top: 12px;
  padding: 12px 0;
  line-height: 4rem;
  ${({ isEdit }) =>
    isEdit &&
    css`{
      padding: 12px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.title};
    `};
  h3 {
    font-size: 4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    ${ellipsis};
  }
  input {
    height: 4rem;
    font-size: 4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
  }
`;

export const MoimDetailStatusWrap = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  button.icon,
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
      color: ${({ status, theme }) =>
        status === 'open' ? color.blue : theme.title};
      transition: all 0.2s ease-out;
    }
  }
  button.icon {
    svg {
      opacity: ${({ isEdit }) => (isEdit ? 0.6 : 1)};
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`;

export const MoimDetailTags = styled.div`
  margin-top: 12px;
`;

export const MoimDetailInfo = styled.div``;
