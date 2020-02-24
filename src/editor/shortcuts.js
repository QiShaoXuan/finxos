import { Node, Editor } from 'slate';

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
          type: 'transform',
          children: [{ text: '' }],
        },
      });
    }
  }

  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }
};
