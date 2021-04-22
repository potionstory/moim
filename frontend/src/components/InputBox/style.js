import styled, { css } from 'styled-components';
import { color } from '../../lib/styles/palette';

export const InputBoxWrap = styled.div`
  margin-top: 1.5rem;
`;

export const InputWrap = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;
  transition: all 0.2s ease-out;
  .inputCheck {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 4px;
    background-color: ${({ isActive, isValue, isCheck, theme }) => {
      if (isCheck) {
        return color.green;
      } else if (isActive) {
        return theme.theme;
      } else if (isValue && !isCheck) {
        return color.red;
      } else {
        return theme.title;
      }
    }};
    color: ${({ isActive, isCheck, theme }) => {
      if (isActive || isCheck) {
        return theme.main;
      } else {
        return theme.main;
      }
    }};
    transition: all 0.2s ease-out;
  }
  input {
    flex: 1;
    width: 100%;
    height: 40px;
    padding: 0 1rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.main};
    ${({ isDisable }) => isDisable && css`opacity: 0.6;`};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.title};
    &:-webkit-autofill {
      -webkit-text-fill-color: ${({ theme }) => theme.title};
      -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.main} inset;
    }
  }
  .inputCheck + input {
    margin-left: 6px;
  }
`;

export const InputSubmit = styled.div`
  margin-top: 12px;
  padding-left: 46px;
  button {
    width: 100%;
    height: 40px;
    box-sizing: content-box;
    border-radius: 4px;
    background-color: ${({ theme, isActive }) =>
      !isActive ? theme.title : color.green};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.main};
    text-transform: uppercase;
    text-align: center;
    transition: all 0.2s ease-out;
  }
`;

export const ValidationText = styled.div`
  margin-top: 24px;
  padding-left: 46px;
  span {
    display: block;
    height: 40px;
    margin-top: 6px;
    padding: 0 1rem;
    border-radius: 4px;
    font-size: 0.875rem;
    background-color: ${color.red};
    color: ${({ theme }) => theme.main};
    line-height: 40px;
  }
`;
