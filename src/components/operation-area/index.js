import React from 'react';
import { useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { Divider } from '@finxos/ui-components';
import { setBlockData } from '@finxos/tools';

import './style.scss';
export default props => {
  const { blocks } = useSettings();
  const { selectedBlocks } = useControls();
  const editor = useSlate();

  let blockSetting = null;

  if (selectedBlocks.length) {
    blockSetting = blocks.find(v => v.name === selectedBlocks[0].type);
  }

  return blockSetting && blockSetting.operation ? (
    <>
      <div className="finxos-operation-area">
        {blockSetting.operation({
          data: selectedBlocks[0].data,
          editor,
          setBlockData: (data, options) => {
            setBlockData(editor, blockSetting.name, Object.assign({}, selectedBlocks[0].data, data), options);
          },
        })}
      </div>
      {props.divider ? <Divider /> : null}
    </>
  ) : null;
};
