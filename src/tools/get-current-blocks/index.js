import { Editor } from 'slate';

export default editor => {
  return editor.selection === null ? [] : [...Editor.fragment(editor, editor.selection)];
};
