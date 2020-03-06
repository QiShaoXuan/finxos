import { Transforms, Editor } from 'slate';
import { getBlockRange } from '@finxos/tools';

export const setBlockData = (editor: Editor, data: {} = {}, options: { [key: string]: any } = {}) => {
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
