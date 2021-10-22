import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
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
    position: absolute;
    top: 120px;
    right: -320px;
  }

  @media screen and (max-width: 768px) {
    height: 60px;
    .avatarToast {
      top: 60px;
    }
  }
`;

export const HeaderInnder = styled.div`
  display: flex;
  position: relative;
  width: 1280px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: auto;
    padding: 0 10px;
  }
`;

export const LeftHead = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  h1 {
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.theme};
      font-size: 1.6rem;
      font-weight: 600;
      color: ${({ theme }) => theme.title};
    }
  }
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
        background-color: ${({ theme }) => theme.title};
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
          color: ${({ theme }) => theme.title};
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    padding: 10px 0;
    .themeToggle {
      margin-left: 12px;
    }
  }
`;

export const RightHead = styled.div`
  display: flex;
  flex: 1;
  padding: 20px 0;
  align-items: center;
  justify-content: flex-end;
  
  @media screen and (max-width: 768px) {
    padding: 10px 0;
  }
`;

export const MenuBar = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: ${({ active, theme }) => active ? theme.theme : theme.sub};
  text-align: center;
  transition: all 0.2s ease-out;
  svg {
    font-size: 1rem;
    color: ${({ active, theme }) => active ? theme.title : theme.gray};
    vertical-align: middle;
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

export const Menu = styled.div`
  display: flex;
  align-items: center;
`;

export const MenuList = styled.ul`
  display: flex;
  gap: 10px 12px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MenuListMobile = styled(motion.ul)`
  @media screen and (min-width: 768px) {
    display: none !important;
  }
 
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px 0;
    position: absolute;
    top: 60px;
    right: 0;
    padding: 10px;
    border-bottom-left-radius: 4px;
    background-color: ${({ theme }) => theme.main};
  }
`;

export const MenuItem = styled.li`
  @media screen and (max-width: 768px) {
    width: 100%;
    button {
      justify-content: flex-start;
      width: 100%;
    }
  }
`;

export const AvatarBox = styled.button`
  overflow: hidden;
  margin-left: 24px;
  width: 34px;
  height: 34px;
  border: 3px solid ${color.gray};
  border-radius: 20px;
  background-color: ${({ theme, isImage }) =>
    isImage ? theme.sub : theme.theme};
  transition: all 0.2s ease-out;
  svg {
    font-size: 1.6rem;
    color: ${({ theme, isImage }) => (isImage ? theme.gray : theme.title)};
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover {
    border-color: ${({ theme }) => theme.theme};
    background-color: ${({ theme }) => theme.theme};
    svg {
      color: ${({ theme }) => theme.title};
    }
  }
  ${({ theme, isActive }) =>
    isActive &&
    css`
      border-color: ${({ theme }) => theme.theme};
      background-color: ${theme.theme};
      svg {
        color: ${theme.title};
      }
    `};

  @media screen and (max-width: 768px) {
    margin-left: 12px;
  }
`;
