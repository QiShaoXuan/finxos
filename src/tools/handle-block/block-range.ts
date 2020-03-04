import { Node, Editor, Path } from 'slate';

const blockAnchor = (parent: Node, path: Path): { path: Path; offset: number } => {
  if (parent.children) {
    return blockAnchor(parent.children[0], [...path, 0]);
  } else {
    return {
      path,
      offset: 0,
    };
  }
};

const blockFocus = (parent: Node, path: Path): { path: Path; offset: number } => {
  if (parent.children) {
    return blockFocus(parent.children[parent.children.length - 1], [...path, parent.children.length - 1]);
  } else {
    return {
      path,
      offset: parent.text.length,
    };
  }
};

export const getBlockFocus = (editor: Editor, start: Path) => {
  if (editor.selection === null) {
    return undefined;
  }
  const path = start || [editor.selection.anchor.path[0]];
  const block = Node.get(editor, path);

  const focus = blockFocus(block, path);
  return {
    anchor: focus,
    focus: focus,
  };
};

export const getBlockRange = (editor: Editor, start?: number[]) => {
  if (editor.selection === null) {
    return undefined;
  }
  const path = start || [editor.selection.anchor.path[0]];
  const block = Node.get(editor, path);

  return {
    anchor: blockAnchor(block, path),
    focus: blockFocus(block, path),
  };
};
