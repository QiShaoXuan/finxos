import React from 'react';
import { Range, Editor } from 'slate';
import { Button } from 'antd';
import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  const { selection } = editor;

  return (
    <Button
      onMouseDown={() => {
        if (!selection) {
          document.querySelector('.finxos-container div[contenteditable=true]').focus();
        }
        editor.apply({
          type: 'set_selection',
          properties: selection,
          newProperties: {
            anchor: {
              path: [0, 1],
              offset: 5,
            },
            focus: {
              path: [0, 1],
              offset: 10,
            },
          },
        });
      }}
    >
      click to tset
    </Button>
  );
};
