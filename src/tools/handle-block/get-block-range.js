import { Node } from 'slate';

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

export default (editor, start) => {
  const path = start || [editor.selection.anchor.path[0]];
  const block = Node.get(editor, path);

  return {
    anchor: blockAnchor(block, path),
    focus: blockFocus(block, path),
  };
};
