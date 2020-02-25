import { Transforms } from 'slate';
import { getBlockRange } from '@finxos/tools';

export default (editor, data, options = {}) => {
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
