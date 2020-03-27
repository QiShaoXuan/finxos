import React from 'react';
import { Node } from 'slate';

import { useSlate } from 'slate-react';
import { convertBlock } from '@finxos/tools';
import { IconButton } from '@finxos/ui-components';
import { BlockSetting } from '@finxos/blocks';

import './style.scss';
import { useControls } from '@finxos/hooks';

export default () => {
  const editor = useSlate();
  const { selectedBlocks, selectedBlockSettings } = useControls();

  if (!selectedBlocks.length || !selectedBlocks.slice(1).every(v => v[0].type === selectedBlocks[0][0].type)) {
    return null;
  }

  const {
    settings: { blocks },
  } = editor;
  const [currentBlockSetting] = selectedBlockSettings;
  const [currentBlock] = selectedBlocks[0];

  const { transform } = currentBlockSetting;
  return transform && transform.target ? (
    <ul className="finxos-transform-menu">
      {transform.target
        ? transform.target.map(targetName => {
            const targetBlockSetting = blocks.find((v: BlockSetting) => v.name === targetName);
            return (
              <li
                key={targetName}
                onMouseDown={() => {
                  console.log('currentBlock, targetName', currentBlock, targetName);

                  // convertBlock(editor, { currentBlock, targetName });
                }}
              >
                <IconButton icon={targetBlockSetting.icon} />
              </li>
            );
          })
        : null}
    </ul>
  ) : null;
};
