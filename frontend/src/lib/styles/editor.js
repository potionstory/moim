import { css } from 'styled-components';

const editor = css`
  .ck-editor,
  .ck-editor__main,
  .ck-editor__editable:not(.ck-editor__nested-editable) {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100% !important;
    color: #202020;
  }
  .ck-sticky-panel__content {
    position: relative !important;
    z-index: 0 !important;
  }
`;

export default editor;
