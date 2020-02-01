import { Editor } from 'slate';

export default editor => {
  return editor.selection === null
    ? []
    : [...Editor.nodes(editor, editor.selection)].filter(v => v[0].type).map(v => v[0]);
};
