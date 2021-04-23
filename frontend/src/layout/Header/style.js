import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const HeaderWrap = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.08);
  background-color: ${({ theme }) => theme.main};
  z-index: 50;
  .avatarToast {
    position: fixed;
    top: 120px;
    right: -320px;
  }
`;

export const HeaderInnder = styled.div`
  display: flex;
  width: 1280px;
  margin: 0 auto;
`;

export const LeftHead = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  .themeToggle {
    margin-left: 24px;
    label {
      display: block;
      position: relative;
      width: 72px;
      height: 40px;
      padding: 4px;
      border-radius: 24px;
      box-sizing: border-box;
      background-color: ${({ theme }) => theme.theme};
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
        width: 32px;
        height: 32px;
        border-radius: 16px;
        background-color: ${({ theme }) => theme.main};
      }
      .activeIcon {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 40px;
        svg {
          font-size: 1.2rem;
          color: ${({ theme }) => theme.main};
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

export const ThemeToggle = styled.button`
  display: block;
  width: 40px;
  height: 40px;
  position: relative;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.theme};
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.main};
  text-align: center;
  line-height: 40px;
  transition: all 0.2s ease-out;
`;

export const RightHead = styled.div`
  display: flex;
  flex: 1;
  padding: 20px 0;
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
  box-sizing: border-box;
  border-radius: 24px;
  background-color: ${({ theme, isImageNone }) =>
    !isImageNone ? theme.sub : theme.theme};
  transition: all 0.2s ease-out;
  svg {
    font-size: 1.6rem;
    color: ${({ theme, isImageNone }) =>
      !isImageNone ? theme.gray : theme.main};
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    background-color: ${({ theme }) => theme.theme};
    svg {
      color: ${({ theme }) => theme.main};
    }
  }
  ${({ theme, isActive }) =>
    isActive &&
    css`
      background-color: ${theme.theme};
      svg {
        color: ${theme.main};
      }
    `};
`;
