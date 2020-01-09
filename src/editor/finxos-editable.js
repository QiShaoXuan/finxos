import { Editable, useSlate } from 'slate-react';

import React, { useCallback } from 'react';
import { renderElement, renderLeaf } from './untils';
import toggleFormat from '@Finxos/tools/toogle-format';
import { useFormatSettingsContext } from '@Finxos/hooks/use-format-settings';
import { useBlockSettingsContext } from '@Finxos/hooks/use-block-settings';
import './style.scss';

export default props => {
  const editor = useSlate();
  const formatSettings = useFormatSettingsContext();
  const blockSettings = useBlockSettingsContext();

  return (
    <Editable
      editor={editor}
      renderElement={useCallback(props => renderElement(props, blockSettings), [])}
      renderLeaf={useCallback(props => renderLeaf(props, formatSettings), [])}
      onKeyDown={event => {
        const renderFormat = formatSettings.find(v => v.shortcut && v.shortcut(event));
        if (!renderFormat) {
          return;
        }
        event.preventDefault();
        toggleFormat(editor, renderFormat.name);
      }}
    />
  );
};
