import { Node } from 'slate';

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
