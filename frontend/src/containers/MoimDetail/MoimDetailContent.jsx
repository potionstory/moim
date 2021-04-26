import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MoimDetailContentWrap } from './style';

const MoimDetailContent = () => {
  return (
    <MoimDetailContentWrap>
      <div className="editorInner">
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
          }}
        />
      </div>
    </MoimDetailContentWrap>
  );
};

export default MoimDetailContent;
