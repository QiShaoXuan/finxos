import React from 'react';
import { Node } from 'slate';
import { useSlate } from 'slate-react';
import { useControls } from '@finxos/hooks';
import { setBlockData } from '@finxos/tools';
import { BlockSetting } from '@finxos/blocks';

import './style.scss';

export default (props: { currentBlockSetting: BlockSetting; currentBlock: Node }) => {
  if (!props.currentBlockSetting || !props.currentBlock) {
    return null;
  }

  const { selectedBlocks } = useControls();
  const { currentBlockSetting, currentBlock } = props;
  const editor = useSlate();

  return currentBlockSetting && currentBlockSetting.operation ? (
    <>
      <div className="finxos-operation-area">
        {currentBlockSetting.operation({
          currentData: currentBlock.data,
          setBlockData: (data, options = {}) => {
            setBlockData(editor, Object.assign({}, selectedBlocks[0].data, data), options);
          },
        })}
      </div>
    </>
  ) : null;
};
