import React from 'react';
import { Range, Editor, Node } from 'slate';
import { Button } from '@finxos/ui-components';
import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  const { selection } = editor;

  return (
    <Button
      onMouseDown={() => {
        // editor.apply({
        //   type: 'insert_node',
        //   path: [0],
        //   node: {
        //     type: 'code',
        //     children: [{ text: 'outer code' }],
        //   },
        // });

        console.log('aa', Node.get(editor, [0]));
        editor.apply({
          type: 'remove_node',
          path: [0],
          node: {
            children: [],
          },
        });
      }}
    >
      click to tset
    </Button>
  );
};
