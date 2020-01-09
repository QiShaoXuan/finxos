import { Editable, useSlate } from 'slate-react';
import React, { useCallback } from 'react';

import { renderElement, renderLeaf } from './untils';
import './style.scss';

export default props => {
  const editor = useSlate();
  const { blocks, formats } = props;
  return (
    <Editable
      editor={editor}
      renderElement={useCallback(props => renderElement(props, blocks), [])}
      renderLeaf={useCallback(props => renderLeaf(props, formats), [])}
      // onKeyDown={event => {
      //   const renderBlock = BlockSettings.find(v => v.shortcut && v.shortcut(event))
      //   const renderFormat = FormatSettings.find(v => v.shortcut && v.shortcut(event))
      //   if (renderBlock && renderFormat) {
      //     console.error(
      //       `Shortcut is same in block setting "${renderBlock.name}" and format setting "${renderFormat.name}"`
      //     )
      //     return
      //   }
      //
      //   // if (renderBlock) {
      //   //   event.preventDefault()
      //   //   const isActive = isActiveBlock(editor, renderBlock.name)
      //   //   Transforms.setNodes(
      //   //     editor,
      //   //     { type: isActive ? null : renderBlock.name },
      //   //     {
      //   //       match: n => Editor.isBlock(editor, n),
      //   //     }
      //   //   )
      //   // }
      //
      //   if (renderFormat) {
      //     event.preventDefault()
      //     const isActive = isActiveFormat(editor, renderFormat.name)
      //     Transforms.setNodes(
      //       editor,
      //       { [renderFormat.name]: isActive ? null : true },
      //       { match: n => Text.isText(n), split: true }
      //     )
      //   }
      // }}
    />
  );
};
