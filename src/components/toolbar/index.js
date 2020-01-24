import React from 'react';
import { createPortal } from 'react-dom';
import { Range } from 'slate';
import { useSlate, useFocused } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';

import ToolbarButton from './toolbar-button';

import './style.scss';

export default props => {
  const { protal = document.body } = props;
  const { blocks, formats } = useSettings();
  const { selectedBlocks } = useControls();

  const editor = useSlate();
  const focused = useFocused();

  const { selection } = editor;

  const position = () => {
    if (focused && selection && !Range.isCollapsed(selection)) {
      const domSelection = window.getSelection();
      const domRange = domSelection && domSelection.getRangeAt(0);
      const rect = domRange && domRange.getBoundingClientRect();
      return {
        top: `${rect.top + window.pageYOffset}px`,
        left: `${rect.left + window.pageXOffset + rect.width / 2}px`,
      };
    } else {
      return { left: 0, top: 0 };
    }
  };

  return createPortal(
    <div className="finxos-toolbar" style={{ ...position() }}>
      <div className="toolbar-wrapper">
        {formats.map(format => {
          if (format.toolbar === false) {
            return null;
          }
          if (selectedBlocks.length > 1 && format.acrossBlock === false) {
            return null;
          }

          for (let i = 0; i < selectedBlocks.length; i++) {
            const block = blocks.find(v => v.name === selectedBlocks[i].type);

            if (block.preventFormats && block.preventFormats.includes(format.name)) {
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
