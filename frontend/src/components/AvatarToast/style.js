import styled from 'styled-components';
import { ellipsis } from '../../lib/styles/util';

export const AvatarToastWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 240px;
  padding: 12px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.main};
  transition: all 0.2s ease-out;

  @media screen and (max-width: 768px) {
    border-radius: 0 0 0 4px;
    box-shadow: none;
  }
`;

export const Member = styled.div`
  .profile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 1px solid ${({ theme }) => theme.sub};
    .user {
      display: flex;
      align-items: center;
      overflow: hidden;
      height: 48px;
      padding-right: 12px;
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        width: 40px;
        height: 40px;
        border-radius: 24px;
        background-color: ${({ theme, isImage }) =>
          isImage ? theme.sub : theme.theme};
        transition: all 0.2s ease-out;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        svg {
          font-size: 1.6rem;
          color: ${({ theme, isImage }) =>
            isImage ? theme.gray : theme.title};
        }
      }
      .name {
        flex: 1;
        height: 48px;
        margin-left: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme.title};
        line-height: 48px;
        ${ellipsis};
      }
    }
  }
`;

export const NonMember = styled.div`
  display: flex;
  flex-direction: column;
  .ghost {
    padding: 12px;
    text-align: center;
    svg {
      font-size: 10rem;
      color: ${({ theme }) => theme.gray};
    }
  }
  .text {
    display: block;
    overflow: hidden;
    font-size: 1rem;
    color: ${({ theme }) => theme.title};
    line-height: 1.6rem;
    text-align: center;
    b {
      font-weight: 600;
    }
  }
`;

export const Menus = styled.ul`
  li {
    margin-top: 12px;
  }
`;
