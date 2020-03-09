import { Editor } from 'slate';
import { ReactEditor } from 'slate-react';

export const setSelection = (editor: Editor, selection: any) => {
  return new Promise(resolve => {
    if (!selection) {
      throw Error('no selection');
    }
    setTimeout(() => {
      ReactEditor.focus(<ReactEditor>editor);
      editor.apply({
        type: 'set_selection',
        properties: editor.selection,
        newProperties: selection,
      });
      resolve();
    });
  });
};
