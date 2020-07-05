import styled from 'styled-components';

export const TabTitleWrap = styled.div`
  .tabTitle {
    display: flex;
    position: relative;
    margin-bottom: 2rem;
    .activeBox {
      position: absolute;
      top: 0;
      width: 86px;
      height: 86px;
      border-radius: 4px;
      background-color: ${({ theme }) => theme.theme};
    }
    ul {
      display: flex;
      flex-direction: row;
      position: relative;
    }
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

export const TabButton = styled.li`
  position: relative;
  /* margin: 0 12px; */
  button {
    position: relative;
    width: 86px;
    height: 86px;
    border-radius: 4px;
    svg {
      font-size: 2rem;
      color: ${({ isActive, theme }) => (!isActive ? theme.gray : theme.main)};
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        color: ${({ isActive, theme }) =>
          !isActive ? theme.theme : theme.main};
      }
    }
  }
`;
