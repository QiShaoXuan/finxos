import { Editor, Path } from 'slate';

export const removeBlock = (editor: Editor, path: Path) => {
  editor.apply({
    type: 'remove_node',
    path,
    node: {
      children: [],
    },
  });
};
