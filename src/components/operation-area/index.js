import React, { useEffect } from 'react';
import { useSlate } from 'slate-react';
import { useControls } from '@finxos/hooks';
import { setBlockData } from '@finxos/tools';

import './style.scss';

export default props => {
  const { selectedBlocks } = useControls();
  const { currentBlockSetting } = props;
  const editor = useSlate();

  return currentBlockSetting && currentBlockSetting.operation ? (
    <>
      <div className="finxos-operation-area">
        {currentBlockSetting.operation({
          data: currentBlockSetting.data,
          setBlockData: (data, options) => {
            setBlockData(editor, currentBlockSetting.name, Object.assign({}, selectedBlocks[0].data, data), options);
          },
        })}
      </div>
    </>
  ) : null;
};
