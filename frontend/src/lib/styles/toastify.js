import { css } from 'styled-components';
import { color } from './palette';

const tostify = css`
  :root {
    --toastify-color-light: ${({ theme }) =>
      theme ? theme.title : theme.main} !important;
    --toastify-color-dark: ${color.black} !important;
    --toastify-color-info: ${color.blue} !important;
    --toastify-color-success: ${color.green} !important;
    --toastify-color-warning: ${color.orange} !important;
    --toastify-color-error: ${color.red} !important;

    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);

    --toastify-toast-width: 320px;
    --toastify-toast-background: ${color.white} !important;
    --toastify-toast-min-height: 64px;
    --toastify-toast-max-height: 800px;
    --toastify-font-family: 'Spoqa Han Sans', 'Helvetica Neue', 'Helvetica',
      'Arial', 'Noto', 'Apple Gothic', 'MalgunGothic', sans-serif !important;
    --toastify-z-index: 9999;

    --toastify-text-color-light: ${({ theme }) =>
      theme ? theme.main : theme.title} !important;
    --toastify-text-color-dark: ${color.white} !important;

    // Used when no type is provided
    --toastify-color-progress-dark: var(--toastify-color-dark);
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
  }
  .Toastify__toast-icon {
    width: 40px !important;
    height: 40px !important;
    margin-inline-end: 12px !important;
  }
  .Toastify__toast {
    padding: 12px 12px 17px 12px !important;
  }
  .Toastify__toast-body {
    padding: 0 !important;
  }
  .Toastify__toast-body > div:last-child {
    font-size: 1rem;
    font-weight: bold;
    line-height: 20px;
  }
  .Toastify__close-button {
    width: 40px;
    min-height: 40px;
    line-height: 40px;
  }
  .Toastify__close-button > svg {
    width: 20px !important;
    height: 20px !important;
    color: ${({ theme }) => (theme ? theme.main : theme.title)} !important;
    vertical-align: -5px;
  }
`;

export default tostify;
