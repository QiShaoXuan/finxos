import React, { useCallback, useMemo } from 'react';
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
    return selectedBlocks.length ? blocks.find(v => v.name === selectedBlocks[0].type) : null;
  }, [selectedBlocks]);

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
            formatShortcuts[key].assist.map((v: string) => event[v]).every((v:boolean) => v)
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
