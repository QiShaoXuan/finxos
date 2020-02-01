import { Node, Transforms, Range, Editor } from 'slate';

export const getBlockRange = (editor, start) => {
  const path = start || [editor.selection.anchor.path[0]];
  const block = Node.get(editor, path);

  return {
    anchor: blockAnchor(block, path),
    focus: blockFocus(block, path),
  };
};
const blockAnchor = (parent, path) => {
  if (parent.children) {
    return blockAnchor(parent.children[0], [...path, 0]);
  } else {
    return {
      path,
      offset: 0,
    };
  }
};

const blockFocus = (parent, path) => {
  if (parent.children) {
    return blockFocus(parent.children[parent.children.length - 1], [...path, parent.children.length - 1]);
  } else {
    return {
      path,
      offset: parent.text.length,
    };
  }
};

export const setBlockData = (editor, type, data, options = {}) => {
  Transforms.setNodes(
    editor,
    {
      data,
    },
    {
      mode: 'all',
      at: getBlockRange(editor),
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

export const transformBlock = (editor, { type, data = {} }, options = {}) => {
  console.log('type,data', type, data);

  return Transforms.setNodes(editor, {
    type,
    data,
  });

  const obj = {
    mode: 'all',
    at: Range.isCollapsed(editor.selection) ? getBlockRange(editor) : editor.selection,
    match: n => n.type === type,
    ...options,
  };
};
