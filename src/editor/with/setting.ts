import { Editor } from 'slate';
import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';

export default (editor: Editor, blocks: BlockSetting[], formats: FormatSetting[]) => {
  editor.setting = {
    blocks,
    formats,
  };

  return editor;
};
