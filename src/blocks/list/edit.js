import { Transforms, Range } from 'slate';
import { ReactEditor } from 'slate-react';
import { getBlockRange } from '@finxos/tools';

export default (event, editor, selectedBlocks) => {
  const listItem = selectedBlocks.find(v => v.type === 'list-item');
  const path = ReactEditor.findPath(editor, listItem);

  if (event.keyCode === 9) {
    event.preventDefault();

    if (path[path.length - 1] !== 0) {
      Transforms.wrapNodes(editor, { type: 'list', children: [], data: listItem.data });
    }

    return;
  }

  if (
    event.keyCode === 8 &&
    Range.isCollapsed(editor.selection) &&
    editor.selection.anchor.offset === 0 &&
    path[path.length - 1] === 0
  ) {
    event.preventDefault();

    const list = selectedBlocks.reverse().find(v => v.type === 'list');
    const listPath = ReactEditor.findPath(editor, list);
    const unwrapRange = getBlockRange(editor, listPath);

    Transforms.unwrapNodes(editor, {
      mode: 'all',
      match: n => {
        // console.log('n', n, ReactEditor.findPath(editor, n));
        const p = ReactEditor.findPath(editor, n);

        return (
          listPath.length >= p.length && listPath[listPath.length - 1] <= p[listPath.length - 1] && n.type === 'list'
        );
      },
      at: unwrapRange,
      split: true,
    });

    return;
  }
};

const findUnwrapPath = (parent, path) => {
  return parent.children.reduce((group, child, i) => {
    if (child.type === 'list-item') {
      group.push([...path, i]);
    }
    if (child.type === 'list') {
      group.push(...findUnwrapPath(child, [...path, i]));
    }
    return group;
  }, []);
};
