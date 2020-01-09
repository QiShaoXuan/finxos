import { Editable, useSlate } from 'slate-react';
import React, { useMemo, useState, useCallback } from 'react';
import { createEditor, Transforms, Editor, Text, Node, Range } from 'slate';
import { Slate, withReact, useFocused, useSelected } from 'slate-react';
import { withHistory } from 'slate-history';
import { useSelectedBlocks } from '../hooks/use-active-blocks';

import { renderElement, renderLeaf, isActiveBlock, isActiveFormat } from './untils';
import getCurrentCaretPositionStyle from '../tools/caret-position';

import BlockSettings from '../blocks';
import FormatSettings from '../formats';

import ToolBar from '../components/toolbar';
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
