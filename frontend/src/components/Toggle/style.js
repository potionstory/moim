import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const ToggleWrap = styled.div`
  padding: 8px 0;
  label {
    display: block;
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
    .toggleBar {
      -webkit-appearance: none;
      display: inline-block;
      margin-right: 8px;
      width: 40px;
      height: 24px;
      border: 4px solid ${({ isChecked }) => isChecked ? color.blue : color.gray};;
      border-radius: 12px;
      vertical-align: middle;
      transition: all 0.2s ease-out;
      .toggleActive {
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background-color: ${({ isChecked }) => isChecked ? color.blue : color.gray};;
      }
    }
    &:hover {
      color: ${({ theme }) => theme.main};
      .toggleBar {
        border-color: ${color.blue};
      }
    }
  }
`;
