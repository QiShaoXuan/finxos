import React from 'react';
import { useSlate } from 'slate-react';
import { useSettings } from '@finxos/hooks';
import { transformBlock, deepClone } from '@finxos/tools';
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
  return transform && transform.target ? (
    <ul className="finxos-transform-menu">
      {transform.target
        ? transform.target.map(tragetName => {
            const targetBlockSetting = blocks.find(v => v.name === tragetName);
            return (
              <li
                key={tragetName}
                onMouseDown={e => {
                  // e.preventDefault();
                  const to = transform.to
                    ? transform.to({ children: currentBlock.children, data: currentBlock.data })
                    : { children: currentBlock.children, data: currentBlock.data, to: tragetName };

                  let from = targetBlockSetting.transform.from
                    ? targetBlockSetting.transform.from(Object.assign({}, to, { from: currentBlockSetting.name }))
                    : to;

                  // Set default value if has no return
                  if (!from) {
                    return console.error(
                      `transform.from has not return any params in ${targetBlockSetting.name} setting`
                    );
                  }
                  from.children = from.children || [{ text: '' }];
                  from.data = from.data || {};

                  // Process data to prevent additional or missing parameters
                  let data = {};
                  for (let key in targetBlockSetting.data) {
                    data[key] = from.data[key] || targetBlockSetting.data[key];
                  }

                  transformBlock(editor, [selection.anchor.path[0]], {
                    type: tragetName,
                    children: from.children,
                    data,
                  });
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
