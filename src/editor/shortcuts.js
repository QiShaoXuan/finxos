import { Node, Editor } from 'slate';
export default (event, editor) => {
  if (event.keyCode === 13) {
    const { focus } = editor.selection;
    if (Editor.isEnd(editor, focus, focus.path)) {
      event.preventDefault();
      editor.apply({
        type: 'insert_node',
        path: [editor.selection.focus.path[0] + 1],
        node: {
          type: 'paragraph',
          children: [{ text: 'aaa' }],
          data: { align: 'center' },
        },
      });
    }
  }

  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }
};
