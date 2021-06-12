import styled from 'styled-components';
import { color } from '../../lib/styles/palette';

export const ToggleWrap = styled.div`
  padding: 8px 0;
  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 800;
    color: ${({ isChecked, theme }) => (isChecked ? theme.main : theme.gray)};
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
      padding: 4px;
      border-radius: 12px;
      background-color: ${({ isChecked, theme }) =>
        isChecked ? theme.theme : theme.gray};
      vertical-align: middle;
      transition: all 0.2s ease-out;
      .activeBar {
        width: 16px;
        height: 16px;
        border-radius: 8px;
        background-color: ${({ isChecked, theme }) =>
          isChecked ? theme.title : theme.title};
      }
    }
    &:hover {
      .toggleBar {
        background-color: ${({ isChecked, theme }) =>
          isChecked ? theme.theme : theme.main};
      }
      color: ${({ theme }) => theme.main};
      .toggleBar {
        border-color: ${({ theme }) => theme.theme};
      }
    }
  }
`;
