import styled from 'styled-components';

export const IconListWrap = styled.div`
  ul {
    display: flex;
    margin: 0 -6px;
    li {
      overflow: hidden;
      margin: 0 6px;
      border-radius: 4px;
    }
  }
  .icon {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sub};
  }
`;

export const IconButton = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.sub};
  opacity: ${({ isChecked }) => isChecked ? 1 : 0.6};
  transition: all 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
  svg {
    font-size: 1rem;
    color: ${({ theme }) => theme.title};
  }
  .cover {
    display: ${({ isChecked }) => isChecked ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.title};
      opacity: 0.6;
      content: '';
    }
    svg {
      position: relative;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.main};
    }
  }
`;
