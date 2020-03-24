import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { Range } from 'slate';
import { useSlate, useFocused, ReactEditor } from 'slate-react';
import { useControls } from '@finxos/hooks';
import ToolbarButton from './toolbar-button';
import { BlockSetting } from '@finxos/blocks';
import { FormatSetting } from '@finxos/formats';
import './style.scss';

export default (props: { protal?: HTMLElement }) => {
  const editor = useSlate();
  const { showToolBar } = useControls();

  if (!showToolBar) {
    return null;
  }

  const { protal = document.body } = props;

  const rect = ReactEditor.toDOMRange(editor, editor.selection as Range).getBoundingClientRect();

  const {
    settings: { blocks, formats },
  } = editor;

  const position = {
    top: `${rect.top + window.pageYOffset}px`,
    left: `${rect.left + window.pageXOffset + rect.width / 2}px`,
  };

  return createPortal(
    <div className="finxos-toolbar" style={{ ...position }}>
      <div className="toolbar-wrapper">
        {formats.map((format: FormatSetting) => {
          if (format.toolbar === false) {
            return null;
          }
          // if (selectedBlocks.length > 1 && format.acrossBlock === false) {
          //   return null;
          // }

          // for (let i = 0; i < selectedBlocks.length; i++) {
          //   const block = blocks.find((v: BlockSetting) => v.name === selectedBlocks[i].type);
          //
          //   if (block && block.preventFormats && block.preventFormats.includes(format.name)) {
          //     return null;
          //   }
          // }

          return <ToolbarButton format={format} key={format.name} />;
        })}
      </div>
    </div>,
    protal
  );
};

const fn = (props: { protal?: HTMLElement }) => {
  const { protal = document.body } = props;
  const { selectedBlocks } = useControls();
  const editor = useSlate();
  const focused = useFocused();
  const {
    settings: { blocks, formats },
  } = editor;

  const { selection } = editor;

  const [position, setPosition] = useState<{ left: number | string; top: number | string }>({ left: -100, top: -100 });

  useEffect(() => {
    if (focused && selection && !Range.isCollapsed(selection)) {
      const rect = ReactEditor.toDOMRange(editor, selection).getBoundingClientRect();
      setPosition({
        top: `${rect.top + window.pageYOffset}px`,
        left: `${rect.left + window.pageXOffset + rect.width / 2}px`,
      });
    } else {
      setPosition({ left: -100, top: -100 });
    }
  }, [focused, selection, selection && !Range.isCollapsed(selection)]);

  return createPortal(
    <div className="finxos-toolbar" style={{ ...position }}>
      <div className="toolbar-wrapper">
        {formats.map((format: FormatSetting) => {
          if (format.toolbar === false) {
            return null;
          }
          if (selectedBlocks.length > 1 && format.acrossBlock === false) {
            return null;
          }

          for (let i = 0; i < selectedBlocks.length; i++) {
            const block = blocks.find((v: BlockSetting) => v.name === selectedBlocks[i].type);

            if (block && block.preventFormats && block.preventFormats.includes(format.name)) {
              return null;
            }
          }

          return <ToolbarButton format={format} key={format.name} />;
        })}
      </div>
    </div>,
    protal
  );
};
