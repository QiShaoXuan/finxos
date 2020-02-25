export default (editor, { blocks, path, targetName, children = [{ text: '' }] }) => {
  const targetBlockSetting = blocks.find(v => v.name === targetName);
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
