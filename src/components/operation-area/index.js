import React from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { Button, Divider } from '@finxos/ui-components';
import { setBlockData, setSelection } from '@finxos/tools';

import './style.scss';
export default props => {
  const { blocks } = useSettings();
  const { selectedBlocks } = useControls();
  const editor = useSlate();
  const { lastSelection } = useControls();

  let currentBlock = null;

  if (selectedBlocks.length) {
    currentBlock = blocks.find(v => v.name === selectedBlocks[0].type);
  }

  return currentBlock && currentBlock.operation ? (
    <>
      <div className="finxos-operation-area">
        {currentBlock.operation({
          data: selectedBlocks[0].data,
          editor,
          setBlockData: data => {
            setBlockData(editor, currentBlock.name, data);
            setSelection(editor, lastSelection);
          },
        })}
      </div>
      {props.divider ? <Divider /> : null}
    </>
  ) : null;
};
