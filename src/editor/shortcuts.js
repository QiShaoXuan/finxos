import { Editor } from 'slate';
import { transformBlock } from '@finxos/blocks';

export default (event, editor) => {
  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }
};
