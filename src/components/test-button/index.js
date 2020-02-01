import React from 'react';
import { Range, Editor, Node, Transforms, Path } from 'slate';
import { Slate, useSlate, withReact, ReactEditor } from 'slate-react';

import { Button } from '@finxos/ui-components';
import listItem from '../../blocks/list/list-item';
import list from '../../blocks/list';

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

        // Transforms.setNodes(
        //   editor,
        //   {
        //     type: 'paragraph',
        //     children: [
        //       {
        //         text: '天姥连天向天横，势拔五岳掩赤城。',
        //       },
        //     ],
        //   },
        // );

        // const t = ReactEditor.toDOMRange(editor, editor.selection);
        console.log('editor', editor);

        // editor.apply({
        //   type: 'insert_node',
        //   path: editor.selection,
        //   node: {
        //     type: 'heading',
        //     data: { level: 4 },
        //     children: [{ text: 'outer code' }],
        //   },
        // });
        // [
        //   {
        //     type: 'heading',
        //     data: { level: 4 },
        //     children: [{ text: 'outer code' }],
        //   },
        //   {
        //     type: 'heading',
        //     data: { level: 4 },
        //     children: [{ text: 'outer code' }],
        //   },
        // ]
        // Transforms.setNodes(
        //   editor,
        //   {
        //     data,
        //   },
        //   {
        //     mode: 'all',
        //     at: {
        //       anchor: {
        //         path: first,
        //       },
        //       focus: {
        //         path: last,
        //       },
        //     },
        //     match: n => n.type === type,
        //     ...options,
        //   }
        // );
        // Transforms.unwrapNodes(editor, {
        //   match: n => n.type === 'list-item',
        //   split: true,
        // })

        // editor.apply({
        //   type: 'remove_node',
        //   path: [0],
        //   node: {
        //     children: [],
        //   },
        // });
      }}
    >
      click to tset
    </Button>
  );
};
