import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { OperationArea } from '@finxos/components';
import { Range } from 'slate';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { IconButton } from '@finxos/ui-components';
import { BlockList } from '@finxos/components';
import { Divider } from '@finxos/ui-components';

import icon from './icon.svg';
import './style.scss';

export default props => {
  const { protal = document.body } = props;

  const { blocks } = useSettings();
  const { editorDom, selectedBlocks } = useControls();

  const focused = useFocused();
  const editor = useSlate();
  const { selection } = editor;

  const [position, setPosition] = useState({ left: -100, top: -100 });

  useEffect(() => {
    if (focused && selection) {
      const domBlock = editorDom.childNodes[selection.anchor.path[0]];
      const domRect = domBlock.getBoundingClientRect();
      const lineHeight = Number(window.getComputedStyle(domBlock)['line-height'].replace('px', ''));

      setPosition({
        top: `${domRect.top + (lineHeight - 24) / 2}px`,
        left: `${domRect.left - 40}px`,
      });
    } else {
      setPosition({ left: -1000, top: -1000 });
    }
  }, [focused, selection, selection && !Range.isCollapsed(selection)]);

  const currentBlockSetting = useMemo(() => {
    let blockSetting = null;
    if (selectedBlocks.length) {
      blockSetting = blocks.find(v => v.name === selectedBlocks[0].type);
    }
    return blockSetting;
  }, [position.top, position.left]);

  return createPortal(
    <div style={{ ...position }} className={`finxox-edit-bar`}>
      <IconButton icon={icon} className="finxox-edit-bar__edit-button" />
      <div className="edit-bar__popup-container">
        <div className="edit-bar__popup">
          <OperationArea currentBlockSetting={currentBlockSetting} />
          <Divider />
          <BlockList currentBlockSetting={currentBlockSetting} currentBlock={selectedBlocks[0]} />
        </div>
      </div>
    </div>,
    protal
  );
};
