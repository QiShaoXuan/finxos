import React from 'react';
import { Range, Editor } from 'slate';
import { Button } from '@finxos/ui-components';
import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  const { selection } = editor;

  return (
    <Button
      onMouseDown={() => {
        // editor.insertNode([
        //   {
        //     type: 'code',
        //     children: [{ text: 'outer code' }],
        //   },
        // ]);
        console.log('------------');
        console.log(' [...Editor.node(editor, editor.selection)]', [...Editor.nodes(editor, editor.selection)]);
      }}
    >
      click to tset
    </Button>
  );
};
