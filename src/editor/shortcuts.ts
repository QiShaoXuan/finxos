import { KeyboardEvent } from 'react';
import { Editor, Node, Range } from 'slate';

export default (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {
  if (event.shiftKey && event.keyCode === 13) {
    event.preventDefault();
    editor.insertText('\n');
  }

  if (editor.selection && Range.isCollapsed(editor.selection) && event.keyCode === 191) {
    const node = Node.get(editor, editor.selection.anchor.path);
    if (node.text === '') {
      event.preventDefault();
      console.log('showlist');
    }
  }
};
