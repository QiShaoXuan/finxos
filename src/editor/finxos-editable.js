import { Editable, useSlate } from 'slate-react';

import React, { useCallback } from 'react';
import { renderElement, renderLeaf } from './untils';
import { toggleFormat } from '@finxos/tools';
import { useSettings } from '@finxos/hooks';
import './style.scss';

export default props => {
  const editor = useSlate();

  const { formats } = useSettings();

  return (
    <Editable
      editor={editor}
      renderElement={useCallback(renderElement, [])}
      renderLeaf={useCallback(renderLeaf, [])}
      onKeyDown={event => {
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
