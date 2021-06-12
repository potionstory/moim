import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const CheckBoxWrap = styled.div`
  position: relative;
  padding: 8px 0;
  label {
    display: flex;
    align-items: center;
    position: relative;
    font-size: 0.75rem;
    font-weight: 800;
    color: ${({ isChecked, isInverse, theme }) =>
      isChecked ? (isInverse ? theme.main : theme.title) : theme.gray};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease-out;
    input {
      display: none;
      width: initial;
      height: initial;
    }
    .required {
      display: flex;
      align-items: flex-start;
      height: 24px;
      svg {
        font-size: 0.5rem;
        color: ${color.red};
      }
    }
    &:before {
      -webkit-appearance: none;
      display: inline-block;
      margin-right: 8px;
      width: 16px;
      height: 16px;
      border: 4px solid ${({ theme }) => theme.theme};
      border-radius: 4px;
      background-color: ${({ isChecked, theme }) =>
        isChecked ? theme.theme : color.none};
      vertical-align: top;
      content: '';
      transition: all 0.2s ease-out;
    }
    &:hover {
      color: ${({ isInverse, theme }) =>
        isInverse ? theme.main : theme.title};
    }
  }
`;
