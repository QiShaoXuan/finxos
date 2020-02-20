import React from 'react';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { useSettings, useControls } from '@finxos/hooks';
import { getBlock, transformBlock } from '@finxos/tools';
import { IconButton } from '@finxos/ui-components';

import './style.scss';

export default props => {
  if (!props.currentBlockSetting) {
    return null;
  }
  const { blocks } = useSettings();
  const { currentBlockSetting, currentBlock } = props;
  const editor = useSlate();
  const { selection } = editor;

  const { transform } = currentBlockSetting;

  return transform && Array.isArray(transform) && transform.length ? (
    <ul className="finxos-transform-menu">
      {transform.map(to => {
        const block = blocks.find(v => v.name === to.name);
        return (
          <li
            key={to.name}
            onMouseDown={e => {
              // e.preventDefault();
              to.before && to.before(editor);
              transformBlock(
                editor,
                {
                  type: to.name,
                  data: to.data
                    ? typeof to.data === 'function'
                      ? to.data(JSON.parse(JSON.stringify(currentBlock.data)))
                      : to.data
                    : JSON.parse(JSON.stringify(block.data)),
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
