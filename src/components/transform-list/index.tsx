import React from 'react';
import { Node } from 'slate';

import { useSlate } from 'slate-react';
import { convertBlock } from '@finxos/tools';
import { IconButton } from '@finxos/ui-components';
import { BlockSetting } from '@finxos/blocks';

import './style.scss';

export default (props: { currentBlockSetting: BlockSetting; currentBlock: Node }) => {
  if (!props.currentBlockSetting) {
    return null;
  }

  const { currentBlockSetting, currentBlock } = props;
  const editor = useSlate();

  const {
    setting: { blocks },
  } = editor;

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
                  convertBlock(editor, { currentBlock, targetName });
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
