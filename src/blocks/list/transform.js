import { Transforms, Range } from 'slate';
import { getBlockRange } from '@finxos/tools';

export default [
  {
    name: 'paragraph',
    data: data => {
      return {};
    },
    options: {
      match: n => n.type === 'list-item',
    },
    before: editor => {
      Transforms.unwrapNodes(editor, {
        match: n => n.type === 'list',
        split: true,
        mode: 'all',
        at: Range.isCollapsed(editor.selection) ? getBlockRange(editor) : editor.selection,
      });
    },
    after: editor => {
      editor.children.forEach((child, i) => {
        if (child.type === 'list-item') {
          Transforms.setNodes(
            editor,
            {
              type: 'paragraph',
            },
            {
              mode: 'highest',
              at: [i],
              match: n => n.type === 'list-item',
            }
          );
        }
      });
    },
  },
];
