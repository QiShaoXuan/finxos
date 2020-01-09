import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Editor, Range } from 'slate';
import { useSlate, ReactEditor, useFocused } from 'slate-react';

import './style.scss';

export default props => {
  const editor = useSlate();
  const focused = useFocused();

  const { selection } = editor;

  const position = useCallback(() => {
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
  }, [selection, focused]);

  return (
    <div className="finxos-toolbar" style={{ ...position() }}>
      <div className="toolbar-wrapper"></div>
    </div>
  );
};
