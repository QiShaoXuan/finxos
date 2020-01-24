import React from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { createBlock } from '@finxos/tools';

export default props => {
  const { blocks } = useSettings();
  const { selectedBlocks } = useControls();
  const editor = useSlate();
  const { selection } = editor;
  const { editorDom, lastSelection } = useControls();

  let BlockTransform = null;
  if (selectedBlocks.length) {
    BlockTransform = blocks.find(v => v.name === selectedBlocks[0].type)['transform'];
  }
  console.log('BlockTransform', BlockTransform);

  return BlockTransform ? <div></div> : null;
};
