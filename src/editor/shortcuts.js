import { Editor } from 'slate';
import { setSelection, deepClone } from '@finxos/tools';
import { transformBlock } from '@finxos/blocks';

export default (event, editor) => {
  if (event.keyCode === 13) {
    const { focus } = editor.selection;
    if (Editor.isEnd(editor, focus, focus.path)) {
      event.preventDefault();
      const path = [editor.selection.focus.path[0] + 1];
      editor.apply({
        type: 'insert_node',
        path,
        node: {
          type: transformBlock.name,
          children: [{ text: '' }],
          data: deepClone(transformBlock.data),
        },
      });

      setSelection(editor, {
        anchor: {
          path: [...path, 0],
          offset: 0,
        },
        focus: {
          path: [...path, 0],
          offset: 0,
        },
      });
    }
  }

  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }
};
