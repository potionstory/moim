import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const EventTopWrap = styled.div`
  position: relative;
  z-index: 30;
  margin-bottom: 2rem;
  .eventTop {
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  h2 {
    display: flex;
    flex-grow: 0;
    height: 4rem;
    margin-top: 2rem;
    font-size: 4rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    text-transform: uppercase;
    line-height: 4rem;
    transition: all 0.2s ease-out;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 1rem;
    h2 {
      margin-top: 1rem;
      height: 2.5rem;
      font-size: 2.5rem;
      line-height: 2.5rem;
    }
  }
`;

export const EventTopTabWrap = styled.div`
  display: flex;
  position: relative;
  .activeBar {
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
  .btnCreate {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    transition: all 0.2s ease-out;
    svg {
      font-size: 2rem;
      color: ${({ theme }) => theme.title};
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        color: ${({ theme }) => theme.theme};
      }
    }
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
      color: ${({ isActive, theme }) => (!isActive ? theme.gray : theme.title)};
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        color: ${({ theme }) => theme.title};
      }
    }
  }
`;
