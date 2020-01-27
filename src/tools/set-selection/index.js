import { ReactEditor } from 'slate-react';

export default (editor, selection) => {
  return new Promise(resolve => {
    if (!selection) {
      throw Error('no selection');
    }
    setTimeout(() => {
      if (!editor.selection) {
        ReactEditor.focus(editor);
      }
      editor.apply({
        type: 'set_selection',
        properties: editor.selection,
        newProperties: selection,
      });
      resolve();
    });
  });
};
