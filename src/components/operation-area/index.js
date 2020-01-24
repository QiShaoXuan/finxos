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
  const { selection } = editor;
  const { editorDom, lastSelection } = useControls();

  let BlockOperation = null;
  if (selectedBlocks.length) {
    BlockOperation = blocks.find(v => v.name === selectedBlocks[0].type)['operation'];
  }

  return BlockOperation ? (
    <>
      <div className="finxos-operation-area">
        {BlockOperation({
          data: selectedBlocks[0].data,
          setBlockData: data => {
            setBlockData(
              editor,
              selection.anchor.path.slice(0, selection.anchor.path.length - 1),
              Object.assign({}, selectedBlocks[0].data, data)
            );
            setSelection(editor, editorDom, lastSelection);
          },
        })}
      </div>
      {props.divider ? <Divider /> : null}
    </>
  ) : null;
};
