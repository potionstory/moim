import { css } from 'styled-components';

const editor = css`
  .ck-editor,
  .ck-editor__main,
  .ck-editor__editable:not(.ck-editor__nested-editable) {
    height: 100% !important;
    color: #000;
  }
  .ck-sticky-panel__content {
    position: relative !important;
    z-index: 0 !important;
  }
`;

export default editor;
