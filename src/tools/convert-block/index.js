import { transformBlock } from '@finxos/tools';
export default (editor, blocks, currentBlock, targetName) => {
  const currentBlockSetting = blocks.find(v => v.name === currentBlock.type);

  const { transform } = currentBlockSetting;
  const targetBlockSetting = blocks.find(v => v.name === targetName);

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

  transformBlock(editor, [editor.selection.anchor.path[0]], {
    type: targetName,
    children: from.children,
    data,
  });
};
