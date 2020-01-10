import React from 'react';
import { createPortal } from 'react-dom';
import { Range } from 'slate';
import { useSlate, useFocused } from 'slate-react';
import { useSettingContext } from '@Finxos/hooks/use-setting';

import ToolbarButton from './toolbar-button';

import './style.scss';

export default props => {
  const { formats } = useSettingContext();

  const editor = useSlate();
  const focused = useFocused();

  const { selection } = editor;

  const position = () => {
    if (focused && selection && !Range.isCollapsed(selection)) {
      const domSelection = window.getSelection();
      const domRange = domSelection && domSelection.getRangeAt(0);
      const rect = domRange && domRange.getBoundingClientRect();
      return {
        top: `${rect.top + window.pageYOffset}px`,
        left: `${rect.left + window.pageXOffset + rect.width / 2}px`,
      };
    } else {
      return { left: 0, top: 0 };
    }
  };

  return createPortal(
    <div className="finxos-toolbar" style={{ ...position() }}>
      <div className="toolbar-wrapper">
        {formats.map(format => (
          <ToolbarButton format={format} key={format.name} />
        ))}
      </div>
    </div>,
    document.body
  );
};
