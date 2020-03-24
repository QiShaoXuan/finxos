import { Editor, Node } from 'slate';
import { deepClone } from '@finxos/tools';
import { BlockSetting } from '@finxos/blocks/interface';

export const convertBlock = (
  editor: Editor,
  params: {
    currentBlock: Node;
    targetName: any;
    path?: number[];
  }
) => {
  if (editor.selection === null) {
    return;
  }
  const {
    settings: { blocks },
  } = editor;
  const { currentBlock, targetName, path = [deepClone(editor.selection.anchor.path[0])] } = params;

  const currentBlockSetting = blocks.find((v: BlockSetting) => v.name === currentBlock.type);

  const { transform = {} } = currentBlockSetting;
  const targetBlockSetting = blocks.find((v: BlockSetting) => v.name === targetName);

  const to = transform.to
    ? transform.to({ children: currentBlock.children, data: currentBlock.data })
    : { children: currentBlock.children, data: currentBlock.data, to: targetName };

  let from = targetBlockSetting.transform.from
    ? targetBlockSetting.transform.from(Object.assign({}, to, { from: currentBlockSetting.name }))
    : to;

  // Set default value if has no return
  if (!from) {
    return console.error(`transform.from has not return any params in ${targetBlockSetting.name} setting`);
  }
  from.children = from.children || [{ text: '' }];
  from.data = from.data || {};

  // Process data to prevent additional or missing parameters
  let data = {};
  for (let key in targetBlockSetting.data) {
    data[key] = from.data[key] || targetBlockSetting.data[key];
  }

  // let p = path || [deepClone(editor.selection.anchor.path[0])];

  editor.apply({
    type: 'insert_node',
    path,
    node: {
      type: targetName,
      children: from.children,
      data,
    },
  });
  editor.apply({
    type: 'remove_node',
    path: [path[0] + 1],
    node: {
      children: [],
    },
  });
};
