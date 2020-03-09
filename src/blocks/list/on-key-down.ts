import { KeyboardEvent } from 'react';
import { Transforms, Range, Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';
import { BlockSetting } from '@finxos/blocks';
import { removeBlock, getBlock, insertBlock, setSelection, getBlockRange } from '@finxos/tools';
import { defaultBlock } from '@finxos/blocks';

export default (event: KeyboardEvent, editor: Editor, selectedBlocks: Node[]) => {
  if (editor.selection === null) {
    return;
  }
  // on tap 'tab' key
  if (event.keyCode === 9) {
    event.preventDefault();
    const listItem = selectedBlocks.find((v: Node) => v.type === 'list-item');
    if (listItem) {
      const path = ReactEditor.findPath(<ReactEditor>editor, listItem);

      if (path[path.length - 1] !== 0) {
        Transforms.wrapNodes(editor, { type: 'list', children: [], data: listItem.data });
      }
    }
    return;
  }

  if (event.keyCode === 13 && Range.isCollapsed(editor.selection)) {
    const path = editor.selection.focus.path;
    const { text } = getBlock(editor, path);

    if (
      text === '' &&
      path.length === 3 &&
      path[path.length - 1] === 0 &&
      editor.children[path[0]][path[1] + 1] === undefined
    ) {
      event.preventDefault();
      removeBlock(editor, path.slice(0, path.length - 1));
      insertBlock(editor, { path: [path[0] + 1], targetName: defaultBlock.name });
      setSelection(editor, getBlockRange(editor, [path[0] + 1]));

      return;
    }
  }

  // on tap 'delete' key
  // if (event.keyCode === 8) {
  //   const listItem = selectedBlocks.find(v => v.type === 'list-item');
  //   const path = ReactEditor.findPath(editor, listItem);
  //
  //   if (Range.isCollapsed(editor.selection) && editor.selection.anchor.offset === 0 && path[path.length - 1] === 0) {
  //     event.preventDefault();
  //
  //     const list = selectedBlocks.reverse().find(v => v.type === 'list');
  //     const listPath = ReactEditor.findPath(editor, list);
  //     const unwrapRange = getBlockRange(editor, listPath);
  //
  //     Transforms.unwrapNodes(editor, {
  //       mode: 'all',
  //       match: n => {
  //         const p = ReactEditor.findPath(editor, n);
  //
  //         return (
  //           listPath.length >= p.length && listPath[listPath.length - 1] <= p[listPath.length - 1] && n.type === 'list'
  //         );
  //       },
  //       at: unwrapRange,
  //       split: true,
  //     });
  //
  //     return;
  //   }
  // }
};

const findUnwrapPath = (parent: Node, path: number[]) => {
  return parent.children.reduce((group: any[], child: Node, i: number) => {
    if (child.type === 'list-item') {
      group.push([...path, i]);
    }
    if (child.type === 'list') {
      group.push(...findUnwrapPath(child, [...path, i]));
    }
    return group;
  }, []);
};
