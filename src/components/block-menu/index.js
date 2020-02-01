import React from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { getBlock, transformBlock } from '@finxos/tools';
import { IconButton } from '@finxos/ui-components';

import './style.scss';

export default props => {
  const { blocks } = useSettings();
  const { selectedBlocks } = useControls();
  const editor = useSlate();
  const { selection } = editor;

  let path = [];
  let BlockTransform = null;
  let currentBlock = null;
  if (selectedBlocks.length) {
    path = selection.anchor.path.slice(0, selection.anchor.path.length - 1);
    currentBlock = selectedBlocks[0];
    BlockTransform = blocks.find(v => v.name === currentBlock.type)['transform'];
  }

  return BlockTransform && Array.isArray(BlockTransform) && BlockTransform.length ? (
    <ul>
      {BlockTransform.map(to => {
        const block = blocks.find(v => v.name === to.name);
        return (
          <li
            key={to.name}
            onMouseDown={e => {
              e.preventDefault();
              to.before && to.before(editor);
              transformBlock(
                editor,
                {
                  type: to.name,
                  data: to.data
                    ? typeof to.data === 'function'
                      ? to.data(JSON.parse(JSON.stringify(currentBlock.data)))
                      : to.data
                    : {},
                },
                to.options
              );
              to.after && to.after(editor);
            }}
          >
            <IconButton icon={block.icon} />
          </li>
        );
      })}
    </ul>
  ) : null;
};
