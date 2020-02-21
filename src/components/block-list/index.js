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
  return transform.target ? (
    <ul className="finxos-transform-menu">
      {transform.target
        ? transform.target.map(name => {
            const targetBlockSetting = blocks.find(v => v.name === name);
            return (
              <li
                key={name}
                onMouseDown={e => {
                  // e.preventDefault();
                  const to = transform.to
                    ? transform.to({ children: currentBlock.children, data: currentBlock.data })
                    : { children: currentBlock.children, data: currentBlock.data };

                  let from = targetBlockSetting.transform.from ? targetBlockSetting.transform.from(to) : to;

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
                    type: name,
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
// {transform.map(to => {
//   const block = blocks.find(v => v.name === to.name);
//   return (
//     <li
//       key={to.name}
//       onMouseDown={e => {
//         // e.preventDefault();
//         to.before && to.before(editor);
//         transformBlock(
//           editor,
//           {
//             type: to.name,
//             data: to.data
//               ? typeof to.data === 'function'
//                 ? to.data(deepClone(currentBlock.data))
//                 : Object.assign(deepClone(block.data), to.data)
//               : JSON.parse(deepClone(block.data)),
//           },
//           to.options
//         );
//         to.after && to.after(editor);
//       }}
//     >
//       <IconButton icon={block.icon} />
//     </li>
//   );
// })}
