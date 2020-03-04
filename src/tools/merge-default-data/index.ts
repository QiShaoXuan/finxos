import { deepClone } from '@finxos/tools';
import { Node } from 'slate';
import { BlockSetting } from '@finxos/blocks/interface';

export const mergeDefaultData = (content: Node[], blocks: BlockSetting[]) => {
  setData(content, blocks);
  return content;
};

const setData = (children: Node[], blocks: BlockSetting[]) => {
  children.forEach(child => {
    if (child.type && !child.data) {
      const setting = blocks.find(v => v.name === child.type);
      child.data = setting && setting.data ? deepClone(setting.data) : {};
    }

    if (child.children) {
      setData(child.children, blocks);
    }
  });
};
