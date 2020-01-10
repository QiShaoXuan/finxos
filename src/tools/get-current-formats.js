import { Editor } from 'slate';

export default editor => {
  return Editor.marks(editor) ? Editor.marks(editor) : {};
};
