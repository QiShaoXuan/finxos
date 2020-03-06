import { Editor } from 'slate';
import { BlockSetting } from '@finxos/blocks';

export default (editor: Editor, blocks: BlockSetting[]) => {
  const { isVoid } = editor;
  editor.isVoid = element => {
    if (element.type) {
      const block = blocks.find(v => v.name === element.type);
      return block ? !!block.isVoid : false;
    }
    return false;
  };
  return editor;
};
