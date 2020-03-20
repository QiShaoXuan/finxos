import React, { useCallback, useMemo } from 'react';
import { Node } from 'slate';
import { Editable, Slate, useSlate } from 'slate-react';
import { renderElement, renderLeaf } from './untils';
import { toggleFormat } from '@finxos/tools';
import { useSettings, useControls } from '@finxos/hooks';
import globalShortcut from './shortcuts';
import './style.scss';

export default () => {
  const editor = useSlate();
  const { selectedBlocks } = useControls();
  const { blocks, formats, formatShortcuts } = useSettings();

  const blockSetting = useMemo(() => {
    return selectedBlocks.length === 1 ? blocks.find(v => v.name === selectedBlocks[0].type) : null;
  }, [editor.selection]);
  //
  // console.log('editor.selection', editor.selection);
  //
  if (editor.selection) {
    console.log(
      'Node.ancestor(root: Node, path: Path)',
      editor.selection.focus.path,
      Node.ancestor(editor, editor.selection.focus.path.slice(0, editor.selection.focus.path.length - 1))
    );
    console.log('Node.get', Node.get(editor, editor.selection.focus.path));
    console.log('', [...Node.ancestors(editor, editor.selection.focus.path)]);
  }

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

        if (selectedBlocks.length) {
          blockSetting && blockSetting.onKeyDown && blockSetting.onKeyDown(event, editor, selectedBlocks);
        }

        globalShortcut(event, editor);

        for (let key in formatShortcuts) {
          if (
            formatShortcuts[key].keyCode === event.keyCode &&
            formatShortcuts[key].assist.map((v: string) => event[v]).every((v: boolean) => v)
          ) {
            event.preventDefault();
            const handleFormat = formats.find(v => v.name === key);
            handleFormat && toggleFormat(editor, handleFormat);
            return;
          }
        }
      }}
    />
  );
};


'http://seckillsoatest.jd.local/mRankFloor?clientVersion=8.5.8&build=60254&client=android&d_brand=samsung&d_model=SM-G9300&osVersion=8.0.0&screen=1920*1080&partner=jingdong&androidId=3d086236ed8cacbf&installtionId=6fbaefbf614a4ed0bc0a4922f7890570&sdkVersion=26&lang=zh_CN&uuid=355905071454459-ac5f3ea1633c&area=2_2815_2870_0&networkType=wifi&wifiBssid=unknown&st=1532658249080&sign=04914e5bdf3755f5bb30fd2f3698a84c&sv=110'
