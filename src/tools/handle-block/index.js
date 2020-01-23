export const setBlockData = (editor, path, data) => {
  editor.apply({
    type: 'set_node',
    path: path,
    properties: {},
    newProperties: {
      data,
    },
  });
};
