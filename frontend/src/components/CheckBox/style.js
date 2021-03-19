import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const CheckBoxWrap = styled.div`
  position: relative;
  padding: 8px 0;
  label {
    position: relative;
    font-size: 0.750rem;
    font-weight: 600;
    color: ${({ isChecked, theme }) => isChecked ? theme.main : theme.gray};
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease-out;
    input {
      display: none;
      width: initial;
      height: initial;
    }
    &:before {
      -webkit-appearance: none;
      display: inline-block;
      margin-right: 8px;
      width: 16px;
      height: 16px;
      border: 4px solid ${color.blue};
      border-radius: 4px;
      background-color: ${({ isChecked }) => isChecked ? color.blue : color.transparent};
      vertical-align: top;
      content:'';
      transition: all 0.2s ease-out;
    }
    &:hover {
      color: ${({ theme }) => theme.main};
    }
  }
`;