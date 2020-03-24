import React, { useCallback, useMemo } from 'react';
import { Node } from 'slate';
import { Editable, Slate, useSlate } from 'slate-react';
import { renderElement, renderLeaf } from './untils';
import { toggleFormat } from '@finxos/tools';
import globalShortcut from './shortcuts';
import './style.scss';

export default () => {
  const editor = useSlate();

  // const blockSetting = useMemo(() => {
  //   return selectedBlocks.length === 1 ? blocks.find(v => v.name === selectedBlocks[0].type) : null;
  // }, [editor.selection]);
  //
  // console.log('editor.selection', editor.selection);
  //
  // if (editor.selection) {
  //   console.log(
  //     'Node.ancestor(root: Node, path: Path)',
  //     editor.selection.focus.path,
  //     Node.ancestor(editor, editor.selection.focus.path.slice(0, editor.selection.focus.path.length - 1))
  //   );
  //   console.log('Node.get', Node.get(editor, editor.selection.focus.path));
  //   console.log('', [...Node.ancestors(editor, editor.selection.focus.path)]);
  // }

  return (
    <Editable
      // @ts-ignore
      editor={editor}
      renderElement={useCallback(renderElement, [])}
      renderLeaf={useCallback(renderLeaf, [])}
      onKeyDown={event => {
        // Current block keydown is first level,
        // handle custom global shortcut after,
        // foramt shortcut is lastest
        // if (selectedBlocks.length) {
        //   blockSetting && blockSetting.onKeyDown && blockSetting.onKeyDown(event, editor, selectedBlocks);
        // }
        globalShortcut(event, editor);
        //
        // for (let key in formatShortcuts) {
        //   if (
        //     formatShortcuts[key].keyCode === event.keyCode &&
        //     formatShortcuts[key].assist.map((v: string) => event[v]).every((v: boolean) => v)
        //   ) {
        //     event.preventDefault();
        //     const handleFormat = formats.find(v => v.name === key);
        //     handleFormat && toggleFormat(editor, handleFormat);
        //     return;
        //   }
        // }
      }}
    />
  );
};
