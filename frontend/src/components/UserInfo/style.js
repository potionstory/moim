import styled from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const UserInfoWrap = styled.div`
  display: flex;
  max-height: 40px;
  margin-top: 12px;
  justify-content: space-between;
  .user {
    display: flex;
    overflow: hidden;
    height: 40px;
    padding: 0 12px;
    img {
      width: 34px;
      height: 34px;
      border: 3px solid ${color.gray};
      border-radius: 20px;
      background-color: ${({ theme }) => theme.main};
      object-fit: cover;
      transition: all 0.2s ease-out;
    }
    span {
      flex: 1;
      height: 40px;
      margin-left: 12px;
      font-size: 0.75rem;
      font-weight: 400;
      color: ${({ theme }) => theme.gray};
      line-height: 40px;
      ${ellipsis};
      b {
        font-weight: 600;
        color: ${({ theme }) => theme.title};
        transition: all 0.2s ease-out;
      }
    }
    &:hover {
      img {
        border-color: ${({ theme }) => theme.theme};
      }
      b {
        color: ${({ theme }) => theme.theme};
      }
    }
  }
  .like {
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: ${({ theme }) => theme.theme};
    span {
      flex: 1;
      height: 36px;
      margin-left: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      line-height: 36px;
    }
  }
`;
