import React from 'react';
import { Range, Editor } from 'slate';
import { Button } from 'antd';
import { useSlate } from 'slate-react';

export default () => {
  const editor = useSlate();
  const { selection } = editor;

  return (
    <Button
      onClick={() => {
        // console.log('Editor',Editor)
        // let arr = ''
        // let num = 0
        // for(let key in Editor){
        //   num += 1
        //   let params = 'editor'
        //   if(Editor[key].length>1){
        //     params += `, more...`
        //   }
        //   arr += `${num}. Editor.${key}(${params})\n- \n\n`
        // }
        // console.log(arr)
        // const after = Editor.after(editor, start)

        const { selection } = editor;
        console.log(Editor.unhangRange(editor, selection));

        // console.log('Editor', Editor);
        //
        // console.log('nodes', [...Editor.nodes(editor)]);
        // console.log('marks', Editor.marks(editor));
        //
        // // console.log(Editor.fragment(editor, selection));
        // const point = Editor.start(editor, [0, 0]);
        // console.log('point', point);
      }}
    >
      click to tset
    </Button>
  );
};
