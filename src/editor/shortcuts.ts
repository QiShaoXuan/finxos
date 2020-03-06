import { KeyboardEvent } from 'react';
import { Editor } from 'slate';

export default (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {
  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }
};
