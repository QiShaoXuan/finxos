import React from 'react';
import { useSlate } from 'slate-react';
import { useControls } from '@finxos/hooks';
import { setBlockData } from '@finxos/tools';

import './style.scss';

export default () => {
  const { selectedBlocks, selectedBlockSettings } = useControls();

  if (!selectedBlocks.length || !selectedBlocks.slice(1).every(v => v[0].type === selectedBlocks[0][0].type)) {
    return null;
  }

  const [currentBlockSetting] = selectedBlockSettings;
  const [currentBlock] = selectedBlocks[0];

  const editor = useSlate();

  return currentBlockSetting.operation ? (
    <div className="finxos-operation-area">
      {currentBlockSetting.operation({
        currentData: currentBlock.data,
        setBlockData: (data, options = {}) => {
          setBlockData(editor, Object.assign({}, currentBlock.data, data), options);
        },
      })}
    </div>
  ) : null;
};
