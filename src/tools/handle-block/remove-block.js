export default (editor, path) => {
  editor.apply({
    type: 'remove_node',
    path,
    node: {
      children: [],
    },
  });
};
