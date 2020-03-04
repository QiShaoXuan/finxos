import { Editor } from 'slate';

export const isBlockActive = (editor: Editor, blockName: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === blockName,
    mode: 'all',
  });

  return !!match;
};
