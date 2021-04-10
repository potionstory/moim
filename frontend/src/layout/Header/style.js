import styled from 'styled-components';
import { color } from '../../lib/styles/palette';
import { ellipsis } from '../../lib/styles/util';

export const HeaderWrap = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 96px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.main};
  z-index: 50;
  .avatarToast {
    position: fixed;
    top: 144px;
    right: -336px;
  }
`;

export const HeaderInnder = styled.div`
  display: flex;
  width: 1280px;
  margin: 0 auto;
`;

export const LeftHead = styled.div`
  display: flex;
  padding: 24px 0;
  .modeToggle {
    margin-left: 24px;
    label {
      display: block;
      width: 80px;
      height: 40px;
      padding: 4px;
      background-color: ${({ isLight }) =>
        isLight ? color.orange : color.blue};
      border-radius: 24px;
      font-weight: 600;
      color: ${({ isLight, theme }) => (isLight ? theme.main : theme.gray)};
      text-transform: uppercase;
      cursor: pointer;
      transition: all 0.2s ease-out;
      input {
        display: none;
        width: initial;
        height: initial;
      }
      .activeBar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.main};
        svg {
          font-size: 1.5rem;
          color: ${({ isLight }) => (isLight ? color.orange : color.blue)};
        }
      }
    }
  }
`;

export const Logo = styled.h1`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const ModeToggle = styled.button`
  display: block;
  width: 48px;
  height: 48px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.theme};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  text-align: center;
  line-height: 48px;
  transition: all 0.2s ease-out;
`;

export const RightHead = styled.div`
  display: flex;
  flex: 1;
  padding: 24px 0;
  align-items: center;
  justify-content: flex-end;
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul`
  display: flex;
`;

export const MenuItem = styled.li`
  padding-left: 12px;
  &:first-child {
    padding-left: 0;
  }
`;

export const Avatar = styled.button`
  overflow: hidden;
  margin-left: 24px;
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.sub};
  border-radius: 24px;
  background-color: ${({ theme, isImageNone }) =>
    !isImageNone ? theme.sub : theme.theme};
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
    color: ${({ theme, isImageNone }) =>
      !isImageNone ? theme.gray : theme.main};
  }
`;
