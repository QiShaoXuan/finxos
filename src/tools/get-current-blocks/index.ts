import { Editor } from 'slate';

export const getCurrentBlocks = (editor: Editor) => {
  if (editor.selection === null) {
    return [];
  }

  return [...Editor.nodes(editor, { at: editor.selection })].filter(v => v[0].type).map(v => v[0]);
};
