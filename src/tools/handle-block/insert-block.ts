import { Editor, Path } from 'slate';
import { BlockSetting } from '@finxos/blocks/interface';

export const insertBlock = (
  editor: Editor,
  options: { path: Path; targetName: string; children?: { text: string; [key: string]: any }[] }
) => {
  const {
    setting: { blocks },
  } = editor;
  const { path, targetName, children } = options;
  const targetBlockSetting = blocks.find((v: BlockSetting) => v.name === targetName);
  const to = { children: children, data: {}, to: null };
  let from = targetBlockSetting.transform.from
    ? targetBlockSetting.transform.from(Object.assign({}, to, { from: null }))
    : to;

  let data = {};
  from.children = from.children || children;
  from.data = from.data || {};

  for (let key in targetBlockSetting.data) {
    data[key] = from.data[key] || targetBlockSetting.data[key];
  }

  editor.apply({
    type: 'insert_node',
    path,
    node: {
      type: targetName,
      children: from.children,
      data,
    },
  });
};
