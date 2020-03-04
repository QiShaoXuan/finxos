import { Transforms, Editor } from 'slate';
import { getBlockRange } from '@finxos/tools';

export const setBlockData = (editor: Editor, data: {} = {}, options: {} = {}) => {
  Transforms.setNodes(
    editor,
    {
      data,
    },
    {
      mode: 'all',
      at: getBlockRange(editor),
      ...options,
    }
  );
};
