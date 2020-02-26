import React from 'react';
import { useSlate } from 'slate-react';
import { useSettings } from '@finxos/hooks';
import { convertBlock } from '@finxos/tools';
import { IconButton } from '@finxos/ui-components';

import './style.scss';

export default props => {
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
            const targetBlockSetting = blocks.find(v => v.name === targetName);
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
