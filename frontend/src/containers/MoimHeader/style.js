import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const MoimHeaderWrap = styled.div`
  position: relative;
  z-index: 30;
  .moimHeader {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-bottom: 2rem;
  }
  h2 {
    display: flex;
    flex-grow: 0;
    height: 4rem;
    padding-bottom: 2rem;
    font-size: 4rem;
    font-weight: 800;
    color: ${({ theme }) => theme.title};
    text-transform: uppercase;
    line-height: 4rem;
    transition: all 0.2s ease-out;
  }
`;

export const MoimHeaderTabWrap = styled.div`
  position: relative;
  .motionTab {
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
`;

export const TabButton = styled.li`
  position: relative;
  button {
    position: relative;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    svg {
      font-size: 2rem;
      color: ${({ isActive, theme }) => !isActive ? theme.gray : theme.main};
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

export const MoimHeaderUtilWrap = styled.div`
  position: relative;
  .utilList {
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

export const UtilButton = styled.li`
  position: relative;
  button {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 0 4px 4px 0;
    background-color: ${({ isActive, theme }) => isActive && theme.title};
    svg {
      font-size: 1rem;
      color: ${({ isActive, theme }) => !isActive ? theme.gray : color.red};
    }
    &:hover {
      svg {
        color: ${({ isActive, theme }) => !isActive ? theme.title : color.red};
      }
    }
  }
`

export const UtilWrap = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 40px;
  min-width: 296px;
  min-height: 296px;
  padding: 12px;
  box-sizing: border-box;
  border-radius: ${({ isRound }) => `${isRound ? '4px 0 4px 4px' : '4px'}`};
  background-color: ${({ theme }) => theme.title};
`;

export const UtilHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.text};
    svg {
      color: ${({ theme }) => theme.main};
    }
  }
  .info {
    display: flex;
    overflow: hidden;
    flex: 1;
    align-items: center;
    margin-left: 12px;
    h3 {
      display: block;
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.main};
      line-height: 1rem;
      text-transform: uppercase;
    }
    button {
      width: 24px;
      height: 24px;
      margin-left: 6px;
      border-radius: 12px;
      background-color: ${({ theme }) => theme.gray};
      font-size: 0.750rem;
      transition: all 0.2s ease-out;
      svg {
        color: ${({ theme }) => theme.title};
      }
      &:hover {
        background-color: ${({ theme }) => color.green};
      }
    }
  }
`;

export const UtilBody = styled.div`
  display: ${({ isVisible }) => isVisible ? 'flex' : 'none'};
  flex: 1;
  margin-top: 12px;
`;

export const UtilTabMenuWrap = styled.div`
  width: 40px;
`;

export const UtilTabMenu = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.text};
  .activeBox {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({ theme }) => theme.theme};
  }
  ul {
    position: relative;
    li {
      button {
        display: block;
        width: 100%;
        font-size: 0.875rem;
        line-height: 40px;
        svg {
          transition: all 0.2s ease-out;
          color: ${({ theme }) => theme.gray};
        }
        &:hover {
          svg {
            color: ${({ theme }) => theme.main};
          }
        }
      }
      &:nth-child(${({ activeIndex }) => activeIndex}) {
        button {
          svg {
            color: ${({ theme }) => theme.title};
          }
        }
      }
    }
  }
`;

export const UtilTabContentWrap = styled.div`
  flex: 1;
  margin-left: 12px;
`;

export const UtilTabContentBlock = styled.div`
  display: block;
  position: relative;
  padding-top: 100%;
`;

export const UtilTabContentInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .utilTabBox {
    display: none;
    height: 100%;
    &:nth-child(${({ activeIndex }) => activeIndex}) {
      display: block;
    }
  }
`;