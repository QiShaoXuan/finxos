import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { OperationArea } from '@finxos/components';
import { Range } from 'slate';
import { useFocused, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { IconButton } from '@finxos/ui-components';
import { TransformList } from '@finxos/components';
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

  const [position, setPosition] = useState();

  useEffect(() => {
    if (focused && selection) {
      const domBlock = editorDom.childNodes[selection.anchor.path[0]];
      const domRect = domBlock.getBoundingClientRect();
      const lineHeight = Number(window.getComputedStyle(domBlock)['line-height'].replace('px', ''));
      setPosition({
        top: `${domRect.top + (lineHeight - 20) / 2}px`,
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
  }, [position, selectedBlocks]);

  return createPortal(
    currentBlockSetting &&
      (currentBlockSetting.operation || (currentBlockSetting.transform && currentBlockSetting.transform.target)) ? (
      <div style={{ ...position }} className={`finxox-edit-bar`}>
        <IconButton icon={icon} className="finxox-edit-bar__edit-button" />
        <div className="edit-bar__popup-container">
          <div className="edit-bar__popup">
            <OperationArea currentBlockSetting={currentBlockSetting} currentBlock={selectedBlocks[0]} />
            {currentBlockSetting && currentBlockSetting.transform ? <Divider /> : null}
            <TransformList currentBlockSetting={currentBlockSetting} currentBlock={selectedBlocks[0]} />
          </div>
        </div>
      </div>
    ) : null,
    protal
  );
};
