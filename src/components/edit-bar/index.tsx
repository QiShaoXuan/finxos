import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { OperationArea } from '@finxos/components';
import { Range } from 'slate';
import { ReactEditor, useFocused, useSlate } from 'slate-react';
import { useControls } from '@finxos/hooks';
import { IconButton } from '@finxos/ui-components';
import { TransformList } from '@finxos/components';
import { Divider } from '@finxos/ui-components';
import { BlockSetting } from '@finxos/blocks';

import icon from './icon.svg';
import './style.scss';

export default (props: { protal?: HTMLElement }) => {
  const { selectedBlocks, selectedBlockSettings } = useControls();
  const editor = useSlate();

  if (!selectedBlocks.length || !selectedBlocks.slice(1).every(v => v[0].type === selectedBlocks[0][0].type)) {
    return null;
  }

  const { protal = document.body } = props;

  const [selectedBlock] = selectedBlocks[0];
  const [currentBlockSetting] = selectedBlockSettings;
  const selectedBlockDom = ReactEditor.toDOMNode(editor, selectedBlock);

  const { left, top } = selectedBlockDom.getBoundingClientRect();

  return createPortal(
    <div className="finxos-edit-bar" style={{ left: left - 40, top }}>
      <IconButton icon={icon} className="finxos-edit-bar__edit-button" />
      <div className="edit-bar__popup-container">
        <div className="edit-bar__popup">
          <OperationArea />
          {currentBlockSetting.transform && currentBlockSetting.operation ? <Divider /> : null}
          <TransformList />
        </div>
      </div>
    </div>,
    protal
  );

  // return createPortal(
  //   currentBlockSetting &&
  //     (currentBlockSetting.operation || (currentBlockSetting.transform && currentBlockSetting.transform.target)) ? (
  //     <div style={{ left: position.left, top: position.top }} className={`finxox-edit-bar`}>
  //       <IconButton icon={icon} className="finxox-edit-bar__edit-button" />
  //       <div className="edit-bar__popup-container">
  //         <div className="edit-bar__popup">
  //           {/*<OperationArea currentBlockSetting={currentBlockSetting} currentBlock={selectedBlocks[0]} />*/}
  //           {currentBlockSetting && currentBlockSetting.transform && currentBlockSetting.operation ? <Divider /> : null}
  //           {/*<TransformList currentBlockSetting={currentBlockSetting} currentBlock={selectedBlocks[0]} />*/}
  //         </div>
  //       </div>
  //     </div>
  //   ) : null,
  //   protal
  // );
};
