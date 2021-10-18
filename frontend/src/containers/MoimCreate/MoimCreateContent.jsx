import React, { memo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MoimCreateContent = memo(() => {
  return (
    <CKEditor
      editor={ClassicEditor}
      data="<p>Hello from CKEditor 5!</p>"
      onChange={(event, editor) => {
        const data = editor.getData();
        console.log(data);
      }}
    />
  );
});

export default MoimCreateContent;
