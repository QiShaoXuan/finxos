import { Node, Transforms, Range } from 'slate';

export const setBlockData = (editor, type, data, options = {}) => {
  const root = Node.get(editor, Range.start(editor.selection));
  const [, first] = Node.first(root, editor.selection.anchor.path);
  const [, last] = Node.last(root, editor.selection.anchor.path);

  Transforms.setNodes(
    editor,
    {
      data,
    },
    {
      mode: 'all',
      at: {
        anchor: {
          path: first,
        },
        focus: {
          path: last,
        },
      },
      match: n => n.type === type,
      ...options,
    }
  );
};

export const createBlock = (editor, path, node) => {
  editor.apply({
    type: 'insert_node',
    path: path,
    node,
  });
};

export const getBlock = (editor, path) => {
  return Node.get(editor, path);
};

export const removeBlock = (editor, path, node) => {
  editor.apply({
    type: 'remove_node',
    path,
    node,
  });
};

export const transformBlock = (editor, path, from, to) => {
  removeBlock(editor, path, from);
  createBlock(editor, path, to);
};
