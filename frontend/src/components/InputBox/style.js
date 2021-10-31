import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const InputBoxWrap = styled.div`
  display: flex;
  overflow: hidden;
  background-color: ${({ theme }) => theme.sub};
  border-radius: 4px;
  input {
    width: calc(100% - 40px);
    height: 40px;
    padding: 8px 12px;
    box-sizing: border-box;
    ${({ isNumber }) =>
      isNumber &&
      css`
        font-family: 'Rubik';
      `};
    font-size: 1rem;
    font-weight: 600;
    color: ${({ color, theme }) => (color ? color : theme.title)};
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.theme};
    svg {
      font-size: 1rem;
      color: ${({ theme }) => theme.title};
      opacity: 0.6;
      transition: all 0.2s ease-out;
    }
    &:hover {
      svg {
        opacity: 1;
      }
    }
  }
`;
