import styled from 'styled-components';
import { ellipsis } from '../../lib/styles/util';

export const MenuWrap = styled.div`
  display: flex;
  position: relative;
  margin-left: 24px;
  .menuBox {
    display: flex;
    flex: 1;
    flex-direction: column;
    position: absolute;
    top: 96px;
    right: -288px;
    width: 240px;
    padding: 12px;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 16px 0px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.main};
    transition: all 0.2s ease-out;
  }
`;

export const Avatar = styled.button`
  overflow: hidden;
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.sub};
  border-radius: 24px;
  background-color: ${({ theme }) => theme.sub};
  transition: all 0.2s ease-out;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    border-color: ${({ theme }) => theme.theme};
  }
  ${({ theme, isActive }) => isActive && `border-color: ${theme.theme};`};
  svg {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.gray};
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
      overflow: hidden;
      height: 48px;
      padding-right: 12px;
      img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        border: 4px solid ${({ theme }) => theme.sub};
        border-radius: 24px;
        background-color: ${({ theme }) => theme.sub};
        transition: all 0.2s ease-out;
      }
      span {
        flex: 1;
        height: 48px;
        margin-left: 12px;
        font-weight: 700;
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
      font-weight: 800;
    }
  }
`;

export const Menus = styled.ul`
  li {
    margin-top: 12px;
  }
`;
