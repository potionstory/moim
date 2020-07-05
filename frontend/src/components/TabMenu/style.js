import styled from 'styled-components';

export const TabMenuWrap = styled.div`
  display: flex;
  position: relative;
  .activeBox {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.theme};
  }
  ul {
    display: flex;
    flex-direction: row;
    position: relative;
  }
`;

export const TabButton = styled.li`
  position: relative;
  button {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    svg {
      font-size: 1rem;
      color: ${({ isActive, theme }) => (!isActive ? theme.title : theme.main)};
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
