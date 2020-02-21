import React from 'react';
import { Range, Editor, Node, Transforms, Path } from 'slate';
import { Slate, useSlate, withReact, ReactEditor } from 'slate-react';
import { useControls } from '@finxos/hooks';
import { Button } from '@finxos/ui-components';
import listItem from '../../blocks/list/list-item';
import list from '../../blocks/list';

export default () => {
  const editor = useSlate();
  const { selection } = editor;
  const { editorDom, lastSelection } = useControls();

  return (
    <Button
      onMouseDown={e => {
        e.preventDefault();
        e.stopPropagation();

        editor.apply({
          type: 'remove_node',
          path: [1],
          node: {
            children: [],
          },
        });
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

        // Transforms.splitNodes(editor, { at: editor.selection.focus  })
        // console.log('lastSelection', lastSelection);
        //
        // console.log('Editor.after(editor, editor.selection.focus)', Editor.after(editor, editor.selection.focus));
        //
        // editor.apply({
        //   type: 'set_selection',
        //   properties: editor.selection,
        //   newProperties: {
        //     anchor: Editor.after(editor, editor.selection.focus),
        //     focus: Editor.after(editor, editor.selection.focus),
        //   },
        // });
        // console.log('editor', editor);
        // editor.insertBreak()
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
