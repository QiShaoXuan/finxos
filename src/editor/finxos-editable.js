import { Editor } from 'slate';
import { Editable, useSlate } from 'slate-react';

import React, { useCallback } from 'react';
import { renderElement, renderLeaf } from './untils';
import { toggleFormat } from '@finxos/tools';
import { useSettings, useControls } from '@finxos/hooks';
import './style.scss';

export default props => {
  const editor = useSlate();
  const { selectedBlocks } = useControls();
  const { formats, blocks } = useSettings();

  return (
    <Editable
      editor={editor}
      renderElement={useCallback(renderElement, [])}
      renderLeaf={useCallback(renderLeaf, [])}
      onKeyDown={event => {
        // if (selectedBlocks.length === 1) {
        //   const block = blocks.find(v => v.name === selectedBlocks[0].type);
        //   block.edit && block.edit(event);
        // }
        const renderFormat = formats.find(v => v.shortcut && v.shortcut(event));
        if (!renderFormat) {
          return;
        }
        event.preventDefault();
        toggleFormat(editor, renderFormat);
      }}
    />
  );
};
