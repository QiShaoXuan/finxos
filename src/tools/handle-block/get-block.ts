import { Node, Editor, Path } from 'slate';

export const getBlock = (editor: Editor, path: Path) => {
  return Node.get(editor, path);
};
